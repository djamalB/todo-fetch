const taskInput = document.querySelector(".taskInput");
const addTaskButton = document.querySelector(".addTask");
const taskList = document.querySelector(".taskList");

// Функция для загрузки задач из API
function loadTasks() {
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((task) => {
        addTaskToList(task);
      });
    });
}

// Функция для добавления задачи в список
function addTaskToList(task) {
  const li = document.createElement("li");
  li.innerHTML = `
        <span>${task.title}</span>
        <button data-id="${task.id}">Удалить</button>
    `;
  taskList.appendChild(li);

  const deleteButton = li.querySelector("button");
  deleteButton.addEventListener("click", () => deleteTask(task.id));
}

// Функция для удаления задачи
function deleteTask(taskId) {
  fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then(() => {
      const taskItem = document.querySelector(
        `[data-id="${taskId}"]`
      ).parentNode;
      taskList.removeChild(taskItem);
    });
}

// Обработчик клика по кнопке "Добавить"
addTaskButton.addEventListener("click", () => {
  const newTaskTitle = taskInput.value;
  if (newTaskTitle) {
    const newTask = { title: newTaskTitle };
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        addTaskToList(data);
        taskInput.value = "";
      });
  }
});

// Загрузить задачи при загрузке страницы
loadTasks();







