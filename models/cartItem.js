const sequelize = require('sequelize')
const database = require('../utils/database')
/////////////////////////////////////////////////////////
const cartItem = database.define('cartItem', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    quantity: {
        type: sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }
})

module.exports = cartItem