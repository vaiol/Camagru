let toastItTimeout1 = null;
let toastItTimeout2 = null;
function toastIt(message, time) {
    let t = document.getElementById('toast');
    t.innerHTML = message;
    t.classList.remove('hide');
    t.classList.add('show');
    if (time) {
        time = time * 1000;
    } else {
        time = 3000;
    }
    if (toastItTimeout1) {
        clearTimeout(toastItTimeout1);
    }
    if (toastItTimeout2) {
        clearTimeout(toastItTimeout2);
    }
    toastItTimeout1 = setTimeout(function() {
        t.classList.remove('show');
    }, time);
    toastItTimeout2 = setTimeout(function() {
        t.classList.add('hide');
    }, time - 500);
}