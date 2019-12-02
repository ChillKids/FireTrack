const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const orderListController = require("./controllers/orderListController.js")

express()
    .use(express.static(path.join(__dirname, 'public')))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())

.set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', orderListController.addToGo)
    .post('/toGo', orderListController.addToGo)
    .get('/getOrder', orderListController.getOrder)
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))