# express

:서버 코드를 유지보수 하기 쉽게 해주는 패키지

기본 서버 실행

```
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('hello express');
});

app.listen(3000, () => {
  console.log('익스프레스 서버 실행');
});

```

추가 설정

```
// port를 따로 설정 할 수 있다.
app.set('port', 3001);

...

// set으로 설정된 port를 가져와서 사용 할 수 있다.
app.listen(app.get('port), () => {
  console.log('익스프레스 서버 실행');
});

```

env

```
process.env 에서 PORT를 설정 하지 않으면 3000번 port를 사용한다.
cmd에서 process.env의 PORT를 설정 할 수 있다.

# port
(cmd)

SET PORT=80;

--------------------------------------------

app.set('port', process.env.PORT || 3000);
...
```

## express로 html 서빙하기

```
...
const path = require('path');
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
...
```

운영체제 별로 directory 표시방법이 다르므로 path 모듈을 사용하면 알아서 처리 해준다.
\_\_dirname: 현재 디렉토리 경로에 index.html파일을 합쳐준다.

nodemon실행 후 index.html파일을 변경 했을때 res.sendFile()할 때마다 index.html을 읽어와서 보내므로 서버를 재시작 하지 않아도 반영 되지만, app.js는 node에서 캐시를 하고 있기 때문에 변경사항이 반영 되지 않으므로 서버를 재시작 해야 한다.

## middleware

코드를 분리 했을때 모든 코드들에서 공통으로 사용되어야 할 코드가 있다고 했을때 코드의 중복이 발생한다.
이 중복이 생기지 않도록 하기 위한 것이 middleware이다.
(callback이 미들웨어이다.)??

```
app.get('/', (req, res) => {
  console.log('공통 부분'); // 중복
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', (req, res) => {
  console.log('공통 부분');// 중복
  res.send('hello express');
});

app.get('/about', (req, res) => {
  console.log('공통 부분');// 중복
  res.send('hello express');
});

app.listen(app.get('port'), () => {
  console.log('익스프레스 서버 실행');
});

------ 공통부분 적용 -------------
...
 // 공통인 부분이 실행된다.
 // 하지만 use 이후의 라우터들이 실행이 되지 않는다.
 // use의 callback의  매개변수중 next 가 있는데
 // 미들웨어에서는 next()를 실행을 해줘야지 다음 라우터 중에 일치하는 것을 찾아가게 된다.
app.use((req, res, next) => {
  console.log('공통 부분');
  next();
});

// 위 코드에서

(req, res, next) => {
  console.log('공통 부분');
  next();
}
이부분이 미들웨어 임

app.get('/', (req, res) => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, 'index.html'));
});

...

-------------------------------------
특정 라우트? 에서만 실행시키고 싶을 경우

// /about에서만 실행이 된다.
app.use('/about', (req, res, next) => {
  console.log('공통 부분');
  next();
});

-------------------------------------
여려개의 미들웨어 실행

app.use((req, res, next) => {
  console.log('1. 공통 부분');
  next();
},(req, res, next) => {
  console.log('2. 공통 부분');
  next();
},(req, res, next) => {
  console.log('3. 공통 부분');
  next();
});


```

express는 기본적으로 위에서 아래로 실행 하지만 middleware경우는 자동으로 넘어가지 않으며 next()를 실행해야 다음으로
넘어가게 된다.

### 라우트 매개변수 (와일드 카드)

```
app.get('/category/JAVA', (req, res) => {
  res.send('hello JAVA');
});
app.get('/category/Javascript', (req, res) => {
  res.send('hello Javascript');
});
app.get('/category/css', (req, res) => {
  res.send('hello css');
});

카테고리 뒤의 path 값에 따라 데이터?를 보여주려 할때 사용

app.get('/category/:name', (req, res) => {
  res.send(`hello `${req.params.name}`);
});

하게 되면 category/데이터값 을 하게되면 path로 넘어 온 값을 변수로 사용 할 수 있다.

```

만약 라우트 매개변수는 같은 라우터의 아래에 있어야 한다.

```

이 부분만 실행되고 다음으로 넘어가지 않는다.
app.get('/category/:name', (req, res) => {
  res.send(`hello ${req.params.name}`);
});

app.get('/category/js', (req, res) => {
  res.send(`hello js`);
});


------------------------------------------
app.get('/category/js', (req, res) => {
  res.send(`hello js`);
});

app.get('/category/${name}', (req, res) => {
  res.send(`hello ${req.params.name}`);
});

```

### \*

```
모든 get요청을 다 처리하겠다. 는 뜻
app.get('*', (req, res) => {
  ...
});
```

** 주의 **
res.send()는 next()를 실행하지않고 send()메서드 실행 후 이 후 작업을 끝내야 한다.
다음 미들웨어로 넘어가면 에러가 발생할 수 있다.

라우트 매개변수나, \* 같이 범위가 넓은 것들은 아랫쪽에 넣어야 한다.

## error

express는 error을 자동으로 처리 해준다.
단 미들웨어의 매개변수는 (err, req, res, next) 네개의 매개변수 모두 넣어 줘야 한다.

### 에러 처리

```
...
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

...
// 라우터 하단에서 처리
app.use((err, req, res, next) => {
  res.send('에러발생');
});

...
```

### 404처리

없는 라우터를 넣었을때 기본적으로 'Cannot GET / ooo' 으로 처리된다.
404는 에러가 아니다.

```
app.use((req, res, next) => {
  res.send('404 입니다.');
});
```

커스텀 할 수 있댜.

기본적으로 res.status(200)이 생략되어 있다.
404에러가 발생해도 status를 속일 수 있다.

** 주의 할 것 **
한 라우터에서 .json, .send, .sendFile등 여러번 하게 되면 오류가 발생한다.
요청 한번에 응답은 1회인데 요청 1회에 응답을 여러번 보내면 오류가 발생

```

app.get('/category/java', (req, res) => {
  res.sendFile(...);
  res.send(`hello java`);
  res.json({hello: '안녕하세요'});
});

// Cannot set headers after they are sent to the client

```

또는 .send(), .json() 이후 .writeHead()를 하게 되도 위와 같은 오류가 발생 한다.

http 서버 에서는

```
res.writeHead();
res.end()
```

를 사용했지만 express에서는

```
res.send()
```

하나로 처리하도록 되었다.

```
app.get('/', (req, res) => {
  res.json({});
});

// res.json()이 return 이 아니므로 함수가 종료되는 것이 아니다.
```

### next()

next()는 다음 미들웨어를 실행시키지만 next(인수)가 들어가게 되면 에러처리 미들웨어로 넘어간다.

```
app.use((req, res, next) => {
  console.log('1 요청 실행');
  next();
}, (req, res, next) => {
  try {
    console.log('에러야');
  } catch (error) {
    next(error);
  }
});
...

app.use((err, req, res, next) => {
  console.log(에러발생);
});
```

### next('route')

```
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));

  // 조건에 맞게 라우터를 컨트롤 할 수 있다.
  // 같은 라우터에서 조건에 맞으면 다음 라우트의 미들웨어를 실행
  // 아니면 현재 라우트의 다음 미들웨어를 실행한다.

  if (true) {
    next('route');
  } else {
    next();
  }

}, (req, res, next) => {
  console.log('run 1');
});

app.get('/', (req, res) => {
  console.log('run 2');
});


```
