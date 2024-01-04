document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        createTaskElement(taskText);
        saveTask(taskText, false); // A tarefa é inicializada como não concluída
        taskInput.value = '';
    }
}

function createTaskElement(taskText, completed) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <span class="${completed ? 'completed' : ''}">${taskText}</span>
        <button class="edit-btn">Editar</button>
        <button class="delete-btn">Deletar</button>
        <label class="checkbox-container">
            <input type="checkbox" ${completed ? 'checked' : ''}>
            <span class="checkmark"></span>
        </label>
    `;
    taskList.appendChild(listItem);

    const editButton = listItem.querySelector('.edit-btn');
    const deleteButton = listItem.querySelector('.delete-btn');
    const checkbox = listItem.querySelector('input[type="checkbox"]');

    editButton.addEventListener('click', () => editTask(listItem));
    deleteButton.addEventListener('click', () => deleteTask(listItem));
    checkbox.addEventListener('change', () => toggleTaskCompletion(listItem, checkbox.checked));
}

function editTask(listItem) {
    const span = listItem.querySelector('span');
    const newTaskText = prompt('Editar tarefa:', span.textContent);
    if (newTaskText !== null) {
        span.textContent = newTaskText;
        updateLocalStorage();
    }
}

function deleteTask(listItem) {
    if (confirm('Você tem certeza que deseja excluir essa tarefa?')) {
        listItem.remove();
        updateLocalStorage();
    }
}

function toggleTaskCompletion(listItem, completed) {
    const span = listItem.querySelector('span');
    span.classList.toggle('completed', completed);
    updateLocalStorage();
}

function saveTask(taskText, completed) {
    const tasks = getStoredTasks();
    tasks.push({ text: taskText, completed: completed });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = getStoredTasks();
    tasks.forEach(task => createTaskElement(task.text, task.completed));
}

function updateLocalStorage() {
    const tasks = Array.from(taskList.querySelectorAll('li')).map(listItem => {
        const span = listItem.querySelector('span');
        const completed = span.classList.contains('completed');
        return { text: span.textContent, completed: completed };
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getStoredTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}
