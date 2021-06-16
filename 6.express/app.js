const express = require('express');
const app = express();
const path = require('path');

app.set('port', process.env.PORT || 3007);

app.use(
  (req, res, next) => {
    console.log('1. 공통 부분');
    next();
  },
  (req, res, next) => {
    console.log('2. 공통 부분');
    next();
  },
  (req, res, next) => {
    throw new Error('에러');
  }
);

app.get('/', (req, res) => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', (req, res) => {
  res.send('hello express');
});

app.get('/about', (req, res) => {
  res.send('hello express');
});

app.get('/category/:name', (req, res) => {
  res.send(`hello 라우트 매개변수`);
});

app.get('/category/java', (req, res) => {
  res.send(`hello java`);
});

app.use((req, res, next) => {
  res.send('404 입니다.');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.send('에러발생');
});

app.listen(app.get('port'), () => {
  console.log('익스프레스 서버 실행', app.get('port'));
});
