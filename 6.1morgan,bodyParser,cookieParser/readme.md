# morgan, bodyParser, cookieParser

## morgan

```
GET / 304 2.521 ms - -
```

와 같이 정보가 나온다.

## cookie parser

```
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// app.use(cookieParser('암호값?'));
...

// 쿠키 설정
app.get('/', (req, res) => {
  req.cookies // {name: 0}
  req.signedCookies; // 암호화 된 쿠키를 가져온다? 암호보다는 서명이 좀 더 정확한 표현
  const name = req.cookies.visitors || 0;
  res.cookie('name', encodeURIComponent(name), {
    // expires: new Date(),
    httpOnly: true,
    path: '/',
  });
  res.send('hello');
});

// 쿠키 삭제
 res.clearCookie('name', encodeURIComponent(name), {
    httpOnly: true,
    path: '/',
  });

```

## body parser

express에 body parser가 들어가 있어서 더이상 따로 body parser는 쓰지 않는다.

```
// client에서 json을 보내 줬을때 json을 parsing 해서 req.body에 넣어 준다.
app.use(express.json());

// client에서 form데이터를 보낼때 (form data  parsing)
// {extended: true}를 하면 query string parsing
// true: qs, false면 querystring 모듈을 사용
app.use(express.urlencoded({extended: true}));
```

이렇게 넣기만 하면

```
app.get('/', (req, res) => {
  req.body.name
});
```

이와 같이 바로 사용 가능하다.

## multer

form에서 이미지, file 전송할 때 body parser에서 처리하지 못하므로 multer 사용
