const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const initalizeRoutes = require('./modules');
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

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
});