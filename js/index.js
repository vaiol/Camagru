function overBoxImgOpen(img) {
    
}

var body = document.body,
    overlay = document.getElementById('overlay-l'),
    overlayBtts = document.querySelectorAll('button[class$="overlay"]');

[].forEach.call(overlayBtts, function(btt) {

    btt.addEventListener('click', function() {

        /* Detect the button class name */
        var overlayOpen = this.className === 'open-overlay';

        /* Toggle the aria-hidden state on the overlay and the
           no-scroll class on the body */
        overlay.setAttribute('aria-hidden', !overlayOpen);
        body.classList.toggle('noscroll', overlayOpen);

        /* On some mobile browser when the overlay was previously
           opened and scrolled, if you open it again it doesn't
           reset its scrollTop property */
        overlay.scrollTop = 0;

    }, false);

});



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