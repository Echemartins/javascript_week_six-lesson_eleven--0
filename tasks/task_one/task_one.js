class TodoApp {
    constructor() {
        this.tasks = [];
        this.taskInput = document.getElementById("taskInput");
        this.addTaskButton = document.getElementById("addTaskButton");
        this.taskList = document.getElementById("taskList");

        this.addTaskButton.addEventListener("click", () => this.addTask());
        this.taskList.addEventListener("click", (event) => this.deleteTask(event));

        this.loadTasks();
    }

    addTask() {
        const taskText = this.taskInput.value.trim();
        if (taskText === "") return;

        const task = {
            text: taskText,
            id: Date.now(),
        };

        this.tasks.push(task);
        this.saveTasks();

        this.renderTask(task);

        this.taskInput.value = "";
    }

    deleteTask(event) {
        if (event.target.classList.contains("delete-button")) {
            const taskId = parseInt(event.target.parentElement.dataset.id);
            this.tasks = this.tasks.filter((task) => task.id !== taskId);
            this.saveTasks();
            event.target.parentElement.remove();
        }
    }

    saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        this.tasks = tasks;
        tasks.forEach((task) => this.renderTask(task));
    }

    renderTask(task) {
        const listItem = document.createElement("li");
        listItem.dataset.id = task.id;
        listItem.innerHTML = `
            <span>${task.text}</span>
            <button class="delete-button">Delete</button>
        `;
        this.taskList.appendChild(listItem);
    }
}

const todoApp = new TodoApp();