const http = require('http');
const fs = require('fs').promises;
const port = 8080;

const users = {};

http
  .createServer(async (req, res) => {
    const { method, url } = req;

    try {
      if (method === 'GET') {
        if (url === '/') {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          const data = await fs.readFile('./index.html');
          return res.end(data);
        } // if

        if (url === '/about') {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          const data = await fs.readFile('./about.html');
          return res.end(data);
        }

        if (url === '/users') {
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          return res.end(JSON.stringify(users));
        }

        // url에 해당하는 path가 없을 경우
        // front.js 해당 폴더에서 url에 해당하는 파일을 읽어서 내려 준다.
        // 파일을 내려 주지 않으면 pending에 걸린다.
        try {
          const data = await fs.readFile(`./${url}`);
          return res.end(data);
        } catch (e) {}

        res.writeHead(404);
        return res.end('NOT FOUND');
      } // if

      if (method === 'POST') {
        if (url === '/user') {
          let data = '';
          req.on('data', (chunk) => {
            data += chunk;
          });

          return req.on('end', () => {
            const { name } = JSON.parse(data);
            const id = Date.now();
            users[id] = name;

            res.writeHead(201, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('ok');
          });
        } // user
      } // post if

      if (method === 'PUT') {
        if (url.startsWith('/user/')) {
          const key = url.split('/')[2];

          let data = '';
          req.on('data', (chunk) => {
            data += chunk;
          });

          req.on('end', () => {
            users[key] = JSON.parse(data).name;
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            return res.end('ok');
          });
        } // if
      } // put

      if (method === 'DELETE') {
        if (url.startsWith('/user/')) {
          const key = url.split('/')[2];
          delete users[key];

          res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
          return res.end('ok');
        }
      }
    } catch (error) {
      console.error(error);
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end(error);
    }
  })
  .listen(port, () => {
    console.log(`${port} server`);
  });
