function toastIt(message) {
    var t = document.getElementById('toast');
    t.innerHTML = message;
    t.classList.toggle('show');
    setTimeout(function() {
        t.classList.toggle('show');
    }, 3000);
}