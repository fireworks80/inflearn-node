const Sequelize = require('sequelize');
const env = process.env.MODE_ENV || 'development';
const config = require('../config/config.json')[env];
const User = require('./user');
const Comment = require('./comment');
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.User = User;
db.Comment = Comment;

User.init(sequelize);
Comment.init(sequelize);

User.associate(db);
Comment.associate(db);

module.exports = db;
