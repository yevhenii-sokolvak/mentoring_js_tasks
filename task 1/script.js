const STATUSES = {
    new: "нове",
    inProgress: "в процесі",
    completed: "завершено"
};

const PRIORITIES = {
    high: { name: "високий", value: 1 },
    medium: { name: "середній", value: 2 },
    low: { name: "низький", value: 3 }
};

class Task {
    constructor(description, priority = "medium", status = "new") {
        this.id = Date.now() + Math.random();
        this.description = description;
        this.status = status;       // key
        this.priority = priority;   // key
    }

    updateStatus(newStatus) {
        this.status = newStatus;
    }

    updatePriority(newPriority) {
        this.priority = newPriority;
    }
}

const TaskManager = {
    tasks: [],

    saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },

    loadTasks() {
        const saved = localStorage.getItem("tasks");

        if (saved) {
            const parsed = JSON.parse(saved);

            this.tasks = parsed.map(t => {
                const task = new Task(t.description, t.priority, t.status);
                task.id = t.id;
                return task;
            });

        } else {
            this.tasks = [
                new Task("Вивчити Реакт", "high"),
                new Task("Завершити проект", "low", "inProgress")
            ];
        }
    },

    addTask(description, priority, status) {
        this.tasks.push(new Task(description, priority, status));
        this.saveTasks();
        this.renderTasks();
    },

    updateTaskStatus(taskId, newStatus) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.updateStatus(newStatus);
            this.saveTasks();
            this.renderTasks();
        }
    },

    updateTaskPriority(taskId, newPriority) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.updatePriority(newPriority);
            this.saveTasks();
            this.renderTasks();
        }
    },

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        this.saveTasks();
        this.renderTasks();
    },

    renderTasks(tasks = this.tasks) {
        const list = document.querySelector(".task-list");
        list.innerHTML = "";

        list.innerHTML = tasks.map(task => `
            <li class="task-item ${task.status === "completed" ? "task-item--completed" : ""}">
                <strong>${task.description}</strong>

                <div class="task-item__controls">

                    <div>
                        Статус:
                        <select onchange="TaskManager.updateTaskStatus(${task.id}, this.value)">
                            ${Object.entries(STATUSES).map(([key, value]) => `
                                <option value="${key}" ${task.status === key ? "selected" : ""}>
                                    ${value}
                                </option>
                            `).join("")}
                        </select>
                    </div>

                    <div>
                        Пріоритет:
                        <select onchange="TaskManager.updateTaskPriority(${task.id}, this.value)">
                            ${Object.entries(PRIORITIES).map(([key, value]) => `
                                <option value="${key}" ${task.priority === key ? "selected" : ""}>
                                    ${value.name}
                                </option>
                            `).join("")}
                        </select>
                    </div>

                </div>

                <button onclick="TaskManager.deleteTask(${task.id})">Видалити</button>
            </li>
        `).join("");
    },

    getFilteredTasks(select, type) {
        const value = select.value;

        if (value === "all") {
            return this.renderTasks(this.tasks);
        }

        const filtered = this.tasks.filter(task => task[type] === value);
        this.renderTasks(filtered);
    },

    getSortedTasks(select) {
        const value = select.value,
              tasks = [...this.tasks];

        if (value === "highToLow") {
            tasks.sort((a, b) =>
                PRIORITIES[a.priority].value - PRIORITIES[b.priority].value
            );
        }

        if (value === "lowToHigh") {
            tasks.sort((a, b) =>
                PRIORITIES[b.priority].value - PRIORITIES[a.priority].value
            );
        }

        this.renderTasks(tasks);
    },

    load() {
        this.loadTasks();
        this.renderTasks();
    }
};

TaskManager.load();

/* FORM */
const taskForm = document.querySelector(".task-form");

taskForm.addEventListener("submit", e => {
    e.preventDefault();

    const description = taskForm.querySelector("input[name='description']").value.trim(),
          priority = taskForm.querySelector("select[name='priority']").value,
          status = taskForm.querySelector("select[name='status']").value;

    if (!description) return;

    TaskManager.addTask(description, priority, status);
    taskForm.reset();
});

/* FILTERS */
const filterStatus = document.querySelector("#filterStatus"),
      filterPriority = document.querySelector("#filterPriority"),
      sortPriority = document.querySelector("#sortPriority");

filterStatus.addEventListener("change", () =>
    TaskManager.getFilteredTasks(filterStatus, "status")
);

filterPriority.addEventListener("change", () =>
    TaskManager.getFilteredTasks(filterPriority, "priority")
);

sortPriority.addEventListener("change", () =>
    TaskManager.getSortedTasks(sortPriority)
);