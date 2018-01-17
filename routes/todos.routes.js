const { Router } = require('express');
const handlers = require('../handlers/todos');

const todosRoutes = Router();

todosRoutes.get('/', handlers.getTodos);

todosRoutes.post('/', handlers.addTodoAction);

todosRoutes.put('/:id', handlers.editTodoAction);

todosRoutes.delete('/:id', handlers.deleteTodoAction);

module.exports = todosRoutes;

