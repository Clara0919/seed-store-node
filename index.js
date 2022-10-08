
const express = require("express")
const session = require("express-session")
const cors = require('cors')
const database = require("./utils/database")
// const products = require("./products.json")
const allProducts = require("./models/allProducts")
const allUsers = require("./models/allUsers")
const cart = require("./models/cart")
const cartItem = require("./models/cartItem")
const productsAPI = require("./routes/productsAPI")
const bestFlowerAPI = require("./routes/bestFlowerAPI")
const forBeginnerAPI = require("./routes/forBeginnerAPI")
const authAPI = require("./routes/authAPI")
// const bodyParser = require('body-parser')
/////////////////////////////////////////////////////////////////

const app = express() //調用 express ，返回值是 app 服務實例

////////////////////////////////////////////////////////////////

//宣告全域中介軟體
app.use(cors({ origin: 'http://localhost:8080', credentials: true }))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set('trust proxy', 1)
app.use(session({            //把express-session寫在路由之前，所有的request都會生成一個session並可以透過req.session這個變數來取得session內容，以及req.sessionID來取得session ID
    secret: 'BobaTheCat',
    name: 'session_id',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 20000000 //單位（秒）
    }
}))

app.use(productsAPI)
app.use(bestFlowerAPI)
app.use(forBeginnerAPI)
app.use(authAPI)




////////////////////////////////////////////////////////////////

// 把產品、用戶資料匯入資料庫
database.sync().then(() => {   //{ force: true }
    // allProducts.bulkCreate(products);
    // allUsers.create({ userName: "Clara", email: "clara12345@gmail.com", password: "12345", birthday: "1998/09/19" })
})
    .catch((err) => {
        console.log('資料庫發生錯誤', err);
    });

/////////////////////////////////////////////////////////////////

//資料庫邏輯 express association
allUsers.hasOne(cart);
cart.belongsTo(allUsers);
cart.belongsToMany(allProducts, { through: cartItem })
allProducts.belongsToMany(cart, { through: cartItem })

/////////////////////////////////////////////////////////////////
app.listen(3000, () => {
    console.log('server running at 3000')
})

