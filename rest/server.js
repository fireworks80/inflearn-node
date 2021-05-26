const http = require('http');
const fs = require('fs').promises;

const users = {};

http
  .createServer(async (req, res) => {
    try {
      if (req.method === 'GET') {
        if (req.url === '/') {
          const data = await fs.readFile('./restForm.html');

          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          return res.end(data);
        } else if (req.url === '/about') {
          // /about
          const data = await fs.readFile('./about.html');
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          return res.end(data);
        } else if (req.url === '/users') {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          return res.end(JSON.stringify(users));
        } // if

        // '/'일 경우 restForm.html에서 script, favicon을 요청 함
        try {
          const data = await fs.readFile(`.${req.url}`);
          return res.end(data);
        } catch (err) {} // try / catch

        // post
      } else if (req.method === 'POST') {
        let body = '';

        if (req.url === '/user') {
          req.on('data', (chunk) => {
            body += chunk;
          });

          return req.on('end', () => {
            // console.log(body);
            const { value } = JSON.parse(body);
            const id = Date.now();

            users[id] = value;
            res.writeHead(201, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('ok');
          });
        } // if
      } else if (req.method === 'PUT') {
        console.log(typeof req.url);
        if (req.url.startsWith('/user/')) {
          const key = req.url.split('/')[2];
          let body = '';

          req.on('data', (chunk) => {
            body += chunk;
          }); // req.on

          return req.on('end', () => {
            // console.log('Put body: ', JSON.parse(body).name);

            users[key] = JSON.parse(body).name;
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            return res.end('ok');
          });
        } // if
      } else if (req.method === 'DELETE') {
        // console.log('delete', req.url);
        if (req.url.startsWith('/user/')) {
          const key = req.url.split('/')[2];

          delete users[key];

          res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
          return res.end('ok');
        } // if
      } // if / else

      res.writeHead(404);
      res.end('NOT FOUND');
    } catch (err) {
      console.error(err);
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(err.message);
    } // try / catch
  })
  .listen(8080, () => {
    console.log('listen 8080');
  });
