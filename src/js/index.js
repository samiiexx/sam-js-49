// Copyright 2021 sfchi
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUl = document.getElementById('todos')

const todos = JSON.parse(localStorage.getItem('todos'))

if(todos) {
    todos.forEach(todo => addTodo(todo))
}
form.addEventListener('submit', (e) => {
    e.preventDefault()

    addTodo()
})

function addTodo(todo) {
    let todoText = input.value

    if(todo) {
        todoText = todo.text
    }

    if(todoText) {
        const todoElement = document.createElement('li')

        if(todo && todo.completed) {
            todoElement.classList.add('completed')
            updateLS()
        }

        todoElement.innerText = todoText

        todoElement.addEventListener('click', () => todoElement.classList.toggle('completed'))

        todoElement.addEventListener('contextmenu', (e) => {
            e.preventDefault()

            todoElement.remove()
            updateLS()
        })

        todosUl.appendChild(todoElement)

        input.value = ''

        updateLS()
    }
}

function updateLS() {
    todosElement = document.querySelectorAll('li')

    const todos = []

    todosElement.forEach(todoElement => {
        todos.push({
            text: todoElement.innerText,
            completed: todoElement.classList.contains('completed')
        })
    })

    localStorage.setItem('todos', JSON.stringify(todos))
}
