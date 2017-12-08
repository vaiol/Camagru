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
    setTimeout(function() {
        t.classList.remove('show');
    }, time);
    setTimeout(function() {
        t.classList.add('hide');
    }, time - 500);
}