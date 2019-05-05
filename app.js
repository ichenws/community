const express = require('express')
const path = require('path')
const app = express()

app.use('./public', express.static(path.join(__dirname, './public/')))
app.use('./node_modules', express.static(path.join(__dirname, './node_modules/')))

app.get('/',function (req,res) {
    res.send('hello world')
})
app.listen(3000,function () {
    console.log('express is runnig')
})
