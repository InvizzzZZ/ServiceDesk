'use strict';

let canvas = document.createElement('canvas');
canvas.id = 'canvas';
canvas.width = '600';
canvas.height = '600';
document.body.appendChild(canvas);

window.onload = createClock();

let interval = setInterval(() => {
    createClock();
}, 1000);

function createClock() {
    //текущее время
    let currTime = new Date();
    console.log(formatDateTime(currTime));

    let context = canvas.getContext('2d');
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;
    //радиус часов
    let radius = 295;
    //радиус кружков с цифрами
    let radius_number = 35;
    //радиус, на котором расположены кружки с цифрами
    let radius2 = 250;
    //угол для первой цифры //
    var angleGrad = 0;
    //длина секундной стрелки
    let lengthSecArrow = 250;
    //длина минутной стрелки
    let lengthMinArrow = 220;
    //длина часовой стрелки
    let lengthHourArrow = 190;

    //циферблат
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = '#2f3e5f';
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = '#003300';
    context.stroke();
    //end

    //кружочки для цифр
    for (let i = 12; i >= 1; i--) {
        var angleRad = angleGrad / 180 * Math.PI;

        context.beginPath();
        context.arc(pos(angleRad).get('numberCenterX'), pos(angleRad).get('numberCenterY'), radius_number, 0, 2 * Math.PI, false);
        context.fillStyle = '#53799e';
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = '#212442';
        context.stroke();

        context.fillStyle = "#212442";
        context.strokeStyle = "#212442";
        context.font = "bold 30px sans-serif";
        context.textBaseline = "middle";
        context.textAlign = "center";
        context.fillText(i, pos(angleRad).get('numberCenterX'), pos(angleRad).get('numberCenterY'));

        angleGrad -= 30;
    }
    //end

    //цифровое время
    context.fillStyle = "#53799e";
    context.strokeStyle = "#212442";
    context.font = "bold 33px sans-serif";
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.fillText(formatDateTime(currTime), centerX, centerY - 120);
    //end

    //создание и позиционирование всех стрелок
    createArrows();


    //кружок в центре часов
    context.beginPath();
    context.arc(centerX, centerY, 15, 0, 2 * Math.PI, false);
    context.fillStyle = '#000000';
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = '#000000';
    context.stroke();

    //end

    //создание и позиционирование всех стрелок
    function createArrows() {
        // угол для секундной стрелки каждую секунду в радианах
        let radSec = currTime.getSeconds() * 360 / 60 / 180 * Math.PI;
        // угол для минутной стрелки каждую секунду в радианах
        let radMin = (currTime.getMinutes() * 60 + currTime.getSeconds()) * 360 / (60 * 60) / 180 * Math.PI;
        // угол для часовой стрелки каждую секунду в радианах
        let radHour = (currTime.getHours() * 60 * 60 + currTime.getMinutes() * 60 + currTime.getSeconds()) * (360 * 2) / (24 * 60 * 60) / 180 * Math.PI;

        //секундная стрелка
        context.strokeStyle = '#8e1313';
        context.lineWidth = 5;
        context.lineCap = 'round';
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.lineTo(pos(radSec, lengthSecArrow).get('numberCenterX'), pos(radSec, lengthSecArrow).get('numberCenterY'));
        context.stroke();
        //end

        //минутная стрелка
        context.strokeStyle = '#000000';
        context.lineWidth = 10;
        context.lineCap = 'round';
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.lineTo(pos(radMin, lengthMinArrow).get('numberCenterX'), pos(radMin, lengthMinArrow).get('numberCenterY'));
        context.stroke();
        //end

        //часовая стрелка
        context.strokeStyle = '#000000';
        context.lineWidth = 15;
        context.lineCap = 'round';
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.lineTo(pos(radHour, lengthHourArrow).get('numberCenterX'), pos(radHour, lengthHourArrow).get('numberCenterY'));
        context.stroke();
        //end
    }

    //end

    //позиционирование цифр на циферблате
    function pos(angleRad, radius) {
        radius = radius || radius2;
        let numberCenterX = centerX + radius * Math.sin(angleRad);
        let numberCenterY = centerY - radius * Math.cos(angleRad);

        return new Map([
            ['numberCenterX', numberCenterX],
            ['numberCenterY', numberCenterY]
        ]);
    }

    //форматирует переданную дату-время в формате дд.мм.гггг чч:мм:сс
    function formatDateTime(dt) {
        let hours = dt.getHours();
        let minutes = dt.getMinutes();
        let seconds = dt.getSeconds();
        return str0l(hours, 2) + ':' + str0l(minutes, 2) + ':' + str0l(seconds, 2);
    }

    //дополняет строку val слева нулями до длины Len
    function str0l(val, len) {
        let strVal = val.toString();
        while (strVal.length < len)
            strVal = '0' + strVal;
        return strVal;
    }
}


