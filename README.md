# Coditon Blog

Simple yet customizable, self-hosted blog platform designed to dynamically render Markdown files as HTML content from a specified directory.

My own instance is up and running at: https://blog.coditon.com

## Key Features

- Automatically converts Markdown files into HTML web pages
- Parses YAML metadata, including title, author, and publication date
- Easily customizable via NixOS module or CLI
- Syntax highlighting and a bunch of other markdown-it plugins
- Fully responsive layout that looks great on both desktop and mobile devices

## Getting Started

For NixOS users, Coditon Blog can be seamlessly integrated as a module:

```nix
{
  inputs = {
    coditon-blog.url = "github:tupakkatapa/blog.coditon.com";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs, coditon-blog }: {
    nixosConfigurations = {
      yourhostname = nixpkgs.lib.nixosSystem {
        system = "x86_64-linux";
        modules = [
          ./configuration.nix
          coditon-blog.nixosModules.coditon-blog
          {
            coditon-blog = {
              enable = true;
              name = "Your Name";
              dataDir = "/path/to/blog-posts";
              image = "/path/to/profile.jpg";
              socials = [
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

Or Nix run:
```shell
nix run github:tupakkatapa/coditon-blog# -- \
  --name "Your Name" \
  --datadir "/path/to/blog-posts" \
  --image "/path/to/profile.jpg" \
  --social "fa-github:https://github.com/yourusername" \
  --social "fa-x-twitter:https://x.com/yourusername"
```

Of course, you can use Node.js if you are not into Nix:
```shell
node app.js \
  --name "Your Name" \
  --datadir "/path/to/blog-posts" \
  --image "/path/to/profile.jpg" \
  --social "fa-github:https://github.com/yourusername" \
  --social "fa-x-twitter:https://x.com/yourusername"
```

## Usage

1. **Create Markdown Files**: Place your Markdown (.md) files in the specified `dataDir`. Each file represents a blog post or page.

    Note: A level 1 title is automatically appended from the Markdown filename if a header does not exist.

2. **Metadata Configuration**: Optionally, include YAML metadata at the beginning of your Markdown files to specify the title, author, and date. For example:

    ```yaml
    ---
    title: "My First Post"
    author: "Jesse Karjalainen"
    date: "2024-03-30"
    ---
    ```

3. **Access Your Blog**: Once Coditon Blog is running, visit `http://localhost:8080` (or your configured address) to see your blog live.

## Upcoming features

- RSS feed generation
- Downloadable content
- Support for PDF

