const database = require('../utils/database')
const Sequelize = require('sequelize');

const getForBeginner = (req, res) => {
    database.query("SELECT * FROM seed_store.allProducts ORDER BY RAND() LIMIT 8", { type: Sequelize.QueryTypes.SELECT }).then((results) => { 
        //預設會傳回兩筆資料，一個結果array 和 一筆 metadata（例如受影響的行數等等），設置 type: Sequelize.QueryTypes.SELECT 可只傳遞查詢類型格式化結果
        return res.json({ message: '連接成功', data: results })
    })
}

module.exports = getForBeginner
