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
        this.id = Date.now();
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

let task = new Task("Вивчити Реакт", PRIORITIES.high);
let task2 = new Task("Завершити проект", PRIORITIES.low, STATUSES.inProgress);

const TaskManager = {
    tasks: [task, task2],

    renderTasks: function() {
    let taskList = document.querySelector(".task-list");

    this.tasks.forEach((task, index) => {
        taskList.innerHTML += `
            <div class="task-item" task-id=${task.id}>
                <p>${task.description}</p>
                Статус: <select onchange="updateTaskStatus(${task.id}, this.value)">
                    <option value="${STATUSES.new}" ${task.status === STATUSES.new ? "selected" : ""}>${STATUSES.new}</option>
                    <option value="${STATUSES.inProgress}" ${task.status === STATUSES.inProgress ? "selected" : ""}>${STATUSES.inProgress}</option>
                    <option value="${STATUSES.completed}" ${task.status === STATUSES.completed ? "selected" : ""}>${STATUSES.completed}</option>
                </select>
                Пріоритет: <select onchange="updateTaskPriority(${task.id}, this.value)">
                    <option value="${PRIORITIES.high}" ${task.priority === PRIORITIES.high ? "selected" : ""}>${PRIORITIES.high}</option>
                    <option value="${PRIORITIES.medium}" ${task.priority === PRIORITIES.medium ? "selected" : ""}>${PRIORITIES.medium}</option>
                    <option value="${PRIORITIES.low}" ${task.priority === PRIORITIES.low ? "selected" : ""}>${PRIORITIES.low}</option>
                </select>
            </div>
        `;
    })
}
}

TaskManager.renderTasks();