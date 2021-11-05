const http = require('http');

http
  .createServer((req, res) => {
    // 서버에서 내려주는 파일이 어떤건지 브라우저에게 알려줌
    // 사파리에서는 head를 안넣어 주면 html인지 알지 못함
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>hello Node</h1>');
    res.end('<p>bye</p>');
  })
  .listen(8080, () => {
    // listen에 대한 callback
    console.log('8080 port');
  });
