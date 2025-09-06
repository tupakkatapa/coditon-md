{
  description = "My personal website";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
    devenv.url = "github:cachix/devenv";
  };

  outputs =
    inputs @ { self
    , flake-parts
    , ...
    }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = inputs.nixpkgs.lib.systems.flakeExposed;
      imports = [
        inputs.devenv.flakeModule
      ];

      perSystem =
        { self'
        , pkgs
        , ...
        }: {
          # Development shell, accessible trough 'nix develop' or 'direnv allow'
          devenv.shells = {
            default = {
              packages = with pkgs; [
                yarn
                yarn2nix
                nodejs
              ];
              env = {
                NIX_CONFIG = ''
                  accept-flake-config = true
                  extra-experimental-features = flakes nix-command
                  warn-dirty = false
                '';
              };
              pre-commit.hooks = {
                nixpkgs-fmt.enable = true;
              };
              # Workaround for https://github.com/cachix/devenv/issues/760
              containers = pkgs.lib.mkForce { };
            };
          };

          # Packages, accessible through 'nix build', 'nix run', etc
          packages = {
            coditon-blog = pkgs.callPackage ./package.nix { };
            default = self'.packages.coditon-blog;
          };
        };

      flake = {
        # NixOS modules
        nixosModules = {
          coditon-blog = import ./module.nix;
          default = self.nixosModules.coditon-blog;
        };
      };
    };
}
