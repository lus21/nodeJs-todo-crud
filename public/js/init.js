const currentPath = window.location.pathname;
const app = document.getElementById('app');
const url = '/api/todos/';
fetch(url)
    .then((res) => res.json())
    .then(renderContent)
    .catch(console.error);
function renderContent(data) {
    console.log(data);
    app.innerHTML = renderTodosPage({errors: errors(data.errors), successMsgs: success(data.successMsgs), addEditForm: addEditForm(), todos: todosTable(data.todos)});
}
function todosTable(todos) {
    let rows = '';
    todos.forEach((todo) => {
        rows += '<tr>' +
                    '<td>' + todo.content + '</td>' +
                    '<td>' + todo.id + '</td>' +
                    '<td>' +
                        '<form method="get" action="/api/todos/'+ todo.id + '">' +
                            '<button onclick="editTodo(this)" data-content="' + todo.content + '">Edit</button>'+
                        '</form>' +
                    '</td>' +
                    '<td>' +
                        '<form method="post" action="/api/todos/'+ todo.id+ '">' +
                            '<button onclick="deleteTodo(this)" id="cancel">Delete</button>'+
                        '</form>' +
                    '</td>' +
                ' </tr>'
    });
    return '<table>' +
            '<tr>\n' +
                '<th>Content</th>' +
                '<th>Id</th>' +
                '<th>Edit</th>' +
                '<th>Delete</th>' +
            '</tr>' +
            rows +
        '</table>'
}

function addEditForm() {
    return '<form method="post" action="/api/todos/" id="todoForm" data-method="post">' +
                '<div>' +
                    '<label for="todo"/>Todo</label>'+
                    '<input type="text" name="content" id="todo" />' +
                '</div>' +
                '<div>' +
                    '<button onclick="addEditAction(this)">Submit</button>' +
                    '<button type="button" onclick="cancelEditAction(this)" style="display: none" id="cancel">Cancel</button>' +
                '</div>' +
            '</form>'
}
function errors(errors) {
    if (errors){
        let li = '';
        errors.forEach((error) => {
            li += '<li>' + error.msg + '</li>'
        });
        return '<ul style="color:red">'+ li +'</ul>';
    }
}
function success(successMsgs) {
    let li = '';
    successMsgs.forEach((success) => {
        li += '<li>' + success.msg + '</li>'
    });
    return '<ul style="color:green">'+ li +'</ul>';
}

function renderTodosPage({errors, successMsgs, addEditForm, todos }) {
    return `<div>${errors} ${successMsgs} ${addEditForm} ${todos}</div>`;
}
function editTodo(e) {
    event.preventDefault();
    const url = e.parentElement.action,
            todo = e.dataset.content,
            input = document.getElementById('todo'),
            todoForm = document.getElementById('todoForm');
    input.value = todo;
    todoForm.action = url;
    todoForm.dataset.method = 'PUT';
    document.getElementById('cancel').style.display = 'inline-block';
}
function addEditAction(e) {
    event.preventDefault();
    const todoForm = document.getElementById('todoForm'),
        url = todoForm.action,
        method = todoForm.dataset.method,
        content = document.getElementById('todo').value;
        console.log(content);
    fetch(url, {
        method: method,
        body: JSON.stringify({ content }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => res.json())
        .then(data => {
            console.log(data);
            app.innerHTML = renderTodosPage({errors: errors(data.errors), successMsgs: success(data.successMsgs), addEditForm: addEditForm(), todos: todosTable(data.todos)});
        })
        .catch(console.error);
}
function deleteTodo(e) {
    event.preventDefault();
    const url = e.parentElement.action;
    fetch(url, {
        method: 'DELETE',
    })
        .then((res) => res.json())
        .then(data => {
            console.log(data);
            app.innerHTML = renderTodosPage({errors: errors(data.errors), successMsgs: success(data.successMsgs), addEditForm: addEditForm(), todos: todosTable(data.todos)});
        })
        .catch(console.error);
}
function cancelEditAction() {
    const todoForm = document.getElementById('todoForm'),
        input = document.getElementById('todo');
    todoForm.dataset.method = 'POST';
    todoForm.action = '/api/todos/';
    input.value = '';
    document.getElementById('cancel').style.display = 'none';

}