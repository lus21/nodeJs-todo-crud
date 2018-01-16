const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const initalizeRoutes = require('./routes');
const dotdev =  require('dotenv');

const app = express();
dotdev.config();

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

initalizeRoutes(app);


// 404 page
app.use(function(req, res, next){
    res.status(404);

    res.format({
        html: function () {
            res.render('pages/404.pug', { url: req.url, title: "404 Page Not Found" })
        },
        json: function () {
            res.json({ error: 'Not found' })
        },
        default: function () {
            res.type('txt').send('Not found')
        }
    })
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
});