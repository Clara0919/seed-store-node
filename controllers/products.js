const allProducts = require('../models/allProducts')


const getAllProducts = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*'); //設定 res 的 header 解決 CORS 跨域問題
    allProducts.findAll().then((allData) => {
        res.status(200)
        return res.json({ message: '連接成功', data: allData })
    })
        .catch((err) => {
            console.log('getAllProducts error: ', err);
        })
}




module.exports = getAllProducts

