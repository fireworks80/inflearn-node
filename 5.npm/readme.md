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

package.json에 있는 모듈설치하기

```
npm i
```

전역 설치

- 명령어로 사용 할 수 있다

```
npm i -g rimraf
```

전역설치 하면 package.json에 기록되지 않는다.
그래서 dependencies / devDependencies로 설치후
커멘트 창에서 'npx' 를 앞에 붙여서 사용하면 글로벌 명령어로 사용 할 수 있다.

package-lock.json

- 정확한 버전 기록 됨 (dependencies로 설치한 모듀들의 dependencies들의 버전까지 나온다.)
- 버전 문제가 생기는 것을 막는다.

## version

- 노트 패키지의 버전은 SemVer(유의적 버저닝)방식
- Major(주 버전), Minor(부 버전), Patch(수 버전)
- Major: 하위 버전과 호환되지 않은 수정 사항이 생겼을때 올림
- Monor: 하위 버전과 호환되는 수정 사항이 생겼을때 올림
- Patch: 기능에 버그를 해결했을때 올림

## 버전 기호

- ^1 : 뒤의 Minor, patch는 어떤 수가 올라가도 상관 없지만 Major은 무조건 1이어야 한다.
- ~1.1: Major, Minor까지는 일치 시킨다. (~은 잘 사용하지 않는다.)
- 1.1.1(기호가 없을때): Major, Minor, patch 세자리 다 고정이다.

## npm 명령어

- [npm cli document](https://docs.npmjs.com/cli/v7/commands)

### 자주사용하는 명령어

- npm outdated: 어떤 패키지에 기능 변화가 생겼는지 알 수 있다.
- npm uninstall: 패키지를 삭제 가능
- npm search
- npm info <패키지명>: 패키지 정보

```
# package.json에 따라 업데이트 된다.
npm update
```
