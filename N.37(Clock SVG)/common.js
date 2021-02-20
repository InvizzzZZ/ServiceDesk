'use strict';

window.addEventListener('load', createClock, false);

function createClock() {
//ширина и высота дива часов
    const clockWidthHeight = 400;

    const clockRadius = clockWidthHeight / 2; //радиус часов
    const numberRadius = 27; // радиус кружков с цифрами

//радиус круга на котором располгаются цифры
    const radius = clockRadius * 0.8;

//угол для первой цифры //
    var angleGrad = 0;

    let svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    svg.setAttribute('width', clockWidthHeight);
    svg.setAttribute('height', clockWidthHeight);
    document.body.appendChild(svg);

    let svgLeft = svg.getBoundingClientRect().left;
    let svgTop = svg.getBoundingClientRect().top;
    let svgWidth = svg.getBoundingClientRect().width;
    let svgHeight = svg.getBoundingClientRect().height;

//циферблат
    let clockFace = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    clockFace.setAttribute("cx", svgLeft + svgWidth / 2);
    clockFace.setAttribute("cy", svgTop + svgHeight / 2);
    clockFace.setAttribute("r", clockRadius);
    clockFace.setAttribute("fill", "#4682B4");
    clockFace.id = 'clockFace';

    svg.appendChild(clockFace);
//конец

//цифры
    for (let i = 12; i >= 1; i--) {
        var angleRad = angleGrad / 180 * Math.PI;
        let number = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        pos(clockFace, number);
        number.setAttribute("r", numberRadius);
        number.setAttribute("fill", "#B0C4DE");
        svg.appendChild(number);

        let numberLeft = number.getBoundingClientRect().left;
        let numberTop = number.getBoundingClientRect().top;
        let numberWidth = number.getBoundingClientRect().width;
        let numberHeight = number.getBoundingClientRect().height;


        angleGrad -= 30;

        let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", numberLeft + numberWidth / 2);
        text.setAttribute("y", numberTop + numberHeight / 2);
        text.setAttribute("font-size", "30");
        text.setAttribute("font-weight", "bold");
        text.setAttribute("fill", "#191970");
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("alignment-baseline", "central");
        text.textContent = i;
        svg.appendChild(text);
    }
//конец

//секундная стрелка
    let secondArrow = document.createElementNS("http://www.w3.org/2000/svg", 'line');
    secondArrow.setAttribute("x1", clockFace.getAttribute('cx'));
    secondArrow.setAttribute("y1", clockFace.getAttribute('cy'));
    secondArrow.setAttribute("x2", clockFace.getAttribute('cx'));
    secondArrow.setAttribute("y2", clockFace.getAttribute('cy') - 175);
    secondArrow.setAttribute("stroke-width", '4');
    secondArrow.setAttribute("stroke", '#A52A2A');
    secondArrow.setAttribute("stroke-linecap", 'round');
    secondArrow.id = 'secondArrow';

    svg.appendChild(secondArrow);
//конец

//минутная стрелка
    let minuteArrow = document.createElementNS("http://www.w3.org/2000/svg", 'line');
    minuteArrow.setAttribute("x1", clockFace.getAttribute('cx'));
    minuteArrow.setAttribute("y1", clockFace.getAttribute('cy'));
    minuteArrow.setAttribute("x2", clockFace.getAttribute('cx'));
    minuteArrow.setAttribute("y2", clockFace.getAttribute('cy') - 150);
    minuteArrow.setAttribute("stroke-width", '8');
    minuteArrow.setAttribute("stroke", '#191970');
    minuteArrow.setAttribute("stroke-linecap", 'round');
    minuteArrow.id = 'minuteArrow';

    svg.appendChild(minuteArrow);
//конец

//часовая стрелка
    let hourArrow = document.createElementNS("http://www.w3.org/2000/svg", 'line');
    hourArrow.setAttribute("x1", clockFace.getAttribute('cx'));
    hourArrow.setAttribute("y1", clockFace.getAttribute('cy'));
    hourArrow.setAttribute("x2", clockFace.getAttribute('cx'));
    hourArrow.setAttribute("y2", clockFace.getAttribute('cy') - 125);
    hourArrow.setAttribute("stroke-width", '16');
    hourArrow.setAttribute("stroke", '#191970');
    hourArrow.setAttribute("stroke-linecap", 'round');
    hourArrow.id = 'hourArrow';

    svg.appendChild(hourArrow);
//конец

//кружок в центре часов
    let center = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    center.setAttribute("cx", svgLeft + svgWidth / 2);
    center.setAttribute("cy", svgTop + svgHeight / 2);
    center.setAttribute("r", clockRadius * 0.08);
    center.setAttribute("fill", "#191970");

    svg.appendChild(center);
//конец

//время
    let time = document.createElementNS("http://www.w3.org/2000/svg", "text");
    time.id = 'time';
    time.setAttribute("x", svgLeft + svgWidth / 2);
    time.setAttribute("y", svgTop + svgHeight / 3);
    time.setAttribute("font-size", "30");
    time.setAttribute("font-weight", "bold");
    time.setAttribute("fill", "black");
    time.setAttribute("text-anchor", "middle");
    svg.appendChild(time);
//конец

    let ms = setArrows(); // выставляем стрелки и цифровые часы в начальное положение

//интервал для времени и стрелок
    let intervalTime = setInterval(() => {
        ms = setArrows();
    }, 1010 - ms);

//конец

// вычисление положения стрелок и их выставление
    setArrows();

    function setArrows() {
        let currTime = new Date();
        let curr_ms = currTime.getMilliseconds(); // милисекунды тек. даты

        document.getElementById('time').textContent = formatDateTime(currTime);

        let degSec = currTime.getSeconds() * 360 / 60; // угол для секундной стрелки каждую секунду
        // secondArrow.style.transform = "rotate(" + degSec + "deg)";
        secondArrow.setAttribute('transform', 'rotate(' + degSec + ' ' + secondArrow.getAttribute("x1") + ' ' + secondArrow.getAttribute("y1") + ')');

        let degMin = (currTime.getMinutes() * 60 + currTime.getSeconds()) * 360 / (60 * 60); // угол для минутной стрелки каждую секунду
        // minuteArrow.style.transform = "rotate(" + degMin + "deg)";
        minuteArrow.setAttribute('transform', 'rotate(' + degMin + ' ' + minuteArrow.getAttribute("x1") + ' ' + minuteArrow.getAttribute("y1") + ')');

        let degHour = (currTime.getHours() * 60 * 60 + currTime.getMinutes() * 60 + currTime.getSeconds()) * (360 * 2) / (24 * 60 * 60); // угол для часовой стрелки каждую секунду
        // hourArrow.style.transform = "rotate(" + degHour + "deg)";
        hourArrow.setAttribute('transform', 'rotate(' + degHour + ' ' + hourArrow.getAttribute("x1") + ' ' + hourArrow.getAttribute("y1") + ')');

        return curr_ms;
    }

//позиционирование цифр на циферблате
    function pos(clockFace, number) {
        let rect = clockFace.getBoundingClientRect();

        let clockFaceCenterX = rect.left + rect.width / 2;
        let clockFaceCenterY = rect.top + rect.height / 2;

        let numberCenterX = clockFaceCenterX + radius * Math.sin(angleRad);
        let numberCenterY = clockFaceCenterY - radius * Math.cos(angleRad);

        number.setAttribute("cx", numberCenterX);
        number.setAttribute("cy", numberCenterY);
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

