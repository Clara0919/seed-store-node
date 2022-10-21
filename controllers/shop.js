
const Product = require('../models/allProducts')

// const getIndex = (req, res) => {
//     Product.findAll()
//         .then((products) => {
//             res.status(200)
//             return res.json({message: '連接成功',data: products})
//             //用json是因為json檔案小，又有key and value，方便
//                 // .render('index', {
//                 //     path: '/',
//                 //     pageTitle: 'Book Your Books online',
//                 //     products
//                 // });
//         })
//         .catch((err) => {
//             console.log('Product.findAll() error: ', err);
//         })
// };


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
    console.log('postCartAddItem',req.user);
    const { productId } = req.body
    console.log(productId)
    let userCart;
    let newQuantity = 1;
    // console.log(req.user)
    req.user.getCart().then((cart) => {
        // console.log('cart',cart)
        userCart = cart;
        // console.log(userCart)
        return cart.getProducts({ where: { id: productId } });
    }).then((products) => {
        let product;
        if (products.length > 0) { //如果有資料(陣列長度>0)，表示購物車已經有該product
            product = products[0]; //抓陣列的第一筆(也只會有一筆)
            const oldQuantity = product.cartItem.quantity;
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
        const productsSums = products.map((product) => product.price * product.cartItem.quantity)
        const amount = productsSums.reduce((accumulator, currentValue) =>
            accumulator + currentValue
        )   //累加
        userCart.amount = amount
        return userCart.save()
    }).catch((err) => {
        console.log('postAddItem 發生錯誤', err)
    }).catch((err) => {
        console.log('postAddItem 發生錯誤', err)
    })
}

//////把商品從購物車中移除//////

const postCartDeleteItem = (req, res) => {
    const { productId } = req.body;
    let userCart;
    req.user
        .getCart()
        .then((cart) => {
            userCart = cart;
            return cart.getProducts({ where: { id: productId }});
        })
        .then((products) => {
            const product = products[0];
            product.cartItem.destroy();
            res.send(products)
        })
        .then(() => {
            return userCart
                .getProducts()
                .then((products) => {
                    if (products.length) {
                        const productSums = products.map((product) => product.price * product.cartItem.quantity);
                        const amount = productSums.reduce((accumulator, currentValue) => accumulator + currentValue);
                        userCart.amount = amount;
                        userCart.save();
                    }
                });
        })
        //.then(() => {
           // res.redirect('/cart');
       // })
        .catch((err) => console.log(err));
};
module.exports = { getCart, postCartAddItem, postCartDeleteItem }