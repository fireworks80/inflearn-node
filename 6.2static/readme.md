# static

정적 파일 위치 설정

```
app.use('요청경로', express.static(실제경로)));
app.use('/', express.static(path.join(__dirname, 'public')));
```

미들웨어들 간에도 순서가 중요하다.

```
app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

만약 localhost:3000/favicon.ico 요청이 있다면
morgan 이후 static에서 이미지를 찾고 이미지를 찾으면 이 후 내용은 실행 하지 않고 끝이 난다.

localhost:3000/about(라우트) 이라고 올 경우 static에서 이미지를 찾지 못할 경우 이 후의 코드들이
실행되다가 /about 라우터를 찾아 라우터의 미들웨어를 실행한다.

```
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, 'public')));
```

만일 static이 이렇게 된다면
localhost:3000/favicon.ico 요청이 올때 이미지만 찾으면 되는데 static 전의 모든 미들웨어
cookieParser, express.json 등 실행 되지 않아도 되는 것들이 실행 되어 성능적 문제가 생긴다.

```
// localhost:3000/favicon.ico

app.use(morgan('dev'));
app.use(cookieParser());
app.use(session());
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

이런 경우는 cookie, session은 로그인에 많이 쓰이므로 로그인 된 사용자만 favicon.ico를 제공 하겠다는 의미.

정해진 것은 없지만 서비스에 따라서 미들웨어들의 위치를 조정 하면 된다.

## session

요청마다 개인의 저장공간이라고 생각하면 된다.

```
const session = require('express-session');

app.use(session()); // session 설정 하는 곳
app.use(session({
  resave: false,
  secret: 'zerochopassword',
  cookie: { // session cookie
    httpOnly: true
  },
  name: 'connect.sid' // 기본값임 secret에 의해 서명되어져 있으므로 읽을 수 없는 문자열로 되어 있다.
}));

app.get('/', (req, res) => {
  req.session // 이것은 요청한 사용자의 고유한 session이 된다.
  req.session.id = 'hello'; // 이것은 요청한 사용자의 id가 hello가 된다.
});

```

미들웨어에서 다른 미들웨어로 데이터를 보내기 위해
전역변수, app.set()을 사용 해서는 안된다.

** 데이터 전달 방법 **

```
app.use((req, res, next) => {
  req.session.data = '데이터';
  req.data = '데이터';
  next();
});

app.get('/',(req, res) => {
  req.session.data // 해당 유저의 경우에 한해서만 지속적으로 받을 수 있다.
  req.data // 위 미들웨어에서 보낸 값을 받는다. (한 번의 요청에 의해 받은 데이터)
});
```

### 미들웨어 확장 법

** 로그인 한 사람에게만 static을 보여주고싶을때 **

```
app.use('/', (req, res, next) => {
  // 로그인을 했다면 express static으로 사진을 가져 올 수 있다
  if (req.session.id) {
    express.static(path.join(__dirname, 'public'))(req, res, next);
  } else {
    // 아니면 다음 미들웨어로 넘어 간다.
    next();
  }
});
```
