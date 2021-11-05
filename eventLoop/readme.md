# 이벤트 루프

setTimeout(),setImterval()
이 Promise 보다 먼저 실행이 되어도
task que에서는 promise가 먼저 호출 스텍에 올라간다

```
setTimeout(() => console.log('hello'));
// ------ 동기로 시작 되는 부분 -------------/
new Promise((resolve) => {resolve('hi)}).then(console.log);

# result
hi
hello
```
