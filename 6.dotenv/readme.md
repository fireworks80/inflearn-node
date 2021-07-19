# dotenv

: 비밀키, 환경변수 설정

## 작성법

```
# .dotenv
key=value
key=value // 세미콜론 생략
```

## 사용

root에 .env파일 생성

```
npm i dotenv

/root
-- .env


# app.js
const dotenv = require('dotenv');

dotenv.config(); // .env를 사용하는 파일/코드 보다 위에서

app.use(cookieparser(process.env.변수명));
```
