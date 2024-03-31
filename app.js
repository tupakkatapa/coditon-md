#!/usr/bin/env node
const MarkdownIt = require('markdown-it');
const express = require('express');
const favicon = require('serve-favicon');
const fs = require('fs').promises;
const hljs = require('highlight.js');
const markdownItAnchor = require('markdown-it-anchor');
const path = require('path');
const yaml = require('js-yaml');

const IGNORED_FILES = [];
const MD_EXTENSIONS = ['.md', '.txt'];
const METADATA_FIELDS = ['title', 'author', 'date'];

// Defaults
let PORT = 8080;
let HOST = '0.0.0.0';
let CONTENTS_DIR = path.join(__dirname, 'contents');
let NAME = 'Mike Wazowski';
let IMAGE = '';
let SOCIAL_LINKS = [];


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
                    PORT = parseInt(args[i + 1], 10);
                    i++;
                }
                break;
            case '-n':
            case '--name':
                if (args[i + 1]) {
                    NAME = args.slice(i + 1).join(" ").split(" --")[0];
                    i += NAME.split(" ").length - 1;
                }
                break;
            case '--image':
                if (args[i + 1]) {
                    IMAGE = args[i + 1];
                    i++;
                }
                break;
            case '--social':
                i++;
                while (i < args.length && !args[i].startsWith('--')) {
                    const splitIndex = args[i].indexOf(':');
                    if (splitIndex !== -1) {
                        const fab = args[i].substring(0, splitIndex);
                        const href = args[i].substring(splitIndex + 1);
                        if (fab && href) {
                            SOCIAL_LINKS.push({ fab, href });
                        } else {
                            console.error(`Invalid format for --social: ${args[i]}`);
                        }
                    } else {
                        console.error(`Invalid format for --social: ${args[i]}`);
                    }
                    i++;
                }
                i--;
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
  -d, --datadir       Set the data directory for contents (default: '/var/lib/coditon-blog')
  -a, --address       Set the host address (default: '0.0.0.0')
  -p, --port          Set the port number (default: 8080)
  -n, --name          Set the name displayed on the blog (default: 'Mike Wazowski')
  --image             Set the path to the profile picture
  --social            Add social links with icons and URLs in the format 'icon:url'
                      (e.g., --social fa-github:https://github.com/username --social fa-x-twitter:https://x.com/username)`);
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
    'markdown-it-anchor',
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
}).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.headerLink(),
    slugify: s => encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, '-')),
    level: 2
});

// Apply plugins
plugins.map(plugin => md.use(require(plugin)));

// Middleware to detect AJAX request
app.use((req, res, next) => {
    req.isAjaxRequest = req.xhr;
    next();
});

// Serve the profile image
app.get('/profile-pic', async (req, res) => {
    try {
        if (!IMAGE) {
            throw new Error('Profile picture not specified');
        }
        const imageData = await fs.readFile(IMAGE);

        // Dynamically import the 'mime' module correctly
        const mime = await import('mime');
        const mimeType = mime.default.getType(IMAGE); // Correctly access getType from the imported module

        if (!mimeType || !mimeType.startsWith('image/')) {
            throw new Error('File is not an image');
        }

        res.setHeader('Content-Type', mimeType); // Set the correct Content-Type header
        res.send(imageData);
    } catch (err) {
        console.error(err);
        res.status(404).send('Image not found');
    }
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
            initialContent: outputContent,
            name: NAME,
            image: IMAGE, // Make sure this is defined
            socialLinks: SOCIAL_LINKS, // Correctly pass SOCIAL_LINKS
        });
    } catch (err) {
        handleError(res, err);
    }
});


// Log requests
app.use((req, res, next) => {
    console.log('Incoming request:', req.url);
    next();
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
                initialContent: outputContent,
                name: NAME, // Ensure this is defined
                image: IMAGE, // Make sure this is correctly passed
                socialLinks: SOCIAL_LINKS, // Correctly pass SOCIAL_LINKS
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

// Parse Markdown file content for metadata and content
async function parseFileContent(data, filePath) {
    const filenameWithoutExtension = path.basename(filePath, path.extname(filePath));
    let prependTitle = true;
    let contentWithoutFrontMatter = data.replace(/^---\n[\s\S]+?\n---\n?/, '');
    const hasLevelOneHeader = /^#\s+|^[\s\S]*\n#\s+/.test(contentWithoutFrontMatter);

    if (hasLevelOneHeader || IGNORED_FILES.includes(filenameWithoutExtension)) {
        prependTitle = false;
    }

    let title = prependTitle ? `# ${filenameWithoutExtension}\n\n` : '';
    const matches = data.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

    if (matches) {
        const metadata = yaml.load(matches[1]) || {};
        if (!metadata.date) metadata.date = await getFileDate(filePath);
        return { content: md.render(title + matches[2]), metadata };
    } else {
        return { content: md.render(title + data), metadata: {} };
    }
}

// Utility to get file date
async function getFileDate(filePath) {
    try {
        const stats = await fs.stat(filePath);
        return stats.mtime.toISOString().split('T')[0];
    } catch (error) {
        console.error('Error getting file date:', error);
        throw error;
    }
}

// Convert metadata to HTML
function metadataToHtml(meta) {
    let htmlContent = '<div class="metadata">';
    METADATA_FIELDS.forEach(field => {
        htmlContent += `<span class="meta-${field} ${field}">${meta[field] || '&nbsp;'}</span>`;
    });
    htmlContent += '</div>';
    return htmlContent;
}

// Generate the folder structure in HTML format, sorted by date, excluding ignored files
async function generateFolderStructure(dir, isRoot = true) {
    const items = await fs.readdir(dir, { withFileTypes: true });
    const detailedItems = [];
    let structure = ['<ul>'];

    function generateNavigationButtons() {
        return `
            <li><a href="/" class="home-link">Home</a></li>
        `;
    }
    if (isRoot) {
        structure.push(generateNavigationButtons());
    }

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

    // Capitalize a string
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    for (const item of detailedItems) {
        if (item.isDirectory) {
            structure.push(`<li class="folder open"><span><i class="fas fa-folder-open"></i> ${capitalize(item.name)}</span>`);
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
