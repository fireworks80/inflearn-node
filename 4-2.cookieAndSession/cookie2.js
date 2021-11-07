const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookie = (cookie = '') => {
  return cookie
    .split(';')
    .map((v) => v.split('='))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});
};

http
  .createServer(async (req, res) => {
    const cookies = parseCookie(req.headers.cookie);

    if (req.url.startsWith('/login')) {
      const { query } = url.parse(req.url);
      const { name } = qs.parse(query);
      const expires = new Date();

      expires.setMinutes(expires.getMinutes() + 5);

      res.writeHead(302, {
        Location: '/',
        'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toUTCString()}; HttpOnly; Path=/`,
      });
      res.end();
    } // login

    // cookie가 있으면
    else if (cookies.name) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`<h1>안녕하세요 ${cookies.name}</h1>`);
    }

    // 처음 들어 왔다면
    else {
      console.log('else');
      try {
        const data = await fs.readFile('./cookie.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(error);
      }
    }
  })
  .listen(8080, () => {
    console.log('8080 port');
  });
