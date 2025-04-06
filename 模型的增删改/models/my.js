const sequelize = require('./db');
const { DataTypes } = require('sequelize');


const my = sequelize.define('my', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = my;