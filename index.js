
const express = require("express")
const database = require("./utils/database")
const products = require("./products.json")
const allProducts = require("./models/allProducts")

//匯入routes
const productsAPI = require("./routes/productsAPI")


const app = express() //調用 express ，返回值是 app 服務實例

//宣告全域中介軟體
app.use(productsAPI)

// database.sync({ force: true }).then(() => {
//     allProducts.bulkCreate(products);
// })
//     .catch((err) => {
//         console.log('bulkCreate failed', err);
//     });


app.listen(80, () => {

    console.log('server running at http://27.0.0.1')
})

