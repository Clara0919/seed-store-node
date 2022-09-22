const express = require('express');
const database = require('../utils/database');
const router = express.Router()
const getForBeginner = require('../controllers/forBeginner');

router.get('/forbeginner', getForBeginner)



module.exports = router;