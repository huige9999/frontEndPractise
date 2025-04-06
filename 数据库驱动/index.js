const mysql = require("mysql2/promise");


// async function test() {

//     const connection = await mysql.createConnection({
//         host: "localhost",
//         user: "root",
//         password: "qq123",
//         database: "test"
//     });
//     // Retrive
//     // const [rows] = await connection.query("SELECT * FROM company");
//     // console.log(rows);


//     // Create
//     // const [result] = await connection.query("INSERT INTO company(name,location,buildDate) values('Google','Mountain View',curdate())");
//     // console.log(result);

//     // Delete id = 5
//     // const [result] = await connection.query("DELETE FROM company WHERE id = 5");
//     // console.log(result.affectedRows);


//      // Update id = 4将name改为“谷歌”
//      const [result] = await connection.query("UPDATE company SET name = '谷歌' WHERE id = 4");
//      console.log(result.affectedRows);


//     connection.end();
// }

// test();


// 创建连接池
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "qq123",
    database: "test",
    multipleStatements: true
});

async function test(name) {
    // 查询name包含name的公司信息
   const sql = "select * from employee where name like concat('%',?, '%')";
   const [rows] = await pool.execute(sql, [name]);
   console.log(rows);
   // 关闭连接池
   pool.end();
}
test("刘");