const express = require('express');
const router = express.Router()
const getForBeginner = require('../controllers/forBeginner');

router.get('/forbeginner', getForBeginner)



module.exports = router;