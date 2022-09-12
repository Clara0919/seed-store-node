const allProducts = require('../models/allProducts')


// function getAllProducts() {

// }

const getAllProducts = (req, res) => {
    allProducts.findAll().then((allData) => {
        res.status(200)
        return res.json({ message: '連接成功', data: allData })
    })
        .catch((err) => {
            console.log('getAllProducts error: ', err);
        })
}




module.exports = getAllProducts

