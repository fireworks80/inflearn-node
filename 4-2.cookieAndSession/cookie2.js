const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookie = (cookies = '') => {
  return cookies
    .split(';')
    .map((cookie) => cookie.split('='))
    .reduce((acc, [k, v]) => {
      acc[k] = decodeURIComponent(v);
      return acc;
    }, {});
};

http
  .createServer(async (req, res) => {
    const cookies = parseCookie(req.headers.cookie);

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
    } else if (cookies && cookies.name) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`hello ${cookies.name}`);
    } else {
      try {
        const data = await fs.readFile('./cookie.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(err);
      }
    }
  })
  .listen(8080, () => {
    console.log('8080 port');
  });
