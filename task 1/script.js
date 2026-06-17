const STATUSES = {
    new: "нове",
    inProgress: "в процесі",
    completed: "завершено"
};
const PRIORITIES = {
    high: "високий",
    medium: "середній",
    low: "низький"
};

class Task {
    constructor(description, priority = PRIORITIES.medium, status = STATUSES.new) {
        this.id = Date.now() + Math.random();
        this.description = description;
        this.status = status;
        this.priority = priority;
    }

    updateStatus(newStatus) {
        this.status = newStatus;
    }
    
    updatePriority(newPriority) {
        this.priority = newPriority;
    }
};

// TASK MANAGER

const TaskManager = {
    tasks: [],

    saveTasks: function() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },

    loadTasks: function() {
        let savedTasks = localStorage.getItem("tasks");

        if (savedTasks) {
            let parsedTasks = JSON.parse(savedTasks);

            this.tasks = parsedTasks.map(taskData => {
                let task = new Task(taskData.description, taskData.priority, taskData.status);
                task.id = taskData.id;
                return task;
            });
        } else {
            this.tasks = [
                new Task("Вивчити Реакт", PRIORITIES.high), // TODO: EXAMPLE TASKS, NEED TO REMOVE
                new Task("Завершити проект", PRIORITIES.low, STATUSES.inProgress) // TODO: EXAMPLE TASKS, NEED TO REMOVE
            ];
        }
    },

    updateTaskStatus: function(taskId, newStatus) {
        let task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.updateStatus(newStatus);
            this.saveTasks();
            this.renderTasks();
        }
    },

    updateTaskPriority: function(taskId, newPriority) {
        let task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.updatePriority(newPriority);
            this.saveTasks();
            this.renderTasks();
        }
    },

    addTask: function(description, priority, status) {
        let newTask = new Task(description, priority, status);
        this.tasks.push(newTask);
        this.saveTasks();
        this.renderTasks();
    },

    deleteTask: function(taskId) {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        this.saveTasks();
        this.renderTasks();
    },

    renderTasks: function(tasks = this.tasks) {
    let taskList = document.querySelector(".task-list");

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        taskList.innerHTML += `
            <div class="task-item ${task.status === STATUSES.completed ? "task-item--completed" : ""}" task-id=${task.id}>
                <strong>${task.description}</strong>
                <div class=task-item__controls>
                    <div>
                        Статус: <select onchange="TaskManager.updateTaskStatus(${task.id}, this.value)">
                            <option value="${STATUSES.new}" ${task.status === STATUSES.new ? "selected" : ""}>${STATUSES.new}</option>
                            <option value="${STATUSES.inProgress}" ${task.status === STATUSES.inProgress ? "selected" : ""}>${STATUSES.inProgress}</option>
                            <option value="${STATUSES.completed}" ${task.status === STATUSES.completed ? "selected" : ""}>${STATUSES.completed}</option>
                        </select>
                    </div>
                    <div>
                        Пріоритет: <select onchange="TaskManager.updateTaskPriority(${task.id}, this.value)">
                            <option value="${PRIORITIES.high}" ${task.priority === PRIORITIES.high ? "selected" : ""}>${PRIORITIES.high}</option>
                            <option value="${PRIORITIES.medium}" ${task.priority === PRIORITIES.medium ? "selected" : ""}>${PRIORITIES.medium}</option>
                            <option value="${PRIORITIES.low}" ${task.priority === PRIORITIES.low ? "selected" : ""}>${PRIORITIES.low}</option>
                        </select>
                    </div>
                </div>
                <button onclick="TaskManager.deleteTask(${task.id})">Видалити</button>
            </div>
        `;
    })
    },

    load: function() {
        this.loadTasks();
        this.renderTasks();
    }
}

TaskManager.load();

// FORM HANDLER
const taskForm = document.querySelector(".task-form");

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let description = taskForm.querySelector("input[name='description']").value.trim(),
        priority = PRIORITIES[taskForm.querySelector("select[name='priority']").value],
        status = STATUSES[taskForm.querySelector("select[name='status']").value];

    if (!description) {
        return;
    }

    TaskManager.addTask(description, priority, status);

    TaskManager.renderTasks();
});