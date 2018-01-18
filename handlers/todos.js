const todoModel = require('../models/todoModel');
const _ = require('lodash');

function getTodos(req, res){
    todoModel.find({}).then((todos) => {
        res.send({ todos:todos, errors: [], successMsgs: [] });
    })
    .catch((err) => res.json({ todos:[], errors: [{ msg: 'Something went wrong' }], successMsgs: [] }))
}
function addTodoAction(req, res){
    req.checkBody('content').notEmpty().withMessage('Content is required');
    const errors = req.validationErrors();
    if (errors) {
        todoModel.find({}).then((todos) => {
            res.send({ todos:todos, errors: errors, successMsgs: [] });
        })
        .catch((err) => res.json({ todos:[], errors: [{ msg: 'Something went wrong' }], successMsgs: [] }))
    } else {
        const todo = new todoModel({ content: req.body.content });
        todo.save().then(() => {
            return todoModel.find({}).then((todos) => {
                res.json({ errors: [], successMsgs: [{ msg: 'Successfully added' }], todos })
            })
        })
        .catch((err) => res.json({ todos:[], errors: [{ msg: 'Something went wrong' }], successMsgs: [] }))
    }
}
function editTodoAction (req, res) {
    req.checkBody('content').notEmpty().withMessage('Content is required');
    const errors = req.validationErrors();
    if (errors) {
        todoModel.find({}).then((todos) => {
            res.send({ todos:todos, errors: errors, successMsgs: [] });
        })
    } else {
        todoModel.findByIdAndUpdate(req.params.id, { $set: { content: req.body.content }}, { new: true }).then((err, todo) =>{
            return todoModel.find({}).then((todos) => {
                res.json({ errors: [], successMsgs: [{ msg: 'Successfully updated' }], todos })
            });
        })
        .catch((err) => res.json({ todos:[], errors: [{ msg: 'Something went wrong' }], successMsgs: [] }))
    }
}
function deleteTodoAction (req, res) {
    todoModel.remove({ _id: req.params.id }).then(() => {
        return todoModel.find({}).then((todos) => {
            res.json({ errors: [], successMsgs: [{ msg: 'Successfully deleted' }], todos })
        });
    })
    .catch((err) => res.json({ todos:[], errors: [{ msg: 'Something went wrong' }], successMsgs: [] }))
}

module.exports = {
    addTodoAction,
    editTodoAction,
    deleteTodoAction,
    getTodos,
};