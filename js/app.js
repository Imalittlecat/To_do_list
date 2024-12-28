let addMessage = document.querySelector('.message')
let addButton = document.querySelector('.add')
let todo = document.querySelector('.todo')
let todoList = []

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'))
    displayMessages()
}

addButton.addEventListener('click', function () {
    if (!addMessage.value) return 
    let newTodo = {
        todo: addMessage.value,
        checked: false,
        import: false
    } 
    todoList.push(newTodo)
    displayMessages()
    localStorage.setItem('todo', JSON.stringify(todoList))
    addMessage.value = ''
})

function setImportant() {
    const importantButtons = document.querySelectorAll('.important-btn')
    importantButtons.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            const index = event.target.dataset.index
            todoList[index].important = !todoList[index].important
            localStorage.setItem('todo', JSON.stringify(todoList))
            displayMessages()   
        })
    })
}

function delTask() {
    const deleteButtons = document.querySelectorAll('.delete')
    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.dataset.index
            todoList.splice(index, 1)
            localStorage.setItem('todo', JSON.stringify(todoList))
            displayMessages()
        })
    })
}

// Функция для отображения всех задач
function displayMessages() {
    // Если массив задач пуст, показываем сообщение 'Задач нет'
    if (!todoList.length) {
        todo.innerHTML = 'Задач нет'
        return
    }

    // Строка, в которую соберем HTML со всеми задачами
    let displayMessage = ''
    // Перебираем все объекты задач из массива todoList
    todoList.forEach((item, i) => {
        // Формируем HTML-разметку для каждой задачи
        displayMessage += `
        <li>
            <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>

            <label for='item_${i}' class='${item.important ? 'important' : ''}'>
                ${item.todo}
            </label>

            <div class="tools">
                <img class='edit' data-index='${i}' src='./icons/edit.png' alt='edit'>
                <img class='important-btn' data-index='${i}' src='./icons/important.png' alt='important'>
                <img class='delete' data-index='${i}' src='./icons/delete.png' alt='delete'>
            </div>
        </li>
        `  
    })

    todo.innerHTML = displayMessage
    delTask()
    setImportant()
} 



function editTask() {

}

// const todoListCons = JSON.parse(localStorage.getItem('todo'))
// console.log(localStorage.getItem('todo'))
// console.log(todoListCons)