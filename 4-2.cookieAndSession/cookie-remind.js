const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie) => {
  return cookie
    .split(';')
    .map((c) => c.split('='))
    .reduce((acc, [k, v]) => {
      acc[k] = v;
      return acc;
    }, {});
};

http
  .createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie);

    if (req.url.startsWith('/login')) {
      const { query } = url.parse(req.url);
      const { name } = qs.parse(query);
      const date = new Date();
      date.setMinutes(date.getMinutes() + 5);
      res.writeHead(302, {
        Location: '/',
        'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${date.toUTCString()}; HttpOnly; Path=/`,
      });
      res.end();
    } else if (cookies?.name) {
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`${cookies.name} 안녕하세요`);
    } else {
      try {
        const data = await fs.readFile('./cookie.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset="utf-8' });
        res.end(data);
      } catch (err) {
        res.writeHead(404);
        res.end('NOT FOUND');
      }
    }
  })
  .listen(8080, () => {
    console.log('listen 8080 port');
  });
