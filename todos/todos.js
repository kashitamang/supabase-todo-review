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
    // create a todo in supabase using for data
    // reset the form DOM element
    // and display the todos
    await displayTodos();
});

window.addEventListener('load', async () => {
    // fetch the todos and store in state
    const todosData = await getTodos();
    todos = todosData;
    console.log(todos);
    // call displayTodos
    await displayTodos();
});

async function displayTodos() {
    // clear the container (.textContent = '')
    todosEl.textContent = '';
    // fetch the user's todos from supabase
    // loop through the user's todos
    todos.forEach((todo) => {
        // for each todo, render a new todo DOM element
        // using your render function
        const todoEl = renderTodo(todo);
        // then add an event listener to each todo
        // on click, update the todo in supabase
        todoEl.addEventListener('click', async (e) => {
            const id = todo.id;
            await completeTodo(id);
        });
        // then (shockingly!) call displayTodos() to refresh the list
        // append the rendered todo DOM element to the todosEl
        displayTodos();
        todosEl.append(todoEl);
    });
}

logoutButton.addEventListener('click', () => {
    logout();
});

deleteButton.addEventListener('click', async () => {
    // delete all todos
    // then refetch and display the updated list of todos
});
