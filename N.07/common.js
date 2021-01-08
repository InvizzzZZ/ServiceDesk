let userStr = prompt("Ввведите строку для подсчета гласных букв");


alert(`Кол-во гласных букв русского алфавита в "${userStr}" равно ${countLetters(userStr)}`);

function countLetters(str) {
    let letters = {
        "а": 0, "е": 0, "ё": 0, "и": 0, "о": 0,
        "ы": 0, "у": 0, "э": 0, "ю": 0, "я": 0
    };

    let count = 0;
    str = str.toLowerCase();
    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) in letters) {
            count++;
        }
    }
    return count;
}