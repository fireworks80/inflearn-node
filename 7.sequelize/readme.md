# sequelize

: js 코드를 sql문으로 변경해준다. 간단한 부분만 가능 복잡한 서비스의 경우는 sql을 사용 해야 한다.

## 설치

```
# mysql은 따로 설치 해줘야 한다.
# mysql2: db가 아닌 드라이버 (node.js와 mysql을 이어주는 역할)
npm i express morgan nunjucks sequelize sequelize-cli mysql2

# 시퀄라이즈 구조 생성 (/models, /config/config.json, /seeders, /migrations)
npx sequelize init

```

/models/index.js 의 기본 코드는 삭제 후 현재 코드로 변경 한다.

/models/모델명.js(db의 table 이름)을 생성

```
const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      컬럼명: {
        속성들
      }
    }, {
      모델설정
      timestamps: f/t (true 일경우 craetedAt, updatedAt이 자동으로 추가 된다.) 이번 예제는 created_at을 직접 구현 해본것 임
      underscored: f/t (컬럼명들을 snake_case 또는 카멜케이스로 설정할 수 있다.)
      paranoid: f/t (deletedAt이 추가 된다.)
      modelName: 'User', javascript에서 쓰이는 이름
      tableName: 'users' sql에서 쓰이는 이름 (modelName에 대해 복수형, 소문자로 이름을 짓는다.)
    });
  }
    static associate(db) {
      db.User.hasMany(db.Comment, {foreignKey: 'commenter', sourceKey: 'id'});
      db.Commenter.belongsTo(db.User, {foreignKey: 'commenter', targetKey: 'id'});

      // hasMany => sourceKey, belongsTo => targetKey
      // foreignKey의 'commenter'는 belongsTo를 가지고 있는 모델에 생성 된다.
    }// 관계를 설정 한다.
}

# sequelize는 id를 자동으로 생성해준다.


// 1:N 관계를 hasMany()로 표현
//  belongsTo() 해당 모델이 어디에 속해 있다.

// 1:1 hasOne()
// belongsTo()
// 1:N,1:1은 belongsTo의 테이블에 foreignKey에 해당하는 컬럼이 생긴다.

// 다대다
// db.Post.belongsToMany(db.Hashtag, {through: 'PostHashtag});
// db.Hashtag.belongsToMany(db.Post, {through: 'PostHashtag});
// 다대다 관계는 중간 테이블 (PostHashtag)이 생긴다.
```
