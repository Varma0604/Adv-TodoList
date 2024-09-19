const todoInput = document.getElementById('todoInput');
const categorySelect = document.getElementById('categorySelect');
const dueDateInput = document.getElementById('dueDateInput');
const addTodoButton = document.getElementById('addTodo');
const todoList = document.getElementById('todoList');
const darkModeToggle = document.getElementById('darkModeToggle');
const searchInput = document.getElementById('searchInput');
const filterSelect = document.getElementById('filterSelect');
const toggleCompletedButton = document.getElementById('toggleCompleted');
const statsDiv = document.getElementById('stats');

let todos = [];
let darkMode = false;
let showCompleted = true;

const renderTodos = () => {
    todoList.innerHTML = '';
    const filteredTodos = todos.filter(todo => {
        if (filterSelect.value === 'active') return !todo.completed;
        if (filterSelect.value === 'completed') return todo.completed;
        return true;
    }).filter(todo => todo.text.toLowerCase().includes(searchInput.value.toLowerCase()));

    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleComplete(${todo.id})">
            <span class="${todo.completed ? 'line-through' : ''}">${todo.text}</span>
            <span>${todo.category}</span>
            ${todo.dueDate ? `<span>${todo.dueDate}</span>` : ''}
            <button onclick="editTodo(${todo.id})">Edit</button>
            <button onclick="deleteTodo(${todo.id})">Delete</button>
        `;
        todoList.appendChild(li);
    });

    updateStats();
};

const addTodo = () => {
    const text = todoInput.value.trim();
    const category = categorySelect.value;
    const dueDate = dueDateInput.value;
    if (text) {
        const newTodo = {
            id: Date.now(),
            text,
            completed: false,
            category,
            dueDate
        };
        todos.push(newTodo);
        todoInput.value = '';
        categorySelect.value = '';
        dueDateInput.value = '';
        renderTodos();
    }
};

const toggleComplete = (id) => {
    todos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
    renderTodos();
};

const editTodo = (id) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todoInput.value = todo.text;
        categorySelect.value = todo.category;
        dueDateInput.value = todo.dueDate;
        deleteTodo(id);
    }
};

const deleteTodo = (id) => {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
};

const updateStats = () => {
    const total = todos.length;
    const active = todos.filter(todo => !todo.completed).length;
    statsDiv.textContent = `${total} total todos, ${active} active`;
};

darkModeToggle.addEventListener('click', () => {
    darkMode = !darkMode;
    document.body.classList.toggle('dark', darkMode);
    document.body.classList.toggle('light', !darkMode);
});

addTodoButton.addEventListener('click', addTodo);
searchInput.addEventListener('input', renderTodos);
filterSelect.addEventListener('change', renderTodos);
toggleCompletedButton.addEventListener('click', () => {
    showCompleted = !showCompleted;
    toggleCompletedButton.textContent = showCompleted ? 'Hide Completed' : 'Show Completed';
    renderTodos();
});
