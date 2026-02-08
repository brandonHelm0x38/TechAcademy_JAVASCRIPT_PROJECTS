// // This function gets the task from the input field and adds it to the list
// function addTask() {
//     const taskInput = document.getElementById('task-input');
//     const taskList = document.getElementById('task-list');
//     const task = taskInput.value.trim();
//     if (task) {
//         const listItem = document.createElement('li');
//         listItem.textContent = task;
//         taskList.appendChild(listItem);
//         taskInput.value = '';
//     }
// }

// // Event listener for the add task button
// document.getElementById('add-task-button').addEventListener('click', addTask);

// // Event listener for pressing 'Enter' key in the input field
// document.getElementById('task-input').addEventListener('keypress', function (e) {
//     if (e.key === 'Enter') {
//         addTask();
//     } 
// });

// // Event delegation to handle task removal on click
// document.getElementById('task-list').addEventListener('click', function (e) {
//     if (e.target && e.target.nodeName === 'LI') {
//         e.target.remove();
//     }
// });



// This function gets the task from the input field and adds it to the list
function getTodos() {
    // This creates an array of tasks that are saved in local storage
    var todos = new Array;
    // This pulls the string of tasks from local storage in browser memory
    var todosStr = localStorage.getItem('todo');
    // If the input is not null, then it will convert the string to an array element.
    if (todosStr !== null) {
        todos = JSON.parse(todosStr);
    }
    return todos;
}

// This function adds a new task to the list and saves it to local storage
function add() {
    // This takes in the inputted task and creates a variable from it
    var taskInput = document.getElementById('task-input');

    var todos = getTodos();
    // This adds the new task to the end of the array
    todos.push(taskInput.value);
    // This saves the array back to local storage as a string
    localStorage.setItem('todo', JSON.stringify(todos));
    // This clears the input field after adding the task
    document.getElementById('task-input').value = '';
    // This calls the show function to display the updated list
    show();
    return false;
}

// This function displays the tasks in the list
function show() {
    // This sets the task that was retreived as a varaible
    var todos = getTodos(); 
    // This creates a variable to hold the HTML content
    var html = '<ul>';
    // This loops through each task in the array
    for (var i = 0; i < todos.length; i++) {
        // This creates a list item for each task with a delete button
        html += '<li>' + todos[i] + ' <button class="delete" id="item-' + i + '">x</button></li>';
    }
    html += '</ul>';
    document.getElementById('task-list').innerHTML = html;
}

// This function deletes a task from the list and updates local storage
function remove() {
    // This sets the task that was retreived as a varaible
    var id = this.getAttribute('id');
    var todos = getTodos();
    // This removes the task from the array based on its index
    todos.splice(id, 1);
    // This saves the updated array back to local storage as a string
    localStorage.setItem('todo', JSON.stringify(todos));
    // This calls the show function to display the updated list
    show();
    return false;
}

// This sets up the event listeners and displays the initial list when the document is ready
document.addEventListener('DOMContentLoaded', function () {
    // This displays the tasks when the page loads
    show();

    // This sets up the event listener for the add task button
    document.getElementById('add-task-button').addEventListener('click', add);  

    // This sets up the event listener for the delete buttons using event delegation
    document.getElementById('task-list').addEventListener('click', function (e) {
        if (e.target && e.target.className === 'delete') {
            remove.call(e.target);
        }
    });

    // Event listener for pressing 'Enter' key in the input field
    document.getElementById('task-input').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            add();
        }
    });
});