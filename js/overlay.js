function overBoxOpen() {
    var overlay = document.getElementById("over-elem");
    var overBox = document.getElementById("over-box");
    overlay.classList.remove('hidden');
    overBox.classList.remove('hidden');
    overlay.style.display = "block";
    overBox.style.display = "block";
    overlay.classList.toggle('overlayOpen');
    overlay.classList.toggle('overlayClose');
    overBox.classList.toggle('overlayOpen');
    overBox.classList.toggle('overlayClose');
    if (document.body.offsetHeight > window.innerHeight) {
        document.body.classList.toggle('noscroll');
    }

}

function overBoxClose() {
    var overlay = document.getElementById("over-elem");
    var overBox = document.getElementById("over-box");
    overlay.classList.toggle('overlayOpen');
    overlay.classList.toggle('overlayClose');
    overBox.classList.toggle('overlayOpen');
    overBox.classList.toggle('overlayClose');

    setTimeout(function() {
        overlay.style.display = "none";
        overBox.style.display = "none";
        if (document.body.offsetHeight > window.innerHeight) {
            document.body.classList.toggle('noscroll');
        }
    }, 200);
}