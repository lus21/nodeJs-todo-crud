const Router = require('express').Router;
const {
    showTodos,
    addTodoAction,
    showTodoEdit,
    editTodoAction,
    deleteTodoAction,
} = require('./todo.controller');

const router = Router();

router.get('/', showTodos);

router.post('/add', addTodoAction);

router.get('/edit/:id', showTodoEdit);

router.post('/edit/:id', editTodoAction);

router.post('/delete/:id', deleteTodoAction);

module.exports = router;
