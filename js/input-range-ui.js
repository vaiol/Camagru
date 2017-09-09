var event = document.createEvent('HTMLEvents');
event.initEvent('input', true, false);
var ranges = document.querySelectorAll('input[type=range]');
ranges.forEach(function (currentRange) {
    currentRange.addEventListener('input', function(e) {
        var min = e.target.min,
            max = e.target.max,
            val = e.target.value;

        e.target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
    });
    currentRange.dispatchEvent(event);
});


/*
 ---JQUERY VERSION:

$('input[type=range]').on('input', function(e){
    var min = e.target.min,
    max = e.target.max,
    val = e.target.value;

    $(e.target).css({
        'backgroundSize': (val - min) * 100 / (max - min) + '% 100%'
    });
}).trigger('input');

*/





