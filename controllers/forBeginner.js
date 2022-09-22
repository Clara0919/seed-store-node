const database = require('../utils/database')
const Sequelize = require('sequelize');

const getForBeginner = (req, res) => {
    database.query("SELECT * FROM seed_store.allProducts ORDER BY RAND() LIMIT 8", { type: Sequelize.QueryTypes.SELECT }).then((results) => {
        return res.json({ message: '連接成功', data: results })
    })
}

module.exports = getForBeginner
