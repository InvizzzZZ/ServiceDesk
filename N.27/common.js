let form = document.forms.IForm;
form.addEventListener('submit', submitMY, false);

let inputName = document.getElementById('name');
inputName.addEventListener('blur', check, false);
inputName.addEventListener('submit', check, false);

let inputSite = document.getElementById('site');
inputSite.addEventListener('blur', check, false);

let inputURL = document.getElementById('url');
inputURL.addEventListener('blur', check, false);

let inputDate = document.getElementById('date');
inputDate.addEventListener('blur', check, false);

let inputVisitors = document.getElementById('visitors');
inputVisitors.addEventListener('blur', check, false);

let inputEmail = document.getElementById('email');
inputEmail.addEventListener('blur', check, false);

let select = document.getElementById('heading');
select.addEventListener('change', check, false);

let inputRadio = form.elements.radio;
for (let i = 0; i < inputRadio.length; i++) {
    inputRadio[i].addEventListener('change', check, false);
}

let inputReviews = document.getElementById('reviews');
inputReviews.addEventListener('change', check, false);

let description = document.getElementById('description');
description.addEventListener('blur', check, false);

function submitMY(EO) {
    EO = EO || window.event;
    EO.preventDefault();
    let count = 0;

    let form = document.forms.IForm;
    let elems = form.querySelectorAll('input, select, textarea');

    for (let i = 0; i < elems.length; i++) {
        if (!check(EO, elems[i])) {
            elems[i].focus();
            if (elems[i].name === 'radio') {
                document.getElementById('reviews').scrollIntoView();
            }
            count++;
        }
    }
    if(count !== 0){
        return false;
    }
    form.submit();
}

function check(EO, elem) {
    EO = EO || window.event;
    elem = elem || EO.currentTarget;
    let value = elem.value;
    let type = elem.getAttribute('type');
    let name = elem.name;
    var parent = elem.parentNode;

    if (type === 'text' && name) {
        if (value.length > 20 || value === '') {
            if (!document.getElementById('span' + name)) {
                createError();
            }
            return false;
        }
        removeError();
        return true;
    }

    if (type === 'url') {
        if (!value.match(/(https:|http:|www\.)\w*\.\w*/gi) || value === '') {
            if (!document.getElementById('span' + name)) {
                createError();
            }
            return false;
        }
        removeError();
        return true;
    }

    if (type === 'date') {
        if ((new Date(value) - new Date(2021, 1, 7) > 0) || !value) {
            if (!document.getElementById('span' + name)) {
                createError();
            }
            return false;
        }
        removeError();
        return true;
    }

    if (type === 'number') {
        if (+value === 0 || !value || isNaN(value)) {
            if (!document.getElementById('span' + name)) {
                createError();
            }
            return false;
        }
        removeError();
        return true;
    }

    if (type === 'email') {
        if (!value.match(/\w*@\w*/gi) || !value) {
            if (!document.getElementById('span' + name)) {
                createError();
            }
            return false;
        }
        removeError();
        return true;
    }

    if (type === 'radio') {
        let inputRadio = form.elements.radio;
        if (inputRadio.value === '1' || !inputRadio.value) {
            if (!document.getElementById('span' + name)) {
                createError();
            }
            return false;
        }
        removeError();
        return true;
    }

    if (type === 'checkbox') {
        if (!elem.checked) {
            if (!document.getElementById('span' + name)) {
                createError();
            }
            return false;
        }
        removeError();
        return true;
    }
    if (name === 'heading') {
        let selectHeading = form.elements.heading;
        if (selectHeading.value === '1') {
            if (!document.getElementById('span' + name)) {
                createError();
            }
            return false;
        }
        removeError();
        return true;
    }

    if (name === 'description') {
        if (!elem.value) {
            if (!document.getElementById('span' + name)) {
                createError();
            }
            return false;
        }
        removeError();
        return true;
    }

    //Добавить ошибку
    function createError() {
        let span = document.createElement('span');
        span.id = 'span' + name;
        span.style.color = 'red';
        span.style.paddingLeft = 30 + 'px';
        span.textContent = 'Error!';
        parent.appendChild(span);
    }

    //Удалить ошибку
    function removeError() {
        let span = document.getElementById('span' + name);
        if (span) {
            parent.removeChild(span);
        }
    }
}

