'use strict'

const registerUser = document.querySelector('#registerUser'),
    log = document.querySelector('#login'),
    username = document.querySelector('#username'),
    login = document.querySelector('#login'),
    list = document.querySelector('#list');

let listData;
if (JSON.parse(localStorage.getItem('listData')) === null) {
    listData = [];
} else {
    listData = JSON.parse(localStorage.getItem('listData'));
}

const render = function () {
    list.textContent = '';
    listData.forEach(function (item) {
        const li = document.createElement('li');
        li.innerHTML = '<li class="list-item">Имя: ' + item.firstName + ', фамилия: ' + item.lastName + ', зарегистрирован: ' + item.regDate + '</li>' +
            '<div class="list-button">' +
            '<button class="list-remove"></button>' +
            '</div>';
        list.append(li);

        const btnListRemove = li.querySelector('.list-remove');
        btnListRemove.addEventListener('click', function () {
            listData.splice(listData.indexOf(item), 1);
            render();
        });
    });
    localStorage.setItem('listData', JSON.stringify(listData));
}

registerUser.addEventListener('click', function (item) {
    let name = prompt("Введите через пробел Имя и Фамилию пользователя", "Николай Димитриев");
    if (name.split(' ').length > 2) {
        alert('Ошибка!');
    } else {
        let login = prompt("Введите Логин", 's1ngle56');
        let password = prompt("Введите Пароль", 123456);
        let time = new Date().toLocaleString('ru', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        });

        const newAccount = {
            firstName: name.split(' ')[0],
            lastName: name.split(' ')[1],
            login: login,
            password: password,
            regDate: time
        };
        listData.push(newAccount);
    }
    render();
});

log.addEventListener('click', function () {
    let login = prompt("Введите Логин", 's1ngle56');
    let password = prompt("Введите Пароль", '123456');
    let obj = {};
    let bool = listData.some((item) => {
        obj = item;
        return (login === item.login && password === item.password);
    });

    (bool) ? username.textContent = obj.firstName: alert('Пользователь не найден');
});

render();