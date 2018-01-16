const todos = [
    { id:1, content: 'some todo'} // todo example
];

function showTodos(req, res){
    const errors = Object.assign({}, req.session.errors);
    const successMsgs = Object.assign({}, req.session.successMsgs);
    req.session.errors = null;
    req.session.successMsgs = null;
    res.render('todos', { todos, errors ,successMsgs });
}
function addTodoAction(req, res){
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
}
function showTodoEdit (req, res) {
    const errors = Object.assign({}, req.session.errors);
    req.session.errors = null;
    const todo = todos.find((element) => {
        return element.id == req.params.id;
    });
    res.render('edit', { todo, errors });
}
function editTodoAction (req, res) {
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
}
function deleteTodoAction (req, res) {
    const todoIndex = todos.findIndex((element) => {
        return element.id == req.params.id;
    });
    todos.splice(todoIndex, 1);
    req.session.successMsgs = [{msg : 'Successfully deleted' }];
    res.redirect('/');
}

module.exports = {
    showTodos,
    addTodoAction,
    showTodoEdit,
    editTodoAction,
    deleteTodoAction,
};