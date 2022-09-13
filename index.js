
const express = require("express")
const cors = require('cors')
const database = require("./utils/database")
const products = require("./products.json")
const allProducts = require("./models/allProducts")
const productsAPI = require("./routes/productsAPI")

const app = express() //調用 express ，返回值是 app 服務實例

//宣告全域中介軟體
app.use(cors())
app.use(productsAPI)

//把資料匯入資料庫
// database.sync({ force: true }).then(() => {
//     allProducts.bulkCreate(products);
// })
//     .catch((err) => {
//         console.log('bulkCreate failed', err);
//     });


app.listen(3000, () => {
    console.log('server running at 3000')
})

