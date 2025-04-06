const { Sequelize } = require('sequelize');

// 连接数据库
const sequelize = new Sequelize('myschooldb', 'root', 'qq123', {
    host: 'localhost',
    dialect: 'mysql'
  });

module.exports = sequelize;