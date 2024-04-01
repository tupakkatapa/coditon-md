#!/usr/bin/env node
const MarkdownIt = require('markdown-it');
const express = require('express');
const favicon = require('serve-favicon');
const fs = require('fs').promises;
const hljs = require('highlight.js');
const markdownItAnchor = require('markdown-it-anchor');
const path = require('path');
const yaml = require('js-yaml');
const RSS = require('rss');

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
                if (args[i + 1] && !args[i + 1].startsWith('-')) {
                    NAME = args[i + 1];
                    i++;
                    while (i + 1 < args.length && !args[i + 1].startsWith('-')) {
                        NAME += ` ${args[i + 1]}`;
                        i++;
                    }
                }
                break;
            case '-i':
            case '--image':
                if (args[i + 1]) {
                    IMAGE = args[i + 1];
                    i++;
                }
                break;
            case '-l':
            case '--link':
                i++;
                while (i < args.length && !args[i].startsWith('-')) {
                    const splitIndex = args[i].indexOf(':');
                    if (splitIndex !== -1) {
                        const fab = args[i].substring(0, splitIndex);
                        const href = args[i].substring(splitIndex + 1);
                        if (fab && href) {
                            SOCIAL_LINKS.push({ fab, href });
                        } else {
                            console.error(`Invalid format for --link: ${args[i]}`);
                        }
                    } else {
                        console.error(`Invalid format for --link: ${args[i]}`);
                    }
                    i++;
                }
                i--; // Adjust the index to correctly process the next argument in the outer loop
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
  -n, --name          Set the name displayed on the site (default: 'Mike Wazowski')
  -i, --image         Set the path to the profile picture
  -l, --link          Add link with icon and URL in the format 'icon:url'
                      (e.g., --link fa-github:https://github.com/username --link fa-x-twitter:https://x.com/username)`);
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

app.get('/download/:path(*)', async (req, res) => {
    const filePath = path.join(CONTENTS_DIR, req.params.path);
    if (!MD_EXTENSIONS.includes(path.extname(filePath).toLowerCase())) {
        return res.status(400).send('Unsupported file type.');
    }

    try {
        // Use fs.access to check if the file exists
        await fs.access(filePath, fs.constants.F_OK);
        res.download(filePath); // Proceed to download the file
    } catch (err) {
        if (err.code === "ENOENT") {
            // File does not exist
            res.status(404).send('File not found.');
        } else {
            // Other errors
            console.error('Error downloading file:', err);
            res.status(500).send('Internal Server Error');
        }
    }
});

// Serve the profile image
app.get('/profile-pic', async (req, res) => {
    try {
        if (!IMAGE) {
            return res.status(404).send('Image not found');
        }
        const imageData = await fs.readFile(IMAGE);

        // Dynamically import the 'mime' module correctly
        const mime = await import('mime');
        const mimeType = mime.default.getType(IMAGE);

        if (!mimeType || !mimeType.startsWith('image/')) {
            return res.status(404).send('File is not an image');
        }

        res.setHeader('Content-Type', mimeType);
        res.send(imageData);
    } catch (err) {
        res.status(404).send('Image not found');
    }
});

async function findIndexFile(directory) {
    const files = await fs.readdir(directory);
    const validFiles = files.filter(file =>
        !file.startsWith('.') &&
        MD_EXTENSIONS.includes(path.extname(file).toLowerCase())
    ).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

    if (validFiles.length === 0) {
        throw new Error('No valid files found in the directory');
    }
    return path.join(directory, validFiles[0]);
}

// Route to serve the index page
app.get('/', async (req, res) => {
    try {
        // Use findIndexFile to dynamically get the first Markdown file
        const filePath = await findIndexFile(CONTENTS_DIR);
        const fileContent = await fs.readFile(filePath, 'utf8');
        const { content, metadata } = await parseFileContent(fileContent, filePath);
        const outputContent = metadataToHtml(metadata) + content;

        // Extract the relative path for the download link
        // Assuming CONTENTS_DIR is the base directory and filePath is absolute
        const relativePath = filePath.substring(CONTENTS_DIR.length);

        res.render('index', {
            folderStructure: await generateFolderStructure(CONTENTS_DIR),
            initialContent: outputContent,
            name: NAME,
            image: IMAGE,
            socialLinks: SOCIAL_LINKS,
            relativePath: relativePath, // Pass this for the download link
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
        const relativePath = path.relative(CONTENTS_DIR, filePath);

        req.isAjaxRequest
            ? res.setHeader('Content-Type', 'text/html').send(outputContent)
            : res.render('index', {
                folderStructure: await generateFolderStructure(CONTENTS_DIR),
                initialContent: outputContent,
                name: NAME,
                image: IMAGE,
                socialLinks: SOCIAL_LINKS,
                relativePath: relativePath // Correctly pass relativePath here
            });
    } catch (err) {
        handleError(res, err);
    }
});

// Utility function to generate RSS feed
async function generateRSSFeed() {
    const feed = new RSS({
        title: NAME,
        description: "RSS feed for " + NAME + "'s content",
        feed_url: `http://${HOST}:${PORT}/rss.xml`,
        site_url: `http://${HOST}:${PORT}`,
        image_url: IMAGE,
        managingEditor: 'editor@example.com',
        webMaster: 'webmaster@example.com',
        language: 'en',
        pubDate: new Date().toString(),
        ttl: '60'
    });

    // Recursive function to find markdown files in all subdirectories
    async function findMarkdownFiles(directory) {
        const entries = await fs.readdir(directory, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(directory, entry.name);
            if (entry.isDirectory()) {
                await findMarkdownFiles(fullPath); // Recurse into subdirectories
            } else if (MD_EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
                await processMarkdownFile(fullPath, entry.name);
            }
        }
    }

    // Inside processMarkdownFile function, update to include categories
    async function processMarkdownFile(filePath, fileName) {
        const content = await fs.readFile(filePath, 'utf8');
        const {metadata} = await parseFileContent(content, filePath);
        let title = metadata.title || fileName.replace(/\..+$/, '').split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        const relativePath = path.relative(CONTENTS_DIR, filePath).split(path.sep).join('/'); // Normalize path for URLs

        // Determine category from the file path
        const category = path.dirname(relativePath).split('/').filter(Boolean); // Splits the path and filters out empty values

        feed.item({
            title: title,
            description: metadata.description || 'A new content piece is available.',
            url: `http://${HOST}:${PORT}/content/${encodeURIComponent(relativePath)}`,
            author: metadata.author,
            date: metadata.date,
            guid: `http://${HOST}:${PORT}/content/${encodeURIComponent(relativePath)}`,
            categories: category.length > 0 ? [category.join(' > ')] : [], // Join categories with ' > ' if subdirectories are present
        });
    }

    await findMarkdownFiles(CONTENTS_DIR);

    return feed.xml({indent: true});
}

// Route to serve the RSS feed
app.get('/rss.xml', async (req, res) => {
    try {
        const rss = await generateRSSFeed();
        res.header('Content-Type', 'application/rss+xml');
        res.send(rss);
    } catch (err) {
        console.error('Failed to generate RSS feed:', err);
        res.status(500).send('Failed to generate RSS feed.');
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

    // Check for a level 1 header only before the first level 2 header
    const firstLevelTwoHeaderIndex = contentWithoutFrontMatter.indexOf('## ');
    const contentBeforeFirstLevelTwoHeader = contentWithoutFrontMatter.slice(0, firstLevelTwoHeaderIndex);
    const hasLevelOneHeaderBeforeFirstLevelTwo = /^#\s+/.test(contentBeforeFirstLevelTwoHeader);

    if (hasLevelOneHeaderBeforeFirstLevelTwo || IGNORED_FILES.includes(filenameWithoutExtension.toLowerCase())) {
        prependTitle = false;
    }

    // Function to capitalize the first letter of each word in the filename
    function capitalizeFilename(filename) {
        return filename.split(' ')
                       .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                       .join(' ');
    }

    let title = prependTitle ? `# ${capitalizeFilename(filenameWithoutExtension.replace(/[-_]/g, ' '))}\n\n` : '';
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

// Generate the folder structure in HTML format, excluding ignored files and only displaying date from metadata
async function generateFolderStructure(dir, isRoot = true) {
    const items = await fs.readdir(dir, { withFileTypes: true });
    const detailedItems = [];
    const ascendingDate = false;
    let structure = ['<ul>'];

    // Capitalize the first letter of a string
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Check if a directory is valid recursively
    async function isDirectoryValid(dirPath) {
        const dirItems = await fs.readdir(dirPath, { withFileTypes: true });

        for (const item of dirItems) {
            if (!item.name.startsWith('.')) {
                const itemPath = path.join(dirPath, item.name);
                if (item.isDirectory()) {
                    if (await isDirectoryValid(itemPath)) {
                        return true;
                    }
                } else if (MD_EXTENSIONS.includes(path.extname(item.name))) {
                    return true;
                }
            }
        }
        return false;
    }

    for (const item of items) {
        if (item.name.startsWith('.')) continue;
        const itemBaseName = path.basename(item.name, path.extname(item.name)).toLowerCase();
        if (IGNORED_FILES.includes(itemBaseName)) continue; // Skip ignored files

        const itemPath = path.join(dir, item.name);
        const isDirectory = item.isDirectory();

        if (!isDirectory && !MD_EXTENSIONS.includes(path.extname(item.name))) continue;

        if (isDirectory) {
            if (!(await isDirectoryValid(itemPath))) continue;
            const content = await generateFolderStructure(itemPath, false);
            if (content.trim() === '<ul></ul>') continue;
            detailedItems.push({ name: item.name, path: itemPath, date: '', isDirectory: true, content });
        } else {
            if (!MD_EXTENSIONS.includes(path.extname(item.name))) continue;
            const content = await fs.readFile(itemPath, 'utf8');
            const metadata = (await parseFileContent(content, itemPath)).metadata;
            const date = metadata.date ? metadata.date : '';
            detailedItems.push({ name: item.name, path: itemPath, date, isDirectory: false });
        }
    }

    // Sort detailedItems: files by date, then directories alphabetically
    detailedItems.sort((a, b) => {
        if (!a.isDirectory && !b.isDirectory) {
            if (!a.date || !b.date) return a.name.localeCompare(b.name);
            if (ascendingDate) {
                return a.date.localeCompare(b.date);
            } else {
                return b.date.localeCompare(a.date);
            }
        }

        // Files always come before directories
        if (!a.isDirectory && b.isDirectory) return -1;
        if (a.isDirectory && !b.isDirectory) return 1;

        // Both items are directories, sort alphabetically
        return a.name.localeCompare(b.name);
    });

    // Construct the structure
    for (const item of detailedItems) {
        if (item.isDirectory) {
            structure.push(`<li class="folder open"><span><i class="fas fa-folder-open"></i> ${capitalize(item.name)}</span>`);
            structure.push(await generateFolderStructure(item.path, false));
        } else {
            const itemNameWithoutExtension = capitalize(path.basename(item.name, path.extname(item.name)));
            const relativePath = path.relative(CONTENTS_DIR, item.path).split(path.sep).join('/');
            // Conditionally display date if available
            const dateDisplay = item.date ? `<div class="file-date">${item.date}</div>` : '';
            structure.push(`<li><a href="/content/${relativePath}">${itemNameWithoutExtension}</a>${dateDisplay}</li>`);
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
