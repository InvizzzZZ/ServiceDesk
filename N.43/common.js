'use strict';

let interval = 0;

let tableProps = {
    height: 500,
    width: 800,
    color: '#d2d128'
};

let racketProps = {
    height: 100,
    width: 10,
    speedLeft: 0,
    speedRight: 0
};

let ballProps = {
    diameter: 30,
    color: '#d22b2a',
    posX: tableProps.width / 2,
    posY: tableProps.height / 2,
    speedX: randomDiap(-4, 4),
    speedY: randomDiap(-4, 4),

    update: function () {
        ball.style.left = this.posX + "px";
        ball.style.top = this.posY + "px";
    }
};

let scoreProps = {
    home: 0,
    visitors: 0,

    update: function () {
        return `${this.home} : ${this.visitors}`;
    }
};

let scoreTable = document.createElement("div");
scoreTable.classList.add('scoreTable');
scoreTable.style.width = tableProps.width + 'px';
document.body.appendChild(scoreTable);

let buttonStart = document.createElement('button');
buttonStart.innerText = 'Старт!';
buttonStart.addEventListener('click', start, false);
scoreTable.appendChild(buttonStart);

let score = document.createElement('span');
score.id = 'score';
score.innerText = scoreProps.update();
scoreTable.appendChild(score);

let table = document.createElement('div');
table.classList.add('table');
table.style.width = tableProps.width + 'px';
table.style.height = tableProps.height + 'px';
table.style.backgroundColor = tableProps.color;
document.body.appendChild(table);

let racketLeft = document.createElement('div');
racketLeft.classList.add('racket', 'racketLeft');
racketLeft.style.width = racketProps.width + 'px';
racketLeft.style.height = racketProps.height + 'px';
table.appendChild(racketLeft);
racketLeft.style.top = table.offsetHeight / 2 - racketLeft.offsetHeight / 2 + 'px';

let racketRight = document.createElement('div');
racketRight.classList.add('racket', 'racketRight');
racketRight.style.width = racketProps.width + 'px';
racketRight.style.height = racketProps.height + 'px';
table.appendChild(racketRight);
racketRight.style.top = table.offsetHeight / 2 - racketRight.offsetHeight / 2 + 'px';

let ball = document.createElement('div');
ball.classList.add('ball');
ball.id = 'ball';
ball.style.height = ballProps.diameter + 'px';
ball.style.width = ballProps.diameter + 'px';
ball.style.backgroundColor = ballProps.color;
table.appendChild(ball);


document.addEventListener('keydown', pressed, false);
document.addEventListener('keyup', unpressed, false);

ballProps.update();

function start() {
    ballProps.posX = tableProps.width / 2;
    ballProps.posY = tableProps.height / 2;
    ballProps.update();

    ballProps.speedX = randomDiap(-4, 4);
    ballProps.speedY = randomDiap(-4, 4);

    if (!interval) {
        interval = setInterval(begin, 1000 / 60);
    }
}

function begin() {
    if (ballProps.speedX === 0 || ballProps.speedY === 0) {
        console.log('переподача!');
        clearInterval(interval);
        interval = 0;
        start();
    }

    ballProps.posX += ballProps.speedX;

    // коснулся ли мяч левой ракетки
    if (ballProps.posX <= racketLeft.offsetWidth && ballProps.posY >= racketLeft.offsetTop && ballProps.posY <= racketLeft.offsetTop + racketLeft.offsetHeight) {
        if (ballProps.speedX > -9) {
            ballProps.speedX--;
        }
        ballProps.speedX = -ballProps.speedX;
    }

    // коснулся ли мяч правой ракетки
    if (ballProps.posX + ballProps.diameter >= racketRight.offsetLeft && ballProps.posY >= racketRight.offsetTop && ballProps.posY <= racketRight.offsetTop + racketRight.offsetHeight) {
        if (ballProps.speedX < 9) {
            ballProps.speedX++;
        }
        ballProps.speedX = -ballProps.speedX;
    }

    // вылетел ли мяч правее стены?
    if (ballProps.posX + ballProps.diameter > tableProps.width) {
        scoreProps.home++;
        score.innerText = scoreProps.update();
        ballProps.posX = tableProps.width - ballProps.diameter;

        clearInterval(interval);
        interval = 0;
    }

    // вылетел ли мяч левее стены?
    if (ballProps.posX < 0) {
        scoreProps.visitors++;
        score.innerText = scoreProps.update();
        ballProps.posX = 0;

        clearInterval(interval);
        interval = 0;
    }

    ballProps.posY += ballProps.speedY;

    // вылетел ли мяч ниже пола?
    if (ballProps.posY + ballProps.diameter > tableProps.height) {
        ballProps.speedY = -ballProps.speedY;
        ballProps.posY = tableProps.height - ballProps.diameter;
    }

    // вылетел ли мяч выше потолка?
    if (ballProps.posY < 0) {
        ballProps.speedY = -ballProps.speedY;
    }

    ballProps.update();

    // левая ракетка
    let posRacketLeft = parseInt(racketLeft.style.top) + racketProps.speedLeft;

    if (posRacketLeft < 0) {
        posRacketLeft = 0;
    }
    if (posRacketLeft > table.offsetHeight - racketLeft.offsetHeight) {
        posRacketLeft = table.offsetHeight - racketLeft.offsetHeight;
    }

    racketLeft.style.top = posRacketLeft + 'px';

    // правая ракетка
    let posRacketRight = parseInt(racketRight.style.top) + racketProps.speedRight;

    if (posRacketRight < 0) {
        posRacketRight = 0;
    }
    if (posRacketRight > table.offsetHeight - racketRight.offsetHeight) {
        posRacketRight = table.offsetHeight - racketRight.offsetHeight;
    }

    racketRight.style.top = posRacketRight + 'px';
}

function pressed(EO) {
    EO = EO || window.event;
    let code = EO.keyCode;

    if (EO.shiftKey) {
        racketProps.speedLeft = -5;
    }

    if (EO.ctrlKey) {
        racketProps.speedLeft = 5;
    }

    if (code === 38) {
        racketProps.speedRight = -5;
    }

    if (code === 40) {
        racketProps.speedRight = 5;
    }

}

function unpressed(EO) {
    EO = EO || window.event;
    racketProps.speedLeft = 0;
    racketProps.speedRight = 0;
}

function randomDiap(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
}