const { Router } = require('express');
const handlers = require('../handlers/todos');

const todosRoutes = Router();


todosRoutes.get('/', handlers.showTodos);

todosRoutes.post('/add', handlers.addTodoAction);

todosRoutes.get('/edit/:id', handlers.showTodoEdit);

todosRoutes.post('/edit/:id', handlers.editTodoAction);

todosRoutes.post('/delete/:id', handlers.deleteTodoAction);

module.exports = todosRoutes;

