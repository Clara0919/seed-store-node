const express = require('express');
const database = require('../utils/database');
const router = express.Router()
const getBestFlower = require('../controllers/bestFlower')

router.get('/bestflower', getBestFlower)



module.exports = router;