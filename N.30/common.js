'use strict';
window.addEventListener('load', updateIMG, false);

function updateIMG(){
    let elems = document.querySelectorAll('img');
    for (let i = elems.length - 1; i >= 0; i--) {
        elems[i].style.position = 'absolute';
        elems[i].style.top = elems[i].offsetTop + 'px';
        elems[i].style.left = elems[i].offsetLeft + 'px';
        elems[i].addEventListener('mousedown', _mouseDown, false);
    }
}

let index = 1; // z-index

function _mouseDown(EO) {
    EO = EO || window.event;
    let elem = EO.target;

    EO.preventDefault();

    let coords = getCoords(elem);
    let shiftX = EO.pageX - coords.left;
    let shiftY = EO.pageY - coords.top;

    elem.style.zIndex = index++;
    document.addEventListener('mousemove', _mouseMove, false);

    function _mouseMove(EO) {
        EO = EO || window.event;
        EO.preventDefault();

        elem.style.left = EO.pageX - shiftX + 'px';
        elem.style.top = EO.pageY - shiftY + 'px';
    }

    elem.addEventListener('mouseup', _mouseUp, false);

    function _mouseUp(EO) {
        EO = EO || window.event;
        EO.preventDefault();

        document.removeEventListener('mousemove', _mouseMove, false);
        elem.removeEventListener('mouseup', _mouseUp, false);
    }
}

function getCoords(elem) {
    let bbox=elem.getBoundingClientRect();

    let body=document.body;
    let docEl=document.documentElement;

    let scrollTop=window.pageYOffset||docEl.scrollTop||body.scrollTop;
    let scrollLeft=window.pageXOffset||docEl.scrollLeft||body.scrollLeft;

    let clientTop=docEl.clientTop||body.clientTop||0;
    let clientLeft=docEl.clientLeft||body.clientLeft||0;

    let top=bbox.top+scrollTop-clientTop;
    let left=bbox.left+scrollLeft-clientLeft;

    return {
        left: left,
        top: top
    };
}