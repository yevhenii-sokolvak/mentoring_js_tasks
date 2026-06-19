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
        this.id = crypto.randomUUID();
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

    refresh() {
        this.saveTasks();
        this.renderTasks();
    },

    createStatusSelect(task) {
        const select = document.createElement("select");

        Object.entries(STATUSES).forEach(([key, value]) => {
            const option = document.createElement("option");

            option.value = key;
            option.textContent = value;
            option.selected = task.status === key;

            select.append(option);
        });

        select.addEventListener("change", e => {
            this.updateTaskStatus(task.id, e.target.value);
        });

        return select;
    },

    createPrioritySelect(task) {
        const select = document.createElement("select");

        Object.entries(PRIORITIES).forEach(([key, value]) => {
            const option = document.createElement("option");

            option.value = key;
            option.textContent = value.name;
            option.selected = task.priority === key;

            select.append(option);
        });

        select.addEventListener("change", e => {
            this.updateTaskPriority(task.id, e.target.value);
        });

        return select;
    },

    createTaskElement(task) {
        const li = document.createElement("li");

        li.className = `task-item ${
            task.status === "completed"
                ? "task-item--completed"
                : ""
        }`;

        const title = document.createElement("strong");
        title.textContent = task.description;

        const controls = document.createElement("div");
        controls.className = "task-item__controls";

        const statusWrapper = document.createElement("div");
        statusWrapper.append("Статус: ");
        statusWrapper.append(this.createStatusSelect(task));

        const priorityWrapper = document.createElement("div");
        priorityWrapper.append("Пріоритет: ");
        priorityWrapper.append(this.createPrioritySelect(task));

        controls.append(
            statusWrapper,
            priorityWrapper
        );

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Видалити";

        deleteBtn.addEventListener("click", () => {
            this.deleteTask(task.id);
        });

        li.append(
            title,
            controls,
            deleteBtn
        );

        return li;
    },

    addTask(description, priority, status) {
        this.tasks.push(new Task(description, priority, status));
        this.refresh();
    },

    updateTaskStatus(taskId, newStatus) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.updateStatus(newStatus);
            this.refresh();
        }
    },

    updateTaskPriority(taskId, newPriority) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.updatePriority(newPriority);
            this.refresh();
        }
    },

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        this.refresh();
    },

    renderTasks(tasks = this.tasks) {
        const list = document.querySelector(".task-list");
        list.textContent = "";

        tasks.forEach(task => {
            list.append(
                this.createTaskElement(task)
            );
        });
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