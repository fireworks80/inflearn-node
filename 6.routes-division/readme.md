# 라우트 분리

: 라우터(메서드와 url이 있는 것)를 분리

## 라우트 매개변수

```
router.get('/get/:id' ...);

:id : 라우트 매개 변수
* : 와일드 카드 (와일드 카드는 다른 라우트 보다 항상 맨 나중에...)
```

## 쿼리스트링

```
/user/213?limit=5&skip=10

# console

{id: '213'}  // req.params.id

{limit: '5', skip: '10'} // req.query.limit, req.query.skip
```

## 라우터 그룹화 하기

: 주소는 같지만 메서드가 다를 경우

```
router.get('/abc', ...);
router.post('/abc', ...);

# router.route로 묶을 수  있다.

router.route('/abc')
      .get((req, res) => {
        res.send('GET /abc');
      })
      .post((req, res) => {
        res.send('POST /abc');
      });
```

## res
- res.end() : 데이터 없이 응답을 보낼때 사용
- res.send() : 데이터 보낼때
- res.sendFile(경로) : 경로에 위치한 파일을 응답
