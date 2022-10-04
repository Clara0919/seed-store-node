const sequelize = require("sequelize")
const database = require("../utils/database")
//////////////////////////////////////////////////////////
const allUsers = database.define("allUsers", { //第一個參數是資料庫名稱
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    userName: {
        type: sequelize.STRING,
        allowNull: false,

    },
    email: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize.STRING,
        allowNull: false,
    },
    birthday: {
        type: sequelize.STRING,
        allowNull: false,
    }
})

module.exports = allUsers