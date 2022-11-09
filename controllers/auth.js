const users = require("../models/allUsers")

const postLogin = (req, res) => {
    const { email, password } = req.body; //把使用者輸入的 email,pwd 放進req.body
    users.findOne({ where: { email: email } }).then((user) => {
        if (!user) {
            req.session.isLogin = false
            res.send({ loginSuccess: 1 }) //此email尚未註冊
        } else if (user.password === password) {
            req.session.isLogin = true
            req.session.user = user // 把登入成功 user資料 傳入session store 中儲存
            req.user = user

            // console.log(req.session.user)
            // req.session.userName = user.name
            // req.session.save((err) => {
            //     console.log("session save 失敗", err)
            // })
            //console.log(req.session) session 裡面會多出isLogin、user兩個資訊
            //console.log(req.sessionID)
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
    const userName = req.session.user.userName
    const id=req.session.user.id
    const isLogin = req.session.isLogin
    console.log(userName)
    res.send({ userName: userName,id:id, isLogin: isLogin })
}


const getLogout = (req, res) => {
    req.session.destroy(() => {
        console.log('session 已刪除')
    })
    res.send({ logoutSuccess: 0 })
    
}

const postSignUp = (req, res) => {
    const { userName, email, password, birthday } = req.body
    users.findOne({ where: { email: email } }).then((user) => {
        if (user) {
            res.send({ signUpSuccess: 1 })
        } else {
            users.create({ userName: userName, email: email, password: password, birthday: birthday })
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