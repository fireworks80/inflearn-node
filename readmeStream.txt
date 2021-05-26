Angular 애플리케이션은 Angular에서 제공하는 NgModule 이라는 모듈 체계로 구성됩니다. NgModule은 애플리케이션 도메인이나 작업 흐름, 기능이 연관된 Angular 구성요소들을 묶어놓은 단위입니다. NgModule에는 컴포넌트나 서비스 프로바이더 등이 포함될 수 있으며, NgModule의 일부를 외부로 공개할 수도 있고, 다른 NgModule에서 이 부분을 가져와서 사용할 수도 있습니다.

모든 Angular 애플리케이션에는 최상위 모듈이 반드시 존재하며, 이 모듈은 보통 app.module.ts 파일에 AppModule이라고 정의합니다. 애플리케이션은 이 NgModule을 부트스트랩하며 시작됩니다.

애플리케이션의 규모가 작다면 NgModule은 하나만 있을 수도 있지만, 대부분은 좀 더 많은 기능 모듈 로 구성됩니다. 이 모듈은 AppModule의 자식 계층으로 구성되기 때문에 AppModule을 최상위 모듈이라고 합니다.