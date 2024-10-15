"use strict";
// Grabbing elements with type assertions to avoid TypeScript errors
const taskList = document.getElementById('task-list');
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
let tasks = [];
// Function to render tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task) => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item list-group-item';
        taskItem.innerHTML = `
            <span class="task-text">${task.text}</span>
            <div class="task-actions">
                <button class="btn-warning" onclick="editTask(${task.id})">Edit</button>
                <button class="btn-danger" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });  
}
// Function to add a task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const newTask = {
            id: Date.now(),
            text: taskText,
        };
        tasks.push(newTask);
        taskInput.value = '';
        renderTasks();
        saveTasksToLocalStorage();
    }
}
// Function to edit a task
function editTask(taskId) {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
        const updatedText = prompt('Edit task:', task.text);
        if (updatedText !== null) {
            task.text = updatedText;
            renderTasks();
            saveTasksToLocalStorage();
        }
    }
}
// Function to delete a task
function deleteTask(taskId) {
    tasks = tasks.filter((task) => task.id !== taskId);
    renderTasks();
    saveTasksToLocalStorage();
}
// Function to save tasks to local storage
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}
// Event listeners
addTaskBtn.addEventListener('click', addTask);
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask();
});
// Load tasks from local storage on page load
loadTasksFromLocalStorage();
