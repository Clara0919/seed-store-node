const allUsers = require("../models/allUsers")

const postLogin = (req, res) => {
    // res.set('Access-Control-Allow-Origin', '*');
    const { email, password } = req.body; //把使用者輸入的 email,pwd 放進req.body
    allUsers.findOne({ where: { email: email } }).then((user) => {
        if (!user) {
            req.session.isLogin = false
            res.send({ loginSuccess: 1 }) //此email尚未註冊

        } else if (user.password === password) {
            req.session.isLogin = true
            req.session.userName = user.userName //把登入成功 user的userName 傳入session store 中儲存
            console.log(req.session) //session 裡面會多出isLogin、userName兩個資訊
            console.log(req.sessionID)
            res.send({
                loginSuccess: 0
            }) //登入成功
        } else {
            req.session.isLogin = false
            res.send({ loginSuccess: 2 }) //密碼錯誤
        }
    }).catch((err) => {
        console.log('登入失敗', err.message)
    })
}


const getInfo = (req, res) => {
    const userName = req.session.userName
    const isLogin = req.session.isLogin
    res.send({ user: userName, isLogin: isLogin })
}


const getLogout = (req, res) => {
    req.session.destroy(() => {
        console.log('session 已刪除')
    })
}

const postSignUp = (req, res) => {
    const { userName, email, password, birthday } = req.body
    allUsers.findOne({ where: { email: email } }).then((user) => {
        if (user) {
            res.send({ signUpSuccess: 1 })
        } else {
            allUsers.create({ userName: userName, email: email, password: password, birthday: birthday })
                .then((newUser) => {
                    console.log('註冊成功')
                    newUser.createCart()
                    res.send({ signUpSuccess: 0 })
                })
                .catch((err) => {
                    console.log('註冊失敗', err.message);
                    res.send({ signUpSuccess: 1 })
                });
        }
    })




}

module.exports = { postLogin, getInfo, getLogout, postSignUp } 