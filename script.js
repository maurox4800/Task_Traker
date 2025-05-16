let tasks = [];

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Añadir tarea
function addTask(description) {
  if (description.trim() === "") return;
  tasks.push({ description, completed: false });
  renderTasks();
}

// Eliminar tarea
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Marcar o desmarcar tarea
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Renderizar tareas
function renderTasks() {
  taskList.innerHTML = "";

  // Separar tareas pendientes y completadas
  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);
  const sortedTasks = [...pendingTasks, ...completedTasks];

  sortedTasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleTask(tasks.indexOf(task)));

    const span = document.createElement("span");
    span.textContent = task.description;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.addEventListener("click", () => deleteTask(tasks.indexOf(task)));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}

// Eventos
addTaskBtn.addEventListener("click", () => {
  addTask(taskInput.value);
  taskInput.value = "";
});

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask(taskInput.value);
    taskInput.value = "";
  }
});
