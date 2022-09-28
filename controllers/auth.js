const allUsers = require("../models/allUsers")

const postLogin = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const { email, password } = req.body;
    allUsers.findOne({ where: { email: email } }).then((user) => {
        if (!user) {
            res.send({ loginSuccess: 1 })

        } else if (user.password === password) {

            res.send({ loginSuccess: 0 })

        } else {
            res.send({ loginSuccess: 2 })
        }
    }).catch((err) => {
        console.log('登入失敗', err.message)
    })
}

const postSignUp = (req, res) => {
    const { userName, email, password, birthday } = req.body
    allUsers.create({ userName: userName, email: email, password: password, birthday: birthday })
        .then(() => {
            console.log('註冊成功')
        })
        .catch((err) => {
            console.log('註冊失敗', err);
        });


}

module.exports = { postLogin, postSignUp } 