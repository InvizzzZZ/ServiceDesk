/*
Доработать проект MOOD (слайды N.10) так, чтобы цвета не повторялись.
Для контроля повторения цветов использовать хэш.
 */

"use strict";

mood(3);

function mood(colorsCount) {
    let colors = ['', 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый'];
    let colorsHash = {};

    console.log('цветов: ' + colorsCount);

    let i = 0;
    while (i < colorsCount) {

        let n = randomDiap(1, 7);
        let colorName = colors[n];

        if (!(colorName in colorsHash)) {
            colorsHash[colorName] = true;
            console.log(colorName);
            i++;
        }
    }
    document.getElementById('Colors').innerText += ' ' + printHash(colorsHash);
}

function randomDiap(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
}

function printHash(hash) {
    let str = [];
    for (let k in hash)
        str.push(k);
    return str.join(', ')
}