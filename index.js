const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const orderListController = require("./controllers/orderListController.js")

var session = require('express-session');
var parseurl = require('parseurl');
var cookieParser = require('cookie-parser');
var sessionChecker = (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/');
    } else {
        next();
    }
};


express()
    .use(express.static(path.join(__dirname, 'public')))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(cookieParser())
    .use(session({
        key: 'user_sid',
        secret: 'somerandonstuffs',
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 600000
        }
    }))

// Using Session
.use(function(req, res, next) {
    if (!req.session.views) {
        req.session.views = {}
    }
    // get the url pathname
    var pathname = parseurl(req).pathname
        // count the views
    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1
    next()
})

.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.id) {
        res.clearCookie('user_sid');
    }
    next();
})



.set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render("pages/login"))
    .post('/login', orderListController.login)
    .post('/toGo', sessionChecker, orderListController.addToGo)
    .post('/deleteOrder', orderListController.deleteOrder)
    .get('/toGo', orderListController.addToGo)
    .get('/getOrder', sessionChecker, orderListController.getOrder)
    .post('/returnOrder', orderListController.returnOrder)
    .post('/insertOrder', orderListController.insertOrder)
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))