const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
  
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

const todos = [
        { id:1, content: 'some todo'} // todo example
    ];

app.get('/', (req, res) => {
    const errors = Object.assign({}, req.session.errors);
    const successMsgs = Object.assign({}, req.session.successMsgs);
    req.session.errors = null;
    req.session.successMsgs = null;
    res.render('todos', { todos, errors ,successMsgs });
});

app.post('/add', (req, res) => {
    req.checkBody('content').notEmpty().withMessage('Content is required');
    const errors = req.validationErrors();
    if (errors) {
        req.session.errors = errors;
    } else {
        const id = todos.length == 0 ? 1: todos[todos.length - 1].id + 1;
        todos.push({
            content: req.body.content,
            id: id,
        });
        req.session.successMsgs = [{ msg: 'Successfully added' }];
    }
    res.redirect('/');
});
app.get('/edit/:id', (req, res) => {
    const errors = Object.assign({}, req.session.errors);
    req.session.errors = null;
    const todo = todos.find((element) => {
        return element.id == req.params.id;
    });
    res.render('edit', { todo, errors });
});

app.post('/edit/:id', (req, res) => {
    req.checkBody('content').notEmpty().withMessage('Content is required');
    const errors = req.validationErrors();
    if (errors) {
        req.session.errors = errors;
        res.redirect('/edit/'+ req.params.id);
    } else {
        const todoIndex = todos.findIndex((element) => {
            return element.id == req.params.id;
        });
        todos[todoIndex].content = req.body.content;
        req.session.successMsgs = [{msg : 'Successfully updated' }];
        res.redirect('/');
    }
});

app.post('/delete/:id', (req, res) => {
    const todoIndex = todos.findIndex((element) => {
        return element.id == req.params.id;
    });
    todos.splice(todoIndex, 1);
    req.session.successMsgs = [{msg : 'Successfully deleted' }];
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('server started')
});