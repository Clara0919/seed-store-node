const sequelize = require('sequelize');
const database = require('../utils/database');

const OrderItem = database.define('orderItem', {
  id: {   
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
	quantity: {                 //數量
    type: sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

module.exports = OrderItem;