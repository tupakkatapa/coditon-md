#!/usr/bin/env node
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const MarkdownIt = require('markdown-it');
const hljs = require('highlight.js');
const favicon = require('serve-favicon');

const MD_EXTENSIONS = ['.md', '.txt'];
const METADATA_FIELDS = ['title', 'author', 'date'];
const IGNORED_FILES = ['index'];

// Defaults
let PORT = 8080;
let HOST = '0.0.0.0';
let CONTENTS_DIR = path.join(__dirname, 'contents');

// Function to parse command-line arguments
function parseArgs() {
    const args = process.argv.slice(2);
    for (let i = 0; i < args.length; i++) {
        switch (args[i]) {
            case '-h':
            case '--help':
                displayHelp();
                process.exit(0);
                break;
            case '-d':
            case '--datadir':
                if (args[i + 1]) {
                    CONTENTS_DIR = args[i + 1];
                    i++;
                }
                break;
            case '-a':
            case '--address':
                if (args[i + 1]) {
                    HOST = args[i + 1];
                    i++;
                }
                break;
            case '-p':
            case '--port':
                if (args[i + 1]) {
                    PORT = parseInt(args[i + 1]);
                    i++;
                }
                break;
        }
    }
}

// Function to display help
function displayHelp() {
    console.log(`Usage: node [script] [options]
Options:
  -h, --help         Display help information
  -d, --datadir      Set the data directory for contents (default: 'contents')
  -a, --address      Set the host address (default: '0.0.0.0')
  -p, --port         Set the port number (default: 8080)`);
}

parseArgs();

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Plugins list
const plugins = [
    'pica',
    'markdown-it-highlightjs',
    'markdown-it-emoji',
    'markdown-it-sub',
    'markdown-it-ins',
    'markdown-it-mark',
    'markdown-it-expandable',
    'markdown-it-footnote',
    'markdown-it-deflist',
    'markdown-it-container',
    'markdown-it-abbr'
];

// Set up MarkdownIt
const md = new MarkdownIt({
    highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(str, { language: lang }).value;
            } catch (__) { }
        }
        return '';
    },
    typographer: true,
    linkify: true
});

// Apply plugins
plugins.map(plugin => md.use(require(plugin)));

// Middleware to detect AJAX request
app.use((req, res, next) => {
    req.isAjaxRequest = req.xhr;
    next();
});

// Route to serve the index page
app.get('/', async (req, res) => {
    try {
        const filePath = path.join(CONTENTS_DIR, 'index.md');
        const fileContent = await fs.readFile(filePath, 'utf8');
        const { content, metadata } = await parseFileContent(fileContent, filePath);
        const outputContent = metadataToHtml(metadata) + content;

        res.render('index', {
            folderStructure: await generateFolderStructure(CONTENTS_DIR),
            initialContent: outputContent
        });
    } catch (err) {
        handleError(res, err);
    }
});

// Route to serve articles
app.get('/content/:path(*)', async (req, res) => {
    const filePath = path.join(CONTENTS_DIR, req.params.path);
    if (!MD_EXTENSIONS.includes(path.extname(filePath).toLowerCase())) {
        return handleError(res, new Error(`Unsupported file extension for: ${filePath}`));
    }

    try {
        const { content, metadata } = await parseFileContent(await fs.readFile(filePath, 'utf8'), filePath);
        const outputContent = metadataToHtml(metadata) + content;

        req.isAjaxRequest
            ? res.setHeader('Content-Type', 'text/html').send(outputContent)
            : res.render('index', {
                folderStructure: await generateFolderStructure(CONTENTS_DIR),
                initialContent: outputContent
            });
    } catch (err) {
        handleError(res, err);
    }
});

// 404 handler
app.use((req, res, next) => {
    const err = new Error(`Not Found: ${req.originalUrl}`);
    err.status = 404;
    next(err);
});

// Error-handling middleware
app.use(async (err, req, res, next) => {
    await handleError(res, err);
});

// Utility function to read file and convert to Markdown
async function readFileAsMarkdown(filePath) {
    const data = await fs.readFile(filePath, 'utf8');
    return md.render(data);
}

// Handle errors related to file reading
async function handleError(res, err) {
    console.error(err);  // Log the error to the console
    const genericError = md.render(`**Oops!**\n\nWe encountered an issue. Please try again later.`);
    const folderStruct = await generateFolderStructure(CONTENTS_DIR);
    res.status(err.status || 500).render('index', {
        folderStructure: folderStruct,
        initialContent: err.status === 404 ? md.render(`**Not Found**\n\nThe page you are looking for does not exist.`) : genericError
    });
}


// Parse Markdown file content for metadata and content, append filename as title
async function parseFileContent(data, filePath) {
    const filenameWithoutExtension = path.basename(filePath, path.extname(filePath));
    let title = '';

    // Append title only if the filename is not in the ignored list
    if (!IGNORED_FILES.includes(filenameWithoutExtension)) {
        title = `# ${filenameWithoutExtension}\n`;
    }

    const matches = data.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    const metadata = {};

    if (matches) {
        METADATA_FIELDS.forEach(field => {
            const match = matches[1].match(new RegExp(`${field}: "(.*?)"`));
            metadata[field] = match ? match[1] : undefined;
        });

        if (!metadata.date) metadata.date = await getFileDate(filePath);

        return { content: md.render(title + matches[2]), metadata };
    }
    return { content: md.render(title + data), metadata };
}

// Utility to get file date
async function getFileDate(filePath) {
    const fileStat = await fs.stat(filePath);
    return fileStat.mtime.toISOString().split('T')[0];
}

// Convert metadata to HTML
function metadataToHtml(meta) {
    return `
        <div class="metadata">
            <span class="meta-author">${meta.author || '&nbsp;'}</span>
            <span class="meta-title">${meta.title || '&nbsp;'}</span>
            <span class="meta-date">${meta.date || '&nbsp;'}</span>
        </div>`;
}

// Generate the folder structure in HTML format, sorted by date, excluding ignored files
async function generateFolderStructure(dir, isRoot = true) {
    const items = await fs.readdir(dir, { withFileTypes: true });
    const detailedItems = [];

    for (const item of items) {
        if (item.name.startsWith('.')) continue;
        const itemBaseName = path.basename(item.name, path.extname(item.name)).toLowerCase();
        if (IGNORED_FILES.includes(itemBaseName)) continue; // Skip ignored files
        if (!MD_EXTENSIONS.includes(path.extname(item.name)) && !isRoot) continue;

        const itemPath = path.join(dir, item.name);
        const isDirectory = item.isDirectory();

        if (isDirectory) {
            // Directories don't have a date, so we set a default that sorts them first
            detailedItems.push({ name: item.name, path: itemPath, date: '0000-00-00', isDirectory });
        } else if (!isRoot) {
            const content = await fs.readFile(itemPath, 'utf8');
            const date = (await parseFileContent(content, itemPath)).metadata.date || await getFileDate(itemPath);
            detailedItems.push({ name: item.name, path: itemPath, date, isDirectory: false });
        }
    }

    // Sort contents by date
    detailedItems.sort((a, b) => b.date.localeCompare(a.date));

    let structure = ['<ul>'];
    for (const item of detailedItems) {
        if (item.isDirectory) {
            structure.push(`<li class="folder open"><span><i class="fas fa-folder-open"></i> ${item.name}</span>`);
            structure.push(await generateFolderStructure(item.path, false));
        } else {
            const relativePath = path.relative(CONTENTS_DIR, item.path).split(path.sep).join('/');
            structure.push(`<li><a href="/content/${relativePath}">${item.name}</a> <span class="file-date">${item.date}</span></li>`);
        }
    }

    structure.push('</ul>');
    return structure.join('');
}

// Handle uncaught exceptions and unhandled promise rejections
process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled promise rejection at:', promise, 'reason:', reason);
});

app.listen(PORT, HOST, () => console.log(`Running on http://${HOST}:${PORT}`));
