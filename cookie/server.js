const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '') => {
  console.log(cookie);
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
    // console.log(req.headers.cookie);
    const cookies = parseCookies(req.headers.cookie);
    // console.log(cookies);
    if (req.url.startsWith('/login')) {
      const { query } = url.parse(req.url);
      const { name } = qs.parse(query);
      const expires = new Date();

      expires.setMinutes(expires.getMinutes + 5);
      res.writeHead(302, {
        Location: '/',
        'Set-Cookie': `name=${decodeURIComponent(name)}; Expires=${expires.toGMTString()}; Httponly; Path=/`,
      });
      return res.end();
    } else if (cookies && cookies.name) {
      console.log('has');
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`${cookies.name}님 안녕하세요`);
    } else {
      try {
        const data = await fs.readFile('./cookie.html');

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(err.message);
      }
    } // if / else
  })
  .listen(8080, () => {
    console.log('8080 listen');
  });