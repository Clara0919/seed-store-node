const { Router } = require("express")
const express = require("express")
const authController = require("../controllers/auth")
const router = express.Router()

router.post('/login', authController.postLogin)
router.post('/signup', authController.postSignUp)
router.get('/logout', authController.getLogout)

function auth(req, res, next) {
    if (req.session.userName) {
        console.log('認證成功')
        next()
    } else {
        console.log('驗證失敗')
        res.send({ loginSuccess: 1 })
    }
}

router.get('/getInfo', auth, authController.getInfo)

module.exports = router