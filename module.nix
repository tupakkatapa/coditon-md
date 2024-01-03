{
  config,
  lib,
  pkgs,
  ...
}:
with lib; let
  cfg = config.services.coditon-blog;
  coditon-blog = pkgs.callPackage ./package.nix {};
in {
  options.services.coditon-blog = {
    enable = mkEnableOption "blog.coditon.com";

    dataDir = mkOption {
      type = types.str;
      default = "/var/lib/coditon-blog";
      description = lib.mdDoc ''
        The directory where service stores its data files.
      '';
    };

    address = mkOption {
      type = types.str;
      default = "0.0.0.0";
      description = ''
        Host address for the service.
      '';
    };

    port = mkOption {
      type = types.int;
      default = 8080;
      description = ''
        Port number for the service.
      '';
    };

    openFirewall = mkOption {
      type = types.bool;
      default = false;
      description = ''
        Open ports in the firewall for the web interface.
      '';
    };

    user = mkOption {
      type = types.str;
      default = "coditon";
      description = ''
        User account under which service runs.
      '';
    };

    group = mkOption {
      type = types.str;
      default = "coditon";
      description = ''
        Group under which service runs.
      '';
    };
  };

  config = mkIf cfg.enable {
    # Data directory
    systemd.tmpfiles.rules = [
      "d '${cfg.dataDir}' 0700 ${cfg.user} ${cfg.group} - -"
    ];

    # Service
    systemd.services.coditon-blog = {
      description = "blog.coditon.com";
      after = ["network.target"];
      wantedBy = ["multi-user.target"];
      serviceConfig = {
        Type = "simple";
        User = cfg.user;
        Group = cfg.group;
        ExecStart = concatStringsSep " \\\n\t" [
          "${coditon-blog}/bin/coditon-blog"
          "--port ${toString cfg.port}"
          "--address ${cfg.address}"
        ];
        Restart = "on-failure";
      };
    };

    # Firewall
    networking.firewall = lib.mkIf cfg.openFirewall {
      allowedTCPPorts = [cfg.port];
    };

    # User / Group
    users.users = mkIf (cfg.user == "coditon") {
      coditon = {
        group = cfg.group;
        home = cfg.dataDir;
        uid = config.ids.uids.coditon;
      };
    };
    users.groups = mkIf (cfg.group == "coditon") {
      coditon.gid = config.ids.gids.coditon;
    };
  };
}
