const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const initalizeRoutes = require('./routes');
const dotdev =  require('dotenv');
const mongoose = require('mongoose');

const app = express();
dotdev.config();

// app.set('view engine', 'pug');

// app.use('public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(bodyParser.json())

initalizeRoutes(app);

const conn = mongoose.connect('mongodb://localhost:27017/todo').then(() => {
    console.log('connected, mongoose')
});
mongoose.Promise = global.Promise;

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
});