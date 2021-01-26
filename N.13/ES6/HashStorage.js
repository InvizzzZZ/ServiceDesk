'use strict';

//стилизация кнопок begin
let buttons = document.getElementsByTagName('input');
for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.add('button-style');
}
//стилизация кнопок end

class HashStorage {
    constructor() {
    }

    #storage = {}; //приватное свойство

    addValue(key, value) {
        this.#storage[key] = value;
    }

    getValue(key) {
        return this.#storage[key];
    }

    deleteValue(key) {
        if (key in this.#storage) {
            delete this.#storage[key];
            return true;
        }
        return false;
    }

    getKeys() {
        return Object.keys(this.#storage).join(', ');
    }
}

let drinkStorage = new HashStorage();

drinkStorage.addValue('ёрш', {'alcoholic': true, 'recipe': 'смешать водку и пиво'});
drinkStorage.addValue('кровавая мэри', {'alcoholic': true, 'recipe': 'смешать водку и томатный сок'});

function getAllDrinks() {
    alert(drinkStorage.getKeys());
}

function deleteDrink() {
    let drink = prompt('Введите название напитка, который нужно удалить');
    if (drink === null) {
        return alert('Операция прервана');
    }
    alert(drinkStorage.deleteValue(drink) ? 'напиток удален' : 'напитка нет в базе');
}

function addDrink() {
    let name = prompt('Введите название напитка');
    if (name === null) {
        return alert('Ввод прерван');
    }
    let alcoholic = confirm('Напиток алкогольный?');
    let recipe = prompt('Введите рецепт приготовления напитка');

    drinkStorage.addValue(name.toLowerCase(), {'alcoholic': alcoholic, 'recipe': recipe});
}

function getInfo() {
    let drink = prompt('Введите название напитка, чтобы получить информацию');

    let info = drinkStorage.getValue(drink.toLowerCase());

    if (info === undefined) {
        return alert('Такого напитка нет в базе')
    }
    alert(`напиток ${drink}\nалкогольный: ${info.alcoholic ? 'да' : 'нет'}\nрецепт приготовления:\n${info.recipe}`);
}