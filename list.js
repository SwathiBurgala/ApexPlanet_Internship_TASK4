const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
document.addEventListener('DOMContentLoaded', loadTasks);

taskForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    addTask(taskText);
    saveTask(taskText);
    taskInput.value = '';
  }
});

function addTask(text, completed = false) {
  const li = document.createElement('li');
  li.textContent = text;
  if (completed) li.classList.add('completed');

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    updateTasks();
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'X';
  deleteBtn.className = 'delete-btn';
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    li.remove();
    updateTasks();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveTask(text) {
  const tasks = getTasks();
  tasks.push({ text, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTasks() {
  const tasks = [];
  taskList.querySelectorAll('li').forEach(li => {
    tasks.push({
      text: li.childNodes[0].textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

function loadTasks() {
  const tasks = getTasks();
  tasks.forEach(task => addTask(task.text, task.completed));
}
