const http = require('http');
const fs = require('fs').promises;

const users = {}; // 데이터 저장용

http
  .createServer(async (req, res) => {
    try {
      if (req.method === 'GET') {
        if (req.url === '/') {
          const data = await fs.readFile('./restForm.html');
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          return res.end(data);
        } else if (req.url === '/about') {
          const data = await fs.readFile('./about.html');
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          return res.end(data);
        } else if (req.url === '/users') {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          return res.end(JSON.stringify(users));
        } // if

        try {
          const data = await fs.readFile(`.${req.url}`);
          return res.end(data);
        } catch (err) {
          // 주소에 해당하는 라우트를 못찾았다면 404발생
        } // try / catch
      } else if (req.method === 'POST') {
        if (req.url === '/user') {
          let body = '';

          req.on('data', (data) => {
            body += data;
          });

          return req.on('end', () => {
            console.log('POST 본문 Body', body);
            const { name } = JSON.parse(body);
            const id = Date.now();

            users[id] = name;
            res.writeHead(201, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('ok');
          });
        } // if
      } else if (req.method === 'PUT') {
        if (req.url.startsWith('/user/')) {
          const key = req.url.split('/')[2];
          let body = '';

          req.on('data', (data) => {
            body += data;
          });

          return req.on('end', () => {
            console.log('Put 본문', body);
            users[key] = JSON.parse(body).name;
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            return res.end('ok');
          });
        } // if
      } else if (req.method === 'DELETE') {
        if (req.url.startsWith('/user/')) {
          const key = req.url.split('/')[2];
          delete users[key];
          res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
          return res.end('ok');
        } // if
      } // if

      res.writeHead(404);
      return res.end('NOT FOUND');
    } catch (err) {
      console.error(err);
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(err.message);
    } // try /catch
  })
  .listen(8080, () => {
    console.log('8080 서버 대기중');
  });
