const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');
const app = express();

app.set('port', process.env.PORT || 3001);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session());

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
