
const express = require("express")
const cors = require('cors')
const database = require("./utils/database")
const products = require("./products.json")
const allProducts = require("./models/allProducts")
const allUsers = require("./models/allUsers")
const productsAPI = require("./routes/productsAPI")
const bestFlowerAPI = require("./routes/bestFlowerAPI")
const forBeginnerAPI = require("./routes/forBeginnerAPI")
const authAPI = require("./routes/authAPI")
// const bodyParser = require('body-parser')
/////////////////////////////////////////////////////////////////

const app = express() //調用 express ，返回值是 app 服務實例

////////////////////////////////////////////////////////////////

//宣告全域中介軟體
app.use(cors())//{ origin: '*' })
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(productsAPI)
app.use(bestFlowerAPI)
app.use(forBeginnerAPI)
app.use(authAPI)

////////////////////////////////////////////////////////////////

// 把產品、用戶資料匯入資料庫
// database.sync({ force: true }).then(() => {
//     allProducts.bulkCreate(products);
//     allUsers.create({ userName: "Clara", email: "clara12345@gmail.com", password: "12345", birthday: "1998/09/19" })
// })
//     .catch((err) => {
//         console.log('Create failed', err);
//     });

/////////////////////////////////////////////////////////////////


app.listen(3000, () => {
    console.log('server running at 3000')
})

