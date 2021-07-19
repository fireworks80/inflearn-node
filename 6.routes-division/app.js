const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');

// index.js를 가져온다
const indexRouter = require('./routes');

// user.js를 가져온다 (.js 확장자는 뺀다)
const userRouter = require('./routes/user');

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// url path와 맞는 라우터를 호출 한다.
// index는 생략한다.
app.use('/', indexRouter);

// localhost:3007/user
app.use('/user', userRouter);

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

app.listen(app.get('port'), () => {
  console.log(`${app.get('port')} listen`);
});
