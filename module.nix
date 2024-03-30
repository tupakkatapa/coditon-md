{
  config,
  lib,
  pkgs,
  ...
}:
with lib; let
  cfg = config.services.coditon-blog;
  coditon-blog = pkgs.callPackage ./package.nix {};
  formatSocial = social: "${social.fab}:${social.url}";
in {
  options.services.coditon-blog = {
    enable = mkEnableOption "Whether to enable coditon-blog";

    dataDir = mkOption {
      type = types.str;
      default = "/var/lib/coditon-blog";
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
      default = "Jesse Karjalainen";
      description = "The name to be displayed on the blog.";
    };

    image = mkOption {
      type = types.path;
      default = "";
      description = "Path to the profile picture.";
    };

    socials = mkOption {
      type = with types;
        listOf (submodule {
          options = {
            fab = mkOption {
              type = types.str;
              description = "FontAwesome icon class for the social link.";
            };
            url = mkOption {
              type = types.str;
              description = "URL for the social link.";
            };
          };
        });
      default = [];
      description = "Social media links.";
    };

    openFirewall = mkOption {
      type = types.bool;
      default = false;
      description = "Open ports in the firewall for the web interface.";
    };

    user = mkOption {
      type = types.str;
      default = "coditon-blog";
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
      "d '${cfg.dataDir}' 0700 ${cfg.user} ${cfg.group} - -"
    ];

    systemd.services.coditon-blog = {
      description = "blog.coditon.com";
      after = ["network.target"];
      wantedBy = ["multi-user.target"];
      serviceConfig = {
        Type = "simple";
        User = cfg.user;
        Group = cfg.group;
        ExecStart =
          concatStringsSep " \\\n\t" [
            "${coditon-blog}/bin/coditon-blog"
            "--datadir ${cfg.dataDir}"
            "--port ${toString cfg.port}"
            "--address ${cfg.address}"
            "--name ${cfg.name}"
            "--image ${cfg.image}"
          ]
          ++ map (social: "--social ${social.fab}:${social.url}") cfg.socials;
        Restart = "on-failure";
      };
    };

    networking.firewall = mkIf cfg.openFirewall {
      allowedTCPPorts = [cfg.port];
    };

    users.users = mkIf (cfg.user == "coditon-blog") {
      "coditon-blog" = {
        isSystemUser = true;
        group = cfg.group;
        home = cfg.dataDir;
      };
    };

    users.groups = mkIf (cfg.group == "coditon-blog") {
      "coditon-blog" = {};
    };
  };
}
