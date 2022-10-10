const User = require('../models/allUsers')
const Cart = require('../models/cart')
const CartItem = require('../models/cartItem')
const Product = require('../models/allProducts')

const getCart = (req, res) => {
    req.user.getCart().then((cart) => {
        return cart.getProducts().then((products) => {
            console.log(products)
            res.send(products)
        }).catch((err) => {
            console.log('cart.getProducts取得購物車商品失敗', err)
        })
    }).catch((err) => {
        console.log('req.user.getCart()獲取購物車資訊失敗', err);
    })
}

//////把商品加入購物車//////

const postCartAddItem = (req, res) => {
    const { productId } = req.body
    let userCart = [];
    let newQuantity = 1;
    req.user.getCart().then((cart) => {
        userCart = cart;
        return cart.getProducts({ where: { ProductId } });
    }).then((products) => {
        let product;
        if (products.length > 0) { //如果有資料(陣列長度>0)，表示購物車已經有該product
            product = products[0]; //抓陣列的第一筆(也只會有一筆)
            const oldQuantity = product.CartItem.quantity;
            newQuantity = oldQuantity + 1;
            return product
        }
        return Product.findByPk(productId);
    }).then((product) => {
        return userCart.addProduct(product, {
            through: {
                quantity: newQuantity
            }
        });
    }).then(() => {
        return userCart.getProducts();
        //處理總金額額加總
    }).then((products) => {
        //算出每個產品的總額，map格式轉換成陣列
        const productsSums = products.map((product) => { product.price * product.CartItem.quantity })
        const amount = productsSums.reduce((accumulator, currentValue) => {
            return accumulator + currentValue
        })   //累加
        userCart.amount = amount
        return userCart.save()
    }).catch((err) => {
        console.log('postAddItem 發生錯誤', err)
    })
}

//////把商品從購物車中移除//////

const postCartDeleteItem = (req, res, next) => {
    const { productId } = req.body
    let userCart;
    req.user.getCart().then((cart) => {
        userCart = cart
        return cart.getProducts({ where: { productId } });
    }).then((products) => {
        const product = products[0]; //取第一筆（雖然本來應該就只會有一筆）這邊應該是要把陣列裡的物件取出來
        return product.CartItem.destroy()
    }).then(() => {
        //處理總金額的部分
        return userCart.getProducts().then((products) => {
            if (products.length) {
                const productsSums = products.map((product) => product.price * product.CartItem.quantity);
                const amount = productsSums.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue
                });
                userCart.amount = amount;
                return userCart.save();
            }
        })
    }).catch((err) => {
        console.log(err)
    })
}
module.exports = { getCart, postCartAddItem, postCartDeleteItem }