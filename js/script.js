// eslint-disable-next-line strict
'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem("toDoList")));
    }

    addToStorage() {
        localStorage.setItem("toDoList", JSON.stringify([...this.todoData]));
    }

    render() {
        this.todoList.textContent = "";
        this.todoCompleted.textContent = "";
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    }

    createItem(todo) {
        const li = document.createElement("li");
        li.classList.add("todo-item");
        li.key = todo.key;
        li.insertAdjacentHTML(
            "beforeend",
            `
            <span class="text-todo">${todo.value}</span>
            <div class="todo-buttons">
                <button class="todo-edit"></button>
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
        `
        );
        if (todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }

    addTodo(e) {
        e.preventDefault();
        if (this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };
            this.todoData.set(newTodo.key, newTodo);
            this.render();
        } else {
            alert("Пустое дело добавить нельзя");
        }
        this.input.value = "";
    }
    generateKey() {
        return (
            Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
        );
    }

    deleteItem(elem) {
    //по ключу найти элемент удалить из map, сделать render
        this.todoData.forEach(item => {
            if (elem.key === item.key) {
                this.todoData.delete(item.key);
            }
        });
        this.render();
    }

    completedItem(elem) {
    //перебрать forEach tododata. найти ключ, поменять значение комплетед
        this.todoData.forEach(item => {
            if (elem.key === item.key) {
                if (item.completed) {
                    item.completed = false;
                } else {
                    item.completed = true;
                }
            }
        });
        this.render();
    }

    editItem(elem) {
        const span = elem.querySelector(".text-todo");
        span.setAttribute("contenteditable", true);
        span.focus();
    }

    animate(elem) {
        elem.style.animation = "scale-animation-delete 2s ease";
    }

    handler() {
    //делегирование
        document
            .querySelector(".todo-container")
            .addEventListener("click", elem => {
                const target = elem.target;
                const element = target.parentNode.parentNode;
                if (target.matches(".todo-remove")) {
                    this.animate(element);
                    setTimeout(() => {
                        this.deleteItem(element);
                    }, 1000);
                } else if (target.matches(".todo-complete")) {
                    this.animate(element);
                    setTimeout(() => {
                        this.completedItem(element);
                    }, 1000);
                } else if (target.matches(".todo-edit")) {
                    this.editItem(element);
                }
            });
    }

    init() {
        this.form.addEventListener("submit", this.addTodo.bind(this));
        this.render();
        this.handler();
    }
}

const todo = new Todo(
    ".todo-control",
    ".header-input",
    ".todo-list",
    ".todo-completed"
);

todo.init();
