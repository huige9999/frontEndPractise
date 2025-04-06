// require('./models/sync'); // 先将模型同步到数据库

const myService = require('./services/myService');

// 新增一条数据
myService.createMy({
    firstName: '大胆',
    lastName: '李',
}).then(result => {
    console.log(result);
}).catch(err => {
    console.log(err);
});
