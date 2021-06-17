const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();

app.use(morgan('dev'));
app.use(cookieParser());

app.set('port', process.env.PORT || 3001);

app.get('/', (req, res) => {
  const name = req.cookies.visitors || 0;
  res.cookie('name', encodeURIComponent(name), {
    // expires: new Date(),
    httpOnly: true,
    path: '/',
  });
  res.send('hello');
});

app.get('/about', (req, res) => {
  console.log(req.cookies);
  const { name } = req.cookies;
  res.clearCookie('name', encodeURIComponent(name), {
    httpOnly: true,
    path: '/',
  });

  res.send('about');
});

app.listen(app.get('port'), (req, res) => {
  console.log('서버 실행 중');
});
