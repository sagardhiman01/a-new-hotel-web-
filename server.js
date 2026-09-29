const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3005;
const ROOT_DIR = path.resolve(__dirname);
const CONFIG_FILE = path.join(ROOT_DIR, 'data', 'site-config.json');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split('?')[0];

  // API Route: GET /api/config
  if (reqUrl === '/api/config' && req.method === 'GET') {
    fs.readFile(CONFIG_FILE, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to read configuration' }));
        return;
      }
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      });
      res.end(data);
    });
    return;
  }

  // API Route: POST /api/config
  if (reqUrl === '/api/config' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 1e6) { // 1MB limit
        req.destroy();
      }
    });

    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        fs.writeFile(CONFIG_FILE, JSON.stringify(parsed, null, 2), 'utf8', (err) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to write configuration' }));
            return;
          }
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, message: 'Settings saved successfully' }));
        });
      } catch (parseErr) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
      }
    });
    return;
  }

  // Static File Serving
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('405 Method Not Allowed');
    return;
  }

  if (reqUrl === '/') reqUrl = '/index.html';
  if (reqUrl === '/admin') reqUrl = '/admin.html';
  if (reqUrl === '/rooms') reqUrl = '/rooms.html';
  if (reqUrl === '/dining') reqUrl = '/dining.html';
  if (reqUrl === '/banquet') reqUrl = '/banquet.html';
  if (reqUrl === '/yatra') reqUrl = '/yatra.html';
  if (reqUrl === '/contact') reqUrl = '/contact.html';
  if (reqUrl === '/gallery') reqUrl = '/gallery.html';

  let decodedUrl;
  try {
    decodedUrl = decodeURIComponent(reqUrl);
  } catch (e) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('400 Bad Request');
    return;
  }

  // Prevent directory traversal attacks
  const filePath = path.resolve(ROOT_DIR, '.' + decodedUrl);
  if (!filePath.startsWith(ROOT_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const isAsset = /\.(jpg|jpeg|png|webp|gif|svg|woff2|ico)$/i.test(ext);
    const cacheControl = isAsset ? 'public, max-age=86400' : 'no-cache';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Cache-Control': cacheControl,
      'Last-Modified': stats.mtime.toUTCString(),
      'X-Content-Type-Options': 'nosniff'
    });

    if (req.method === 'HEAD') {
      res.end();
      return;
    }

    const stream = fs.createReadStream(filePath);
    stream.on('error', () => {
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      } else {
        res.destroy();
      }
    });

    req.on('close', () => {
      stream.destroy();
    });

    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
