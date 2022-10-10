// const { Router } = require("express")
const express = require("express")
const authController = require("../controllers/auth")
const router = express.Router()

router.post('/login', authController.postLogin)
router.post('/signup', authController.postSignUp)
router.get('/logout', authController.getLogout)
router.get('/getInfo', authController.getInfo)

module.exports = router