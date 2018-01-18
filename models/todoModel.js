const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const todoSchema = new Schema ({
    content: {type: String, required: true},
}, { collection : 'todos' });

module.exports = mongoose.model('TodoModel', todoSchema);