let userName = checkStr("Ваше имя?", "Вы не ввели или ввели некорректное имя");

let userMiddleName = checkStr("Ваше отчество?", "Вы не ввели или ввели некорректное отчество");

let userLastName = checkStr("Ваша фамилия?", "Вы не ввели или ввели некорректную фамилию");

let userAge = checkAge("Ваш возраст?", "Вы не ввели или ввели некорректный возраст");

let sex = confirm("Если Ваш пол мужской нажмите 'Ок', иначе нажмите 'Отмена'");

alert(
    `ваше ФИО: ${userLastName} ${userName} ${userMiddleName} 
ваш возраст в годах: ${userAge}
ваш возраст в днях: ${userAge * 365}
через 5 лет вам будет: ${userAge + 5}
ваш пол: ${sex?'мужской':'женский'}
вы на пенсии: ${checkPension(userAge, sex)?'да':'нет'}`
);

function checkStr(question, wrong) {
    let str = prompt(question);
    while(str == null || str === '' || /[0-9]/.test(str)){
        alert(wrong);
        str = prompt(question);
    }
    return str;
}

function checkAge(question, wrong) {
    let age = Number(prompt(question));
    while(isNaN(age) || Number(age) > 150 || Number(age) <= 0){
        alert(wrong);
        age = Number(prompt(question));
    }
    return age;
}

function checkPension(userAge, sex) {
    return ((userAge >= 63 && sex) ? true : ((userAge < 63 && sex) ? false : (userAge >= 58 && sex)));
}
