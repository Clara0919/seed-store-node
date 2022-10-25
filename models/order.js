const sequelize = require('sequelize')
const database = require('../utils/database')
///////////////////////////////////////////////////////

const Order = database.define('order', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      amount: {
        type: sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
})

module.exports = Order;