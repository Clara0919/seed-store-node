const sequelize = require('sequelize');
const database = require("../utils/database")

//定義資料結構
const Product = database.define('allProducts', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: sequelize.STRING,
        allowNull: false,
    },
    category: {
        type: sequelize.STRING,
        allowNull: false,
    }, price: {
        type: sequelize.INTEGER,
        allowNull: false,
    }, seedAmount: {
        type: sequelize.STRING,
        allowNull: false,
    }, feature: {
        type: sequelize.STRING(500),
        allowNull: false,
    }, seedingTime: {
        type: sequelize.STRING,
        allowNull: false,
    }, bhSeason: {
        type: sequelize.STRING,
        allowNull: false,
    }, temperature: {
        type: sequelize.STRING,
        allowNull: false,
    }, day: {
        type: sequelize.STRING,
        allowNull: false,
    }, img1: {
        type: sequelize.STRING(500),
        allowNull: false,
    }, img2: {
        type: sequelize.STRING(500),
        allowNull: false,
    }, img3: {
        type: sequelize.STRING(500),
        allowNull: false,
    }

})

module.exports = Product