document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('todo-form');
  const taskList = document.getElementById('task-list');

  // Load tasks from localStorage
  loadTasks();

  form.addEventListener('submit', addTask);

  function addTask(e) {
      e.preventDefault();
      
      const taskInput = document.getElementById('new-task');
      const taskText = taskInput.value;

      if (taskText === '') return;

      const li = document.createElement('li');
      li.appendChild(document.createTextNode(taskText));

      const deleteBtn = document.createElement('button');
      deleteBtn.appendChild(document.createTextNode('Delete'));
      li.appendChild(deleteBtn);

      taskList.appendChild(li);

      saveTask(taskText);

      taskInput.value = '';

      deleteBtn.addEventListener('click', () => {
          taskList.removeChild(li);
          deleteTask(taskText);
      });
  }

  function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(task => {
          const li = document.createElement('li');
          li.appendChild(document.createTextNode(task));

          const deleteBtn = document.createElement('button');
          deleteBtn.appendChild(document.createTextNode('Delete'));
          li.appendChild(deleteBtn);

          taskList.appendChild(li);

          deleteBtn.addEventListener('click', () => {
              taskList.removeChild(li);
              deleteTask(task);
          });
      });
  }

  function saveTask(task) {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function deleteTask(task) {
      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks = tasks.filter(t => t !== task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }
});