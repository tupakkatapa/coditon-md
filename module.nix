{
  config,
  lib,
  pkgs,
  ...
}: let
  cfg = config.services.coditon-blog;
  coditon-blog = pkgs.callPackage ./package.nix {};
in {
  options.services.coditon-blog = {
    enable = lib.mkEnableOption "blog.coditon.com";

    address = lib.mkOption {
      type = lib.types.str;
      default = "0.0.0.0";
      description = "Host address for the service";
    };

    port = lib.mkOption {
      type = lib.types.int;
      default = 8080;
      description = "Port number for the service";
    };
  };

  config = lib.mkIf cfg.enable {
    systemd = {
      services.coditon-blog = {
        description = "blog.coditon.com";
        after = ["network.target"];
        wantedBy = ["multi-user.target"];
        serviceConfig = {
          Type = "simple";
          Restart = "on-failure";
          DynamicUser = true;
          ExecStart = lib.concatStringsSep " \\\n\t" [
            "${coditon-blog}/bin/coditon-blog"
            "--port ${toString cfg.port}"
            "--address ${cfg.address}"
          ];
        };
      };
    };
  };
}
