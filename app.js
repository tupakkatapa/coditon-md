#!/usr/bin/env node
const express = require('express');
const MarkdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const hljs = require('highlight.js');
const fs = require('fs').promises;
const path = require('path');
const yaml = require('js-yaml');
const favicon = require('serve-favicon');
const RSS = require('rss');

// Constants & Defaults
const IGNORED_FILES = [];
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png'];
const MD_EXTENSIONS = ['.md', '.txt'];

// Error messages
const ERROR_MESSAGES = {
  UNSUPPORTED_FILE: 'File type not supported',
  NOT_FOUND: '# 404 Not Found\n\nThe requested resource could not be found.',
  GENERIC_ERROR: '# Error\n\nAn unexpected error occurred. Please try again later.',
  NO_VALID_FILES: 'No valid files found in the directory'
};

let PORT = 8080;
let HOST = '0.0.0.0';
let CONTENTS_DIR = path.join(__dirname, 'contents');
let NAME = 'My Site';
let IMAGE = '';
let SOCIAL_LINKS = [];
let SOURCE_LINK = '';

// --- Helpers ---
// Simple string capitalize
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Async handler wrapper for routes
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Command-line argument parsing
function parseArgs() {
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case '-h':
      case '--help':
        displayHelp();
        process.exit(0);
      case '-d':
      case '--datadir':
        if (args[i + 1]) { CONTENTS_DIR = args[++i]; }
        break;
      case '-a':
      case '--address':
        if (args[i + 1]) { HOST = args[++i]; }
        break;
      case '-p':
      case '--port':
        if (args[i + 1]) { PORT = parseInt(args[++i], 10); }
        break;
      case '-n':
      case '--name':
        if (args[i + 1] && !args[i + 1].startsWith('-')) {
          NAME = args[++i];
          while (i + 1 < args.length && !args[i + 1].startsWith('-')) {
            NAME += ` ${args[++i]}`;
          }
        }
        break;
      case '-i':
      case '--image':
        if (args[i + 1]) { IMAGE = args[++i]; }
        break;
      case '-l':
      case '--link':
        i++;
        while (i < args.length && !args[i].startsWith('-')) {
          const splitIndex = args[i].indexOf(':');
          if (splitIndex !== -1) {
            const fab = args[i].substring(0, splitIndex);
            let href = args[i].substring(splitIndex + 1);
            // If the URL does not start with http:// or https://, prepend https://
            if (!href.startsWith('http://') && !href.startsWith('https://')) {
              href = 'https://' + href;
            }
            SOCIAL_LINKS.push({ fab, href });
          } else {
            console.error(`Invalid format for --link: ${args[i]}`);
          }
          i++;
        }
        i--; // Adjust index for outer loop
        break;
      case '-s':
      case '--source':
        if (args[i + 1]) { SOURCE_LINK = args[++i]; }
        break;
      default:
        break;
    }
  }
}

function displayHelp() {
  console.log(`Usage: node [script] [options]
Options:
  -h, --help          Display this help information
  -d, --datadir       Set the data directory for contents (default: './contents')
  -a, --address       Set the host address (default: '0.0.0.0')
  -p, --port          Set the port number (default: 8080)
  -n, --name          Set the name displayed on the site (default: 'My Site')
  -i, --image         Set the path to the profile picture
  -l, --link          Add link with icon and URL in the format 'icon:url'
                      (e.g., --link fa-github:https://github.com/username)
  -s, --source        Set the source code repository URL`);
}

parseArgs();

// --- Express App Setup ---
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- MarkdownIt Setup ---
const md = new MarkdownIt({
  html: true,
  typographer: true,
  linkify: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (err) {
        console.error(`Syntax highlighting failed for language ${lang}:`, err);
        return str;
      }
    }
    return str;
  }
}).use(markdownItAnchor, {
  permalink: markdownItAnchor.permalink.headerLink(),
  slugify: s => encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, '-')),
  level: 1
});

// Load plugins with proper initialization
const loadPlugin = (name, ...args) => {
  try {
    const plugin = require(name);
    // Handle different module export patterns
    if (name === 'markdown-it-emoji') {
      // markdown-it-emoji v3.x exports an object with different presets
      const pluginFn = plugin.full || plugin.default || plugin;
      md.use(pluginFn, ...args);
    } else {
      const pluginFn = plugin.default || plugin;
      md.use(pluginFn, ...args);
    }
  } catch (err) {
    console.error(`Failed to load plugin ${name}:`, err.message);
  }
};

loadPlugin('markdown-it-highlightjs');
loadPlugin('markdown-it-emoji');
loadPlugin('markdown-it-sub');
loadPlugin('markdown-it-ins');
loadPlugin('markdown-it-mark');
loadPlugin('markdown-it-expandable');
loadPlugin('markdown-it-footnote');
loadPlugin('markdown-it-deflist');
loadPlugin('markdown-it-container', 'warning');
loadPlugin('markdown-it-container', 'info');
loadPlugin('markdown-it-abbr');
loadPlugin('markdown-it-collapsible');

// Middleware to detect AJAX requests
app.use((req, res, next) => {
  req.isAjaxRequest = req.xhr;
  next();
});

// Helper: serve static files (images, etc.)
async function serveStaticFile(filePath, res) {
  const data = await fs.readFile(filePath);
  const mimeModule = await import('mime');
  const mimeType = mimeModule.default.getType(filePath);
  if (!mimeType) {
    throw Object.assign(new Error(`Unable to determine MIME type for: ${filePath}`), { status: 415 });
  }
  res.setHeader('Content-Type', mimeType);
  res.send(data);
}

// --- Routes ---

// Download route for markdown/text files
app.get('/download/:path(*)', asyncHandler(async (req, res) => {
  const filePath = path.join(CONTENTS_DIR, req.params.path);
  if (!MD_EXTENSIONS.includes(path.extname(filePath).toLowerCase())) {
    return res.status(400).send(ERROR_MESSAGES.UNSUPPORTED_FILE);
  }
  await fs.access(filePath);
  res.download(filePath);
}));

// Serve profile image
app.get('/profile-pic', asyncHandler(async (req, res) => {
  if (!IMAGE) return res.status(404).send('Image not found');
  await serveStaticFile(IMAGE, res);
}));

// Utility: find the first markdown file in a directory
async function findIndexFile(directory) {
  const files = await fs.readdir(directory);
  const validFiles = files.filter(file =>
    !file.startsWith('.') && MD_EXTENSIONS.includes(path.extname(file).toLowerCase())
  ).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  if (!validFiles.length) throw new Error(ERROR_MESSAGES.NO_VALID_FILES);
  return path.join(directory, validFiles[0]);
}

// Root: redirect to first markdown content
app.get('/', asyncHandler(async (req, res) => {
  const filePath = await findIndexFile(CONTENTS_DIR);
  const relativePath = path.relative(CONTENTS_DIR, filePath);
  res.redirect(`/content/${relativePath}`);
}));


// Content route: serve markdown/text or image files
app.get('/content/:path(*)', asyncHandler(async (req, res) => {
  const filePath = path.join(CONTENTS_DIR, req.params.path);
  const ext = path.extname(filePath).toLowerCase();

  if (IMAGE_EXTENSIONS.includes(ext)) {
    return serveStaticFile(filePath, res);
  } else if (MD_EXTENSIONS.includes(ext)) {
    const rawData = await fs.readFile(filePath, 'utf8');
    const { content, metadata } = await parseFileContent(rawData, filePath);
    const outputContent = metadataToHtml(metadata) + content;
    const relativePath = path.relative(CONTENTS_DIR, filePath);
    const title = capitalize(path.basename(filePath, ext).replace(/[-_]/g, ' '));

    if (req.isAjaxRequest) {
      res.setHeader('Content-Type', 'text/html');
      return res.send(outputContent);
    }
    res.render('index', {
      folderStructure: await generateFolderStructure(CONTENTS_DIR),
      initialContent: outputContent,
      name: NAME,
      image: IMAGE,
      socialLinks: SOCIAL_LINKS,
      sourceLink: SOURCE_LINK,
      relativePath,
      title
    });
  } else {
    throw Object.assign(new Error(`Unsupported file extension: ${filePath}`), { status: 400 });
  }
}));

// Utility: generate RSS feed from markdown files
async function generateRSSFeed() {
  const feed = new RSS({
    title: NAME,
    description: `RSS feed for ${NAME}'s content`,
    feed_url: `http://${HOST}:${PORT}/rss.xml`,
    site_url: `http://${HOST}:${PORT}`,
    image_url: IMAGE,
    pubDate: new Date().toString()
  });

  async function findMarkdownFiles(directory) {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        await findMarkdownFiles(fullPath);
      } else if (MD_EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
        await processMarkdownFile(fullPath, entry.name);
      }
    }
  }

  async function processMarkdownFile(filePath, fileName) {
    const rawData = await fs.readFile(filePath, 'utf8');
    const { metadata } = await parseFileContent(rawData, filePath);
    const title = fileName.replace(/\..+$/, '')
      .split('-').map(word => capitalize(word)).join(' ');
    const relativePath = path.relative(CONTENTS_DIR, filePath).split(path.sep).join('/');
    const categoryArr = path.dirname(relativePath).split('/').filter(Boolean);
    const category = categoryArr.length ? categoryArr.join(' > ') : '';
    feed.item({
      title,
      description: metadata.description || 'A new content piece is available.',
      url: `http://${HOST}:${PORT}/content/${encodeURIComponent(relativePath)}`,
      date: metadata.date,
      guid: `http://${HOST}:${PORT}/content/${encodeURIComponent(relativePath)}`,
      categories: category ? [category] : []
    });
  }

  await findMarkdownFiles(CONTENTS_DIR);
  return feed.xml({ indent: true });
}

// RSS feed route
app.get('/rss.xml', asyncHandler(async (req, res) => {
  const rss = await generateRSSFeed();
  res.header('Content-Type', 'application/rss+xml');
  res.send(rss);
}));

// --- Error Handling ---

// 404 handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// General error handler: render error using Markdown
app.use(async (err, req, res, next) => {
  await handleError(res, err);
});

async function handleError(res, err) {
  console.error(err);
  const statusCode = err.status || 500;
  let message;
  if (
    statusCode === 404 ||
    err.code === "ENOENT" ||
    (err.message && err.message.includes("Unsupported file extension"))
  ) {
    message = ERROR_MESSAGES.NOT_FOUND;
  } else {
    message = ERROR_MESSAGES.GENERIC_ERROR;
  }
  const markdownError = md.render(message);
  const folderStructure = await generateFolderStructure(CONTENTS_DIR);
  res.status(statusCode).render('index', {
    folderStructure,
    initialContent: markdownError,
    name: NAME,
    image: IMAGE,
    socialLinks: SOCIAL_LINKS,
    sourceLink: SOURCE_LINK,
    title: statusCode.toString()
  });
}

// --- Markdown Utilities ---
async function parseFileContent(data, filePath) {
  const fmMatch = data.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (fmMatch) {
    const frontMatter = yaml.load(fmMatch[1]) || {};
    return { content: md.render(fmMatch[2]), metadata: { date: frontMatter.date } };
  } else {
    return { content: md.render(data), metadata: {} };
  }
}


function metadataToHtml(meta) {
  return `<div class="metadata">${meta.date ? `<span class="meta-date">${meta.date}</span>` : '&nbsp;'}</div>`;
}

async function generateFolderStructure(dir, isRoot = true) {
  const items = await fs.readdir(dir, { withFileTypes: true });
  let structure = ['<ul>'];
  const detailedItems = [];

  async function isDirectoryValid(dirPath) {
    const dirItems = await fs.readdir(dirPath, { withFileTypes: true });
    for (const item of dirItems) {
      if (!item.name.startsWith('.')) {
        const fullPath = path.join(dirPath, item.name);
        if (item.isDirectory() ? await isDirectoryValid(fullPath) : MD_EXTENSIONS.includes(path.extname(item.name).toLowerCase())) {
          return true;
        }
      }
    }
    return false;
  }

  for (const item of items) {
    if (item.name.startsWith('.')) continue;
    const baseName = path.basename(item.name, path.extname(item.name)).toLowerCase();
    if (IGNORED_FILES.includes(baseName)) continue;
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (!(await isDirectoryValid(fullPath))) continue;
      const content = await generateFolderStructure(fullPath, false);
      if (!content.trim() || content.trim() === '<ul></ul>') continue;
      detailedItems.push({ name: item.name, path: fullPath, isDirectory: true, content });
    } else if (MD_EXTENSIONS.includes(path.extname(item.name).toLowerCase())) {
      const fileContent = await fs.readFile(fullPath, 'utf8');
      const { metadata } = await parseFileContent(fileContent, fullPath);
      detailedItems.push({ name: item.name, path: fullPath, isDirectory: false, date: metadata.date });
    }
  }

  detailedItems.sort((a, b) => {
    if (!a.isDirectory && !b.isDirectory) {
      if (!a.date || !b.date) return a.name.localeCompare(b.name);
      return b.date.localeCompare(a.date);
    }
    return a.isDirectory === b.isDirectory ? a.name.localeCompare(b.name) : (a.isDirectory ? 1 : -1);
  });

  for (const item of detailedItems) {
    if (item.isDirectory) {
      structure.push(`<li class="folder open"><span><i class="fas fa-folder-open"></i> ${capitalize(item.name)}</span>`);
      structure.push(item.content);
    } else {
      const itemName = capitalize(path.basename(item.name, path.extname(item.name)));
      const icon = itemName.toLowerCase() === 'home' ? '<i class="fas fa-home"></i>' : '<i class="fas fa-file-alt"></i>';
      const relPath = path.relative(CONTENTS_DIR, item.path).split(path.sep).join('/');
      const dateDisplay = item.date ? `<div class="file-date">${item.date}</div>` : '';
      structure.push(`<li><a href="/content/${relPath}">${icon} ${itemName}</a>${dateDisplay}</li>`);
    }
  }
  structure.push('</ul>');
  return structure.join('');
}

// Global error logging
process.on('uncaughtException', (err) => console.error('Uncaught exception:', err));
process.on('unhandledRejection', (reason, promise) => console.error('Unhandled rejection:', promise, 'reason:', reason));

app.listen(PORT, HOST, () => console.log(`Running on http://${HOST}:${PORT}`));
