document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
  
    // Load tasks from Chrome storage
    chrome.storage.sync.get('tasks', (data) => {
      if (data.tasks) {
        data.tasks.forEach(task => addTaskToList(task));
      }
    });
  
    // Add task form submit event
    taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const taskText = taskInput.value.trim();
      if (taskText) {
        addTaskToList(taskText);
        saveTask(taskText);
        taskInput.value = '';
      }
    });
  
    // Add task to the list
    function addTaskToList(taskText) {
      const li = document.createElement('li');
      li.textContent = taskText;
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        li.remove();
        deleteTask(taskText);
      });
      li.appendChild(deleteButton);
      taskList.appendChild(li);
    }
  
    // Save task to Chrome storage
    function saveTask(taskText) {
      chrome.storage.sync.get('tasks', (data) => {
        const tasks = data.tasks || [];
        tasks.push(taskText);
        chrome.storage.sync.set({ tasks });
      });
    }
  
    // Delete task from Chrome storage
    function deleteTask(taskText) {
      chrome.storage.sync.get('tasks', (data) => {
        const tasks = data.tasks.filter(task => task !== taskText);
        chrome.storage.sync.set({ tasks });
      });
    }
  });
  