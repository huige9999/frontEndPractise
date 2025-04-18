const config = require("../config/index")
const { Sequelize } = require("sequelize")

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
    host: config.development.host,
    dialect: config.development.dialect,
});

module.exports = sequelize;