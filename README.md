# Coditon-MD

Simple yet customizable, self-hosted platform designed to dynamically render Markdown files as HTML content from a specified directory.

My own instance is up and running at: https://blog.coditon.com

## Key Features

- Automatically converts Markdown files into HTML web pages
- Parses YAML metadata, including title, author, and publication date
- Easily customizable via NixOS module or CLI
- Syntax highlighting and a bunch of other markdown-it plugins
- Fully responsive layout that looks great on both desktop and mobile devices

## Getting Started

For NixOS users, this can be seamlessly integrated as a module:

```nix
{
  inputs = {
    coditon-md.url = "github:tupakkatapa/coditon-md";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs, coditon-md }: {
    nixosConfigurations = {
      yourhostname = nixpkgs.lib.nixosSystem {
        system = "x86_64-linux";
        modules = [
          ./configuration.nix
          coditon-md.nixosModules.coditon-md
          {
            coditon-md = {
              enable = true;
              name = "Your Name";
              dataDir = "/path/to/content";
              image = "/path/to/image.jpg";
              links = [
                { fab = "fa-github"; url = "https://github.com/yourusername"; },
                { fab = "fa-x-twitter"; url = "https://x.com/yourusername"; },
                # Add more social links as needed
              ];
            };
          }
        ];
      };
    };
  };
}
```

Or with Nix run:
```shell
nix run github:tupakkatapa/coditon-md# -- \
  --name "Your Name" \
  --datadir "/path/to/content" \
  --image "/path/to/image.jpg" \
  --link "fa-github:https://github.com/yourusername" \
  --link "fa-x-twitter:https://x.com/yourusername"
```

Of course, you can use Node.js if you are not into Nix:
```shell
node app.js \
  --name "Your Name" \
  --datadir "/path/to/content" \
  --image "/path/to/image.jpg" \
  --link "fa-github:https://github.com/yourusername" \
  --link "fa-x-twitter:https://x.com/yourusername"
```

## Usage

1. **Create Markdown Files**: Place your Markdown (.md) files in the specified `dataDir`. Each file represents a post or page.

    - A level 1 title is automatically appended from the Markdown filename if a header does not exist.
    - The index page is automatically the alphabetically first supported file in the data directory.

2. **Metadata Configuration**: Optionally, include YAML metadata at the beginning of your Markdown files to specify the title, author, and date. For example:

    ```yaml
    ---
    title: "My First Post"
    author: "Jesse Karjalainen"
    date: "2024-03-30"
    ---
    ```

3. **Viewing Your Site**: Once you get this up and running, visit `http://localhost:8080` or your configured address.

## Upcoming features

- Downloadable content
- Support for PDF

