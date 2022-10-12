const sequelize = require('sequelize')
const database = require('../utils/database')
//////////////////////////////////////////////////////////
const Cart = database.define('cart', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    amount: {
        type: sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }
})

module.exports = Cart
