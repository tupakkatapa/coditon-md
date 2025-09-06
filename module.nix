{ config
, lib
, pkgs
, ...
}:
with lib; let
  cfg = config.services.coditon-md;
  coditon-md = pkgs.callPackage ./package.nix { };
in
{
  options.services.coditon-md = {
    enable = mkEnableOption "Whether to enable coditon-md";

    dataDir = mkOption {
      type = types.str;
      default = "/var/lib/coditon-md";
      description = "The directory where the markdown files are located.";
    };

    address = mkOption {
      type = types.str;
      default = "0.0.0.0";
      description = "Host address for the service.";
    };

    port = mkOption {
      type = types.int;
      default = 8080;
      description = "Port number for the service.";
    };

    name = mkOption {
      type = types.str;
      default = "Mike Wazowski";
      description = "The name to be displayed on the site.";
    };

    image = mkOption {
      type = types.path;
      default = "";
      description = "Path to the profile picture.";
    };

    links = mkOption {
      type = types.listOf (types.submodule {
        options = {
          fab = mkOption {
            type = types.str;
            description = "FontAwesome icon class for the link.";
          };
          url = mkOption {
            type = types.str;
            description = "URL for the link.";
          };
        };
      });
      default = [ ];
      description = "Social media links.";
    };

    openFirewall = mkOption {
      type = types.bool;
      default = false;
      description = "Open ports in the firewall for the web interface.";
    };

    user = mkOption {
      type = types.str;
      default = "coditon";
      description = "User account under which service runs.";
    };

    group = mkOption {
      type = types.str;
      default = cfg.user;
      description = "Group under which service runs.";
    };
  };

  config = mkIf cfg.enable {
    systemd.tmpfiles.rules = [
      "d ${cfg.dataDir} 0700 ${cfg.user} ${cfg.group} - -"
    ];

    systemd.services.coditon-md = {
      after = [ "network.target" ];
      wantedBy = [ "multi-user.target" ];
      serviceConfig = {
        Type = "simple";
        User = cfg.user;
        Group = cfg.group;
        Restart = "on-failure";
      };
      script =
        ''
          ${coditon-md}/bin/coditon-md \
          --datadir "${cfg.dataDir}" \
          --port ${toString cfg.port} \
          --address "${cfg.address}" \
          --name "${cfg.name}" \
          --image "${cfg.image}" \
        ''
        + (concatStringsSep " " (map (item: "--link '${item.fab}:${item.url}'") cfg.links));
    };

    networking.firewall = mkIf cfg.openFirewall {
      allowedTCPPorts = [ cfg.port ];
    };

    users.users = mkIf (cfg.user == "coditon") {
      "coditon" = {
        isSystemUser = true;
        group = cfg.group;
        home = cfg.dataDir;
      };
    };

    users.groups = mkIf (cfg.group == "coditon") {
      "coditon" = { };
    };
  };
}
