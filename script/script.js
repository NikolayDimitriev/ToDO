'use strict'

const registerUser = document.querySelector('#registerUser'),
    log = document.querySelector('#login'),
    username = document.querySelector('#username'),
    login = document.querySelector('#login'),
    list = document.querySelector('#list');


const listData = JSON.parse(localStorage.getItem('listData'));

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

        let date = new Date();
        let month = date.getMonth();
        let printMonth;

        function getZero(number) {
            if (number < 10) {
                return ('0' + number)
            }
            return number;
        }
        switch (month) {
            case 0:
                printMonth = 'января';
                break;
            case 1:
                printMonth = 'февраля';
                break;
            case 2:
                printMonth = 'марта';
                break;
            case 3:
                printMonth = 'апреля';
                break;
            case 4:
                printMonth = 'мая';
                break;
            case 5:
                printMonth = 'июня';
                break;
            case 6:
                printMonth = 'июля';
                break;
            case 7:
                printMonth = 'августа';
                break;
            case 8:
                printMonth = 'сентября';
                break;
            case 9:
                printMonth = 'октября';
                break;
            case 10:
                printMonth = 'ноября';
                break;
            case 11:
                printMonth = 'декабря';
                break;
        }
        let time = date.getDate() + ' ' + printMonth + ' ' + date.getFullYear() + ' г., ' + getZero(date.getHours()) + ':' + getZero(date.getMinutes()) + ':' + getZero(date.getSeconds());

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

    listData.forEach(function (item) {
        if (login === item.login && password === item.password) {
            username.textContent = item.firstName;
        }
    });
});

render();