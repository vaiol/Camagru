/**
 * Created by astepano on 7/6/17.
 */
$('a').click(function () {
    $('#info').css({
        'margin-top': 0 - $('#info').position().top + $(window).scrollTop(),
        'padding-top': $('#info').position().top - $(window).scrollTop()
    });
});