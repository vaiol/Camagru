var overlay = document.getElementById('overlay-main');

function cls() {

    overlay.classList.toggle('overlayOpen');
    overlay.classList.toggle('overlayClose');
    setTimeout(function() {
        overlay.classList.toggle('hidden');
        if (document.body.offsetHeight > window.innerHeight) {
            document.body.classList.toggle('noscroll');
        }
    }, 200);
    overlay.scrollTop = 0;
}

function opn() {
    overlay.classList.toggle('hidden');
    overlay.classList.toggle('overlayOpen');
    overlay.classList.toggle('overlayClose');
    if (document.body.offsetHeight > window.innerHeight) {
        document.body.classList.toggle('noscroll');
    }
    overlay.scrollTop = 0;
}


function stopBubble(e)
{
    console.log('stopBubble: START');
    if (!e)
        e = window.event;
    if (e.stopPropagation) {
        e.stopPropagation();
        console.log('stopBubble: all')
    } else {
        e.cancelBubble = true;
        console.log('stopBubble: IE8')
    }
    console.log('stopBubble: END')
}