module.exports = function(app){
    app.use('/', require('./home.routes'));
    app.use('/api/todos/', require('./todos.routes'));
};