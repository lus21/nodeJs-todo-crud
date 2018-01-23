# nodeJs-todo-crud

API

GET /api/todos/ get all todos | returns [errors:[], successMsgs: [], todos: []]

POST /api/todos/ adds new todo,needs body.content | returns [errors:[], successMsgs: [], todos: [todo] ]

PUT /api/todos/:id updates existing todo, needs body.contnet  | returns [errors:[], successMsgs: [], todo: {} ]

DELETE /api/todos/:id deletes todo  | returns [errors:[], successMsgs: [], todo: {} ]


errors example` errors:[ { msg: 'Content is required' }];

successMsgs example` successMsgs: [{ msg: 'Successfully updated' }]

todos example` todos: [{ _id: 'some_id', content: 'some todo'}]
