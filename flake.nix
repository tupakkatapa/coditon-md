{
  description = "My personal website";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
    devenv.url = "github:cachix/devenv";
  };

  outputs = inputs @ {
    self,
    nixpkgs,
    flake-parts,
    ...
  }:
    flake-parts.lib.mkFlake {inherit inputs;} ({withSystem, ...}: rec {
      imports = [
        inputs.devenv.flakeModule
      ];

      systems = nixpkgs.lib.systems.flakeExposed;

      perSystem = {
        self',
        pkgs,
        system,
        ...
      }: {
        # Nix code formatter, accessible through 'nix fmt'
        formatter = nixpkgs.legacyPackages.${system}.alejandra;

        # Development shell, accessible trough 'nix develop' or 'direnv allow'
        devenv.shells = {
          default = {
            packages = with pkgs; [
              yarn
              yarn2nix
            ];
            env = {
              NIX_CONFIG = ''
                accept-flake-config = true
                extra-experimental-features = flakes nix-command
                warn-dirty = false
              '';
            };
            pre-commit.hooks = {
              alejandra.enable = true;
            };
            # Workaround for https://github.com/cachix/devenv/issues/760
            containers = pkgs.lib.mkForce {};
          };
        };

        # Packages, accessible through 'nix build', 'nix run', etc
        packages = {
          coditon-blog = pkgs.mkYarnPackage {
            name = "coditon-blog";
            version = "0.1.0";

            src = ./.;
            packageJSON = ./package.json;
            yarnLock = ./yarn.lock;
            yarnNix = ./yarn.nix;
          };
          default = self'.packages.blog;
        };
      };

      flake = let
        inherit (self) outputs;
      in {
        # Overlay packages
        overlays.default = final: prev:
          withSystem prev.stdenv.hostPlatform.system ({self', ...}: self'.packages);

        # NixOS modules
        nixosModules.coditon-blog = {
          imports = [./module.nix];
          nixpkgs.overlays = [self.overlays.default];
        };
      };
    });
}
