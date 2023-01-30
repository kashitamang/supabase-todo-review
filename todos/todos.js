import {
    checkAuth,
    createTodo,
    completeTodo,
    getTodos,
    logout,
    deleteAllTodos,
} from '../fetch-utils.js';
import { renderTodo } from '../render-utils.js';

checkAuth();

const todosEl = document.querySelector('.todos');
const todoForm = document.querySelector('.todo-form');
const logoutButton = document.querySelector('#logout');
const deleteButton = document.querySelector('.delete-button');

// let some todo state (an array)
let todos = [];

todoForm.addEventListener('submit', async (e) => {
    // on submit,
    e.preventDefault();
    // create a todo in supabase using for data
    const formData = new FormData(todoForm);
    await createTodo(formData.get('todo'));
    // reset the form DOM element
    todoForm.reset();
    // and display the todos
    displayTodos();
});

async function displayTodos() {
    // clear the container (.textContent = '')
    todosEl.textContent = '';
    // fetch the user's todos from supabase
    const todos = await getTodos();
    // loop through the user's todos
    todos.forEach((item) => {
        // for each todo, render a new todo DOM element
        // using your render function
        const todoEl = renderTodo(item);
        // then add an event listener to each todo
        // on click, update the todo in supabase

        todoEl.addEventListener('click', async () => {
            const id = item.id;
            await completeTodo(id);
            displayTodos();
        });

        // then (shockingly!) call displayTodos() to refresh the list
        // append the rendered todo DOM element to the todosEl
        todosEl.append(todoEl);
    });
}

window.addEventListener('load', async () => {
    // fetch the todos and store in state
    const todosData = await getTodos();
    todos = todosData;
    // call displayTodos
    displayTodos();
});

logoutButton.addEventListener('click', () => {
    logout();
});

deleteButton.addEventListener('click', async () => {
    // delete all todos
    await deleteAllTodos();
    // then refetch and display the updated list of todos
    displayTodos();
});
