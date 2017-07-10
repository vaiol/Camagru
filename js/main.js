/**
 * Created by astepano on 7/6/17.
 */
$('a').click(function () {
    $('#popup').css({
        'margin-top': 0 - $('#popup').position().top + $(window).scrollTop(),
        'padding-top': $('#popup').position().top - $(window).scrollTop()
    });
});