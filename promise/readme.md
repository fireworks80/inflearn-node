# Promise

## top level await

```
const promise = new Promise(....);
promise.then((result) => ....);

const result = await promise; // 가능해짐

```

## async 에서 return이 있을때

async는 결론적으로 promise다.

```
async function main() {
  const result = await promise;
  return result;
};

main().then((name) => ...); // async에서 return이 있으면 무조건 then()으로 받으면 됨
# or
const result = await main();

```

async에서 실패가 있을경우는 함수 안에서 try/catch로 감싸면 된다.

```
async function main() {
  try {
    const result = await promise;
    return result;
  } catch(e) {
    // 실패 시
  }
};

```
