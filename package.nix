{ pkgs }:
pkgs.mkYarnPackage {
  name = "coditon-md";
  version = "0.1.0";

  src = ./.;
  packageJSON = ./package.json;
  yarnLock = ./yarn.lock;
}
