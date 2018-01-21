# nodeJs-todo-crud

API

GET /api/todos/ get all todos
POST /api/todos/ adds new todo,needs body.content
PUT /api/todos/:id updates existing todo, needs body.contnet
DELETE /api/todos/:id deletes todo

always returns [errors:[], successMsgs: [], todos: []]
errors example` errors:[ { msg: 'Content is required' }];
successMsgs example` successMsgs: [{ msg: 'Successfully updated' }]
todos example` todos: [{ _id: 'some_id', content: 'some todo'}]
