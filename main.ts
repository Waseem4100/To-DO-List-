// Grabbing elements with type assertions to avoid TypeScript errors
const taskList = document.getElementById('task-list') as HTMLUListElement;
const taskForm = document.getElementById('task-form') as HTMLFormElement;
const taskInput = document.getElementById('task-input') as HTMLInputElement;
const addTaskBtn = document.getElementById('add-task-btn') as HTMLButtonElement;

// Define the task interface to ensure consistent structure
interface Task {
    id: number;
    text: string;
}

let tasks: Task[] = [];

// Function to render tasks
function renderTasks(): void {
    taskList.innerHTML = '';
    tasks.forEach((task: Task) => {
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
function addTask(): void {
    const taskText: string = taskInput.value.trim();
    if (taskText) {
        const newTask: Task = {
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
function editTask(taskId: number): void {
    const task = tasks.find((task: Task) => task.id === taskId);
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
function deleteTask(taskId: number): void {
    tasks = tasks.filter((task: Task) => task.id !== taskId);
    renderTasks();
    saveTasksToLocalStorage();
}

// Function to save tasks to local storage
function saveTasksToLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage(): void {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks) as Task[];
        renderTasks();
    }
}

// Event listeners
addTaskBtn.addEventListener('click', addTask);
taskForm.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    addTask();
});

// Load tasks from local storage on page load
loadTasksFromLocalStorage();
