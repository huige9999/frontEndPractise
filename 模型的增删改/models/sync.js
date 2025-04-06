const sequelize = require('./db')
require('../models/my') // 模型定义

// 模型同步到数据库
sequelize.sync({ force: true })
  .then(() => {
       console.log('sync success')
   })
  .catch(err => {
       console.error('sync error', err)
   });