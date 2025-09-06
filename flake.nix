{
  description = "My personal website";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
    devenv.url = "github:cachix/devenv";
    playwright.url = "github:pietdevries94/playwright-web-flake/1.55.0";
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
        , inputs'
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
                inputs'.playwright.packages.playwright-test
              ];
              env = {
                NIX_CONFIG = ''
                  accept-flake-config = true
                  extra-experimental-features = flakes nix-command
                  warn-dirty = false
                '';
                PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = "1";
                PLAYWRIGHT_BROWSERS_PATH = "${inputs'.playwright.packages.playwright-driver.browsers}";
                PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS = "true";
              };
              pre-commit.hooks = {
                nixpkgs-fmt.enable = true;
                eslint.enable = true;
                prettier.enable = true;
                playwright = {
                  enable = true;
                  entry = "${inputs'.playwright.packages.playwright-test}/bin/playwright test";
                  pass_filenames = false;
                  files = "\\.(js|ts|jsx|tsx|html|css|md|json)$";
                };
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
