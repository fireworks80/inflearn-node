const http = require('http');
const url = require('url');
const fs = require('fs').promises;
const qs = require('querystring');

const parseCookie = (cookie = '') =>
  cookie
    .split(';')
    .map((v) => v.split('='))
    .reduce((acc, [key, value]) => {
      return (acc[key.trim()] = decodeURIComponent(value));
    }, {});

const session = {};

http
  .createServer(async (req, res) => {
    const cookies = parseCookie(req.headers.cookie);
    console.log(cookies);
    if (req.method === 'GET') {
      if (req.url.startsWith('/login')) {
        const { query } = url.parse(req.url);
        const { name } = qs.parse(query);
        const expires = new Date();
        const uniqueInt = Date.now();

        expires.setMinutes(expires.getMinutes() + 5);
        res.writeHead(302, {
          Location: '/',
          'Set-Cookie': `session=${uniqueInt}; Expires=${expires.toGMTString()}; Httponly, Path=/`,
        });
        res.end();
      } else if (cookies && cookies.session && session[cookies.session].expires > new Date()) {
        console.log('has cookie');
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`${session[cookies.session].name}님 안녕하세요`);
      } else {
        try {
          const chunk = await fs.readFile('./cookie.html');
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(chunk);
        } catch (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end(err.message);
        }
      } // if
    } // if
  })
  .listen(8080, () => {
    console.log('listen 8080');
  });
