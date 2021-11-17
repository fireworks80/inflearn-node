# COOKIE, SESSION

## 요청의 단점

- 서버는 누가 요청을 보냈는지 모름.(ip, 브라우저 정보 정도만 앎)

### 쿠키

- key=value
- 처음에는 서버가 클라이언트로 쿠키를 보낸다.
- 매 요청마다 서버에 동봉해서 보낸다.
- 서버는 쿠키를 읽어서 누구인지 파악

```
# key=value: 쿠키 데이터
# Expires: 없음 session cookie (브라우저가 닫히면 사라진다)
# HttpOnly: javascript로 쿠키에 접근 하지 못하도록
# Path=/: / 하위 주소는 해당 쿠키가 유효 하다.
'Set-Cookie': 'key=value; Expires=시간; HttpOnly; Path=/'
```

### 세션

- 쿠키는 노출되고 수정되는 위험이 있음.
- 중요한 정보는 서버에서 관리하고 클라이언트에는 세션 키만 제공
- 서버에 세션 객체 생성 후 uniqueInt(키)를 만들어 속성명으로 사용
- 속성 값에 정보 저장하고 uniqueInt를 클라이언트에 보냄

### 생겼던 오류들

```
node:internal/errors:464
    ErrorCaptureStackTrace(err);
    ^

TypeError [ERR_INVALID_CHAR]: Invalid character in header content ["Set-Cookie"]
    at storeHeader (node:_http_outgoing:516:5)
    at processHeader (node:_http_outgoing:511:3)
    at ServerResponse._storeHeader (node:_http_outgoing:410:11)
    at ServerResponse.writeHead (node:_http_server:348:8)
    at Server.<anonymous> (/Users/nhncommerce/Desktop/study/inflearn-node/4-2.cookieAndSession/cookie-remind.js:16:11)
    at Server.emit (node:events:394:28)
    at parserOnIncoming (node:_http_server:927:12)
    at HTTPParser.parserOnHeadersComplete (node:_http_common:128:17) {
  code: 'ERR_INVALID_CHAR'
```

Expires의 날짜를 잘못 써줘서 났음.
Date 객체의 toUTCString()는 deprecated 되었다고 해서 toUTCString()로 변경
Expires앞에 개행을 해줘도 같은 오류가 발생 한다.
