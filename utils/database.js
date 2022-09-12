const sequelize = require("sequelize")

const database = new sequelize('seed_store', 'root', '12345', {
    host: 'localhost',
    dialect: 'mysql'
})
//測試有沒有連上資料庫
database.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

module.exports = database
