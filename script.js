// Store all tasks
let tasks = [];


// Get HTML elements
const taskInput = document.getElementById("taskInput");
const descriptionInput = document.getElementById("descriptionInput");
const dueDateInput = document.getElementById("dueDateInput");
const priorityInput = document.getElementById("priorityInput");
const categoryInput = document.getElementById("categoryInput");

const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");


// Add Task
addTaskBtn.addEventListener("click", function () {

    const taskName = taskInput.value.trim();

    if (taskName === "") {
        alert("Please enter a task name.");
        return;
    }

    const task = {
        id: Date.now(),
        name: taskName,
        description: descriptionInput.value.trim(),
        dueDate: dueDateInput.value,
        priority: priorityInput.value,
        category: categoryInput.value,
        completed: false
    };

    tasks.push(task);

    displayTasks();

    // Clear form
    taskInput.value = "";
    descriptionInput.value = "";
    dueDateInput.value = "";

});
// Display Tasks
function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function (task) {

        const taskCard = document.createElement("div");

        taskCard.classList.add("task-card");

        if (task.completed) {
            taskCard.classList.add("completed");
        }

        taskCard.innerHTML = `
            <div class="task-info">

                <h3>${task.name}</h3>

                <p>${task.description}</p>

                <div class="task-meta">
                    Category: ${task.category}
                    |
                    Due: ${task.dueDate || "No date"}
                    |
                    <span class="priority ${task.priority.toLowerCase()}">
                        ${task.priority} Priority
                    </span>
                </div>

            </div>

            <div class="task-actions">

                <button class="complete-btn"
                    onclick="completeTask(${task.id})">
                    ✓
                </button>

                <button class="edit-btn"
                    onclick="editTask(${task.id})">
                    ✏️
                </button>

                <button class="delete-btn"
                    onclick="deleteTask(${task.id})">
                    🗑️
                </button>

            </div>
        `;

        taskList.appendChild(taskCard);
    });
}
// Complete Task
function completeTask(id) {

    const task = tasks.find(function (task) {
        return task.id === id;
    });

    if (task) {
        task.completed = !task.completed;
    }

    displayTasks();
}


// Delete Task
function deleteTask(id) {

    tasks = tasks.filter(function (task) {
        return task.id !== id;
    });

    displayTasks();
}
// Edit Task
function editTask(id) {

    const task = tasks.find(function (task) {
        return task.id === id;
    });

    if (!task) {
        return;
    }

    const newName = prompt("Edit task name:", task.name);

    if (newName === null) {
        return;
    }

    if (newName.trim() === "") {
        alert("Task name cannot be empty.");
        return;
    }

    task.name = newName.trim();

    const newDescription = prompt(
        "Edit description:",
        task.description
    );

    if (newDescription !== null) {
        task.description = newDescription.trim();
    }

    displayTasks();
}