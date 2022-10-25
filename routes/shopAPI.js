const express = require('express')
const shopController = require('../controllers/shop')
const router = express.Router()

router.get('/cart', shopController.getCart)
router.post('/cart-add-item', shopController.postCartAddItem)
router.post('/cart-delete-item', shopController.postCartDeleteItem)
router.get('/order', shopController.getOrders);
router.post('/create-order', shopController.postOrder);

module.exports = router;