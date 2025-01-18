let addMessage = document.querySelector('.message')
let addButton = document.querySelector('.add')
let todo = document.querySelector('.todo')
let todoList = []

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'))
    displayMessages()
}

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

function setTask() {
    if (!addMessage.value) return

    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false
    }

    todoList.push(newTodo)
    localStorage.setItem('todo', JSON.stringify(todoList))
    displayMessages()
    addMessage.value = ''
}

addButton.addEventListener('click', () => setTask())
addMessage.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        e.preventDefault()
        setTask()
    }
})

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

function editTask() {
    const editButtons = document.querySelectorAll('.edit')

    editButtons.forEach(btn => {

        const newBtn = btn.cloneNode(true)

        btn.parentNode.replaceChild(newBtn, btn)

        newBtn.addEventListener('click', (event) => {
            const index = event.target.dataset.index

            const taskElement = event.target.closest('li')

            const label = taskElement.querySelector('label')

            if (taskElement.querySelector('.edit-input')) return

            const input = document.createElement('input')

            input.type = 'text'
            input.value = todoList[index].todo
            input.className = 'edit-input'
        
            taskElement.insertBefore(input, label)
            label.style.display = 'none'
            input.focus()

            const handleSave = () => {
                const newText = input.value.trim()

                if (newText && label) {
                    todoList[index].todo = newText
                    label.textContent = newText
                    localStorage.setItem('todo', JSON.stringify(todoList))
                }
                if (label && label.parentNode) label.style.display = ''

                if (input && input.parentNode) input.remove()
            }

            input.addEventListener('blur', () =>  setTimeout(handleSave, 100))

            input.addEventListener('keyup', (event) => {
                if (event.key === 'Enter') {
                    handleSave()
                }
            })
        })
    })
}

function setCheckboxHandler() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]')

    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('change', (event) => {
            const index = event.target.id.split('_')[1]

            todoList[index].checked = event.target.checked

            localStorage.setItem('todo', JSON.stringify(todoList))
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
    editTask()
    setCheckboxHandler()
} 

todo.addEventListener("contextmenu", (event) => event.preventDefault())

const todoListCons = JSON.parse(localStorage.getItem('todo'))
console.log("localStorage.getItem('todo')", localStorage.getItem('todo'))
console.log("todoListCons", todoListCons)