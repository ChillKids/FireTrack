const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const orderListController = require("./controllers/orderListController.js")

var session = require('express-session');
var parseurl = require('parseurl')


express()
    .use(express.static(path.join(__dirname, 'public')))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true
    }))



.set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render("pages/login"))
    .post('/login', orderListController.login)
    .post('/toGo', orderListController.addToGo)
    .get('/toGo', orderListController.addToGo)
    .get('/getOrder', orderListController.getOrder)
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))