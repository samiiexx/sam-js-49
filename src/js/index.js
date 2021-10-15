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

const addForm = document.getElementById("add");
const lists = document.querySelector(".todos");
const searchInput = document.getElementById("search-input");

const generateTemplate = (todo) => {
    const html = `
     <li class="list-item">
      <span class="">${todo}</span>
      <i class="far fa-trash-alt delete"></i>
    </li>
  `;

    lists.innerHTML += html;
};

// Add new todo
function addTodo() {
    addForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const todo = addForm.add.value.trim();

        if (todo.length) {
            generateTemplate(todo);
            addForm.reset();
        }

        updateLS();
    });
}

// Delete Todo
lists.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        e.target.parentElement.remove();
    }
    updateLS();
});

// Filter List
const searchBar = document.forms["search-form"].querySelector("input");

searchBar.addEventListener("keyup", (e) => {
    const term = e.target.value.toLowerCase();
    const listItem = lists.getElementsByTagName("li");

    Array.from(listItem).forEach((list) => {
        const title = list.firstElementChild.textContent;

        if (title.toLowerCase().indexOf(term) !== -1) {
            list.style.display = "block";
        } else {
            list.style.display = "none";
        }
    });
});

// Add to Local Storage
const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
    todos.forEach((todo) => addTodo(todo));
}

function updateLS() {
    const todosElement = document.querySelectorAll("li");

    const todos = [];

    todosElement.forEach((todoElement) => {
        todos.push({
            text: todoElement.innerText,
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}
