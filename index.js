
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
const shopAPI = require("./routes/shopAPI")
const Order = require('./models/order');
const OrderItem = require('./models/orderItem');
// const bodyParser = require('body-parser')
/////////////////////////////////////////////////////////////////

const app = express() //調用 express ，返回值是 app 服務實例

////////////////////////////////////////////////////////////////

//宣告全域中介軟體
app.use(cors({ origin: 'http://localhost:8080', credentials: true }))
app.use(express.urlencoded({ extended: false })) //for post request （ get 不需要） recognize the incoming Request Object as strings or arrays
app.use(express.json()) //for post request （ get 不需要） recognize the incoming Request Object as a JSON Object.
app.set('trust proxy', 1) //信任來自正面 Proxy 伺服器的第 1 個躍點就是用戶端。
app.use(session({            //把express-session寫在路由之前，所有的request都會生成一個session並可以透過req.session這個變數來取得session內容，以及req.sessionID來取得session ID
    secret: 'BobaTheCat',
    name: 'session_id',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 20000000 //單位（秒）
    }
}))



// NOTE: 取得 User model (如果已登入的話)
app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findByPk(req.session.user.id)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((err) => {
            console.log('find user by session id error: ', err);
        })
});

app.use((req, res, next) => {
    res.locals.isLogin = req.session.isLogin || false;
    next();
});


/////////////////////////////////////////////////////////////////

//資料庫邏輯
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

////////////////////////////////////////////////////////////////
app.use(authAPI)
app.use(productsAPI)
app.use(bestFlowerAPI)
app.use(forBeginnerAPI)
app.use(shopAPI)


////////////////////////////////////////////////////////////////

// 把產品、用戶資料匯入資料庫
database.sync().then(() => { // { force: true }
    // Product.bulkCreate(products);
    // User.create({ userName: "Clara", email: "clara12345@gmail.com", password: "12345", birthday: "1998/09/19" })
    app.listen(3000,() => {
        console.log('伺服器運行在 port 3000');})
   
})
    .catch((err) => {
        console.log('資料庫發生錯誤', err);
    });



