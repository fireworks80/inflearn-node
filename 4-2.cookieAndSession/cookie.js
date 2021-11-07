const http = require('http');

http
  .createServer((req, res) => {
    console.log('cookie: ', req.headers.cookie);

    res.writeHead(200, { 'Set-Cookie': 'mycookie=test' });
    res.end('Hello Cookie');
  })
  .listen(8080, () => {
    console.log('8080 listen');
  });
