const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5100;


// 使用cors中间件 允许跨域
app.use(cors());

app.get('/api/local',(req, res) => {
   res.json({
     message: 'Hello from local API',
     data: [1,2,3],
     timestamp: new Date().toISOString()
   });
});

app.listen(PORT,() => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
});