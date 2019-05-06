const express = require('express')
const path = require('path')
const app = express()
const router = require('./router')
const bodyParser = require('body-parser')
const session = require('express-session')

app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './views/'))
app.use(session({
    // 配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密
    // 目的是为了增加安全性，防止客户端恶意伪造
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false // 无论你是否使用 Session ，我都默认直接给你分配一把钥匙
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(router)
app.use(function (req, res) {
    res.render('404.html')
})
app.use(function (err, req, res, next) {
    res.status(500).json({
        err_code: 500,
        message: err.message
    })
})

app.listen(3000,function () {
    console.log('express is runnig')
})
