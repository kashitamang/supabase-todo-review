export function renderTodo(todo) {
    // create a div and a p tag
    const div = document.createElement('div');
    const p = document.createElement('p');

    // depending on whether the todo is complete,
    // give the div the appropriate css class ('complete' or 'incomplete')
    // add the 'todo' css class no matter what
    div.classList.add('todo');
    todo.complete === true ? div.classList.add('complete') : div.classList.add('incomplete');

    // put the todo's text into the p tag
    p.textContent = todo.todo;

    // append stuff
    div.append(p);

    // return the div
    return div;
}
