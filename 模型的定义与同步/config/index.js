module.exports = {
    development: {
      username: 'root',
      password: 'qq123',
      database: 'myschooldb',
      host: 'localhost',
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  };