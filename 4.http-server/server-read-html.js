const http = require('http');
const fs = require('fs').promises;

http
  .createServer(async (req, res) => {
    try {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      const data = await fs.readFile('./index.html');
      res.end(data);
    } catch (error) {
      console.error(error);
      // 일반 문자열 이라고 알려준다.
      res.writeHead(200, { 'Content-Type': 'text/plain; charset-utf-8' });
      res.end(err.message);
    }
  })
  .listen(8080, () => {
    // listen에 대한 callback
    console.log('8080 port');
  });
