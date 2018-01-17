const _ = require('lodash');

const todos = [
    { id:1, content: 'some todo'}, // todo example
    { id:2, content: 'some todo2'}, // todo example
    { id:3, content: 'some todo3'}, // todo example
    { id:4, content: 'some todo4'} // todo example
];
function getTodos(req, res){
    const errors = Object.assign({}, req.session.errors);
    const successMsgs = Object.assign({}, req.session.successMsgs);
    req.session.errors = null;
    req.session.successMsgs = null;
    const errorsToSend =  _.isEmpty(errors) ? [] : errors;
    const successMsgsToSend =  _.isEmpty(successMsgs) ? [] : successMsgs;
    res.send({ todos, errors: errorsToSend, successMsgs: successMsgsToSend });
}
function addTodoAction(req, res, next){
    req.checkBody('content').notEmpty().withMessage('Content is required');
    const errors = req.validationErrors();
    if (errors) {
        res.json({ errors, successMsgs: [], todos})
    } else {
        const id = todos.length == 0 ? 1: todos[todos.length - 1].id + 1;
        todos.push({
            content: req.body.content,
            id: id,
        });
        res.json({ errors: [], successMsgs: [{ msg: 'Successfully added' }], todos })
    }
}
function editTodoAction (req, res, next) {
    req.checkBody('content').notEmpty().withMessage('Content is required');
    const errors = req.validationErrors();
    if (errors) {
        res.json({ errors, successMsgs: [], todos})
    } else {
        const todoIndex = todos.findIndex((element) => {
            return element.id == req.params.id;
        });
        todos[todoIndex].content = req.body.content;
        res.json({ errors: [], successMsgs: [{msg : 'Successfully updated' }], todos });
    }
}
function deleteTodoAction (req, res) {
    const todoIndex = todos.findIndex((element) => {
        return element.id == req.params.id;
    });
    todos.splice(todoIndex, 1);
    res.json({ errors: [], successMsgs: [{msg : 'Successfully deleted' }], todos });
}

module.exports = {
    addTodoAction,
    editTodoAction,
    deleteTodoAction,
    getTodos,
};