// Selecionar elementos do DOM
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const clearAllBtn = document.getElementById('clearAllBtn');

// Carregar tarefas salvas no navegador ao iniciar
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Função para salvar no localStorage e atualizar a tela
function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Função para renderizar as tarefas na tela
function renderTasks() {
    taskList.innerHTML = '';
    
    let pendingCount = 0;

    tasks.forEach((task, index) => {
        if (!task.completed) {
            pendingCount++;
        }

        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;

        li.innerHTML = `
            <div class="task-info" onclick="toggleTask(${index})">
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <span>${task.text}</span>
            </div>
            <button class="delete-btn" onclick="deleteTask(${index})">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        `;

        taskList.appendChild(li);
    });

    taskCount.textContent = `${pendingCount} tarefa(s) pendente(s)`;
}

// Adicionar nova tarefa
function addTask() {
    const text = taskInput.value.trim();
    if (text === '') return;

    tasks.push({ text: text, completed: false });
    taskInput.value = '';
    saveAndRender();
}

// Marcar tarefa como concluída ou pendente
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveAndRender();
}

// Apagar tarefa individual
function deleteTask(index) {
    tasks.splice(index, 1);
    saveAndRender();
}

// Limpar todas as tarefas concluídas
clearAllBtn.addEventListener('click', () => {
    tasks = tasks.filter(task => !task.completed);
    saveAndRender();
});

// Eventos de clique e tecla Enter
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Renderizar na primeira execução
renderTasks();