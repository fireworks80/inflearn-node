#npm

- 노드패키지 매니저
- 다른 사람들이 만든 소스코드들을 모아둔 저장소
- 패키지: npm에 업로드된 노드 모듈
- 모듈이 다른 모듈을 사용할 수 있듯 패키지도 다른 패키지를 사용할 수 있음
- 의존 관계라고 부름

현재 프로젝트에 대한 정보와 사용중인 패키지에 대한 정보를 담은 파일 package.json

```
npm init

name: 페키지 이름
version: 패키지 버전
entry point: 자바스크립트 실행 파일 진입점
test command: 코드를 테스트할 때 입력할 명령어를 의미 package.json scripts 속성 안의 test 속성에 저장됨
git repository: 코드를 저장해둔 git 저장소 주소를 의미
keywords: npm 공식 홈페이지에서 패키지를 쉽게 찾을 수 있게 해준다.
license: 해당 패키지의 라이선스

# packace.json
{
  "name": "npm-test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",

  // 터미널에 치는 명령어에 별명을 붙인거라 생각하면 된다.
  "scripts": {
    // (콘솔에서) npm run test
    // start라는 명령어?는 run을 빼도 된다.
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "fireworks80",
  "license": "MIT"
}

```

직접 package.json을 만들어서 직접 입력해도 되고
위 처럼 cmd에서 생성해도 된다.

```
npm i -D nodemon
```

-D 옵션은 개발 할때만 사용하는 모듈설치시 사용
