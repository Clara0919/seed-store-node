
const express = require("express")
const session = require("express-session")
const cors = require('cors')
const database = require("./utils/database")
const products = require("./products.json")
const Product = require("./models/allProducts")
const User = require("./models/allUsers")
const Cart = require("./models/cart")
const CartItem = require("./models/cartItem")
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


app.use((req, res, next) => {
    if (!req.session.user) {
        next()
    }
    else {
        //如果已登入的話，findByPk:find by primary key，用id去找，才能使用 User 模型提供的方法（例如 getCart()、create()、save()…）等等
        User.findByPk(req.session.user.id).then((user) => {
            req.user = user //取得 user 模型並儲存到全域（req.user）
            console.log(req.user)
            next()
        }).catch((err) => {
            console.log('中介軟體 findUserBySessionId 失敗', err)
        })
    }
})

app.use(productsAPI)
app.use(bestFlowerAPI)
app.use(forBeginnerAPI)
app.use(authAPI)







////////////////////////////////////////////////////////////////

// 把產品、用戶資料匯入資料庫
// database.sync({ force: true }).then(() => {
//     Product.bulkCreate(products);
//     User.create({ userName: "Clara", email: "clara12345@gmail.com", password: "12345", birthday: "1998/09/19" })
// })
//     .catch((err) => {
//         console.log('資料庫發生錯誤', err);
//     });

/////////////////////////////////////////////////////////////////

//資料庫邏輯 express association
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })

/////////////////////////////////////////////////////////////////
app.listen(3000, () => {
    console.log('server running at 3000')
})

