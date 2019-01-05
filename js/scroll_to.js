/* "preloader" */
$(window).on('load', function () {
    $('.preloader').delay(600).fadeOut('slow');
    $('.preloader').children().fadeIn('normal').fadeOut('normal');
});
/* "page_position" (top or bottom) */
function scrollBottom() {
    return $(window).scrollTop() + screen.availHeight;
}

function initPagePos() {
    if (screen.availHeight * 0.75 > $(window).scrollTop()) {
        $('html').addClass('page_top');
    } else if ($('html').height() - screen.availHeight * 0.75 < scrollBottom()) {
        $('html').addClass('page_bottom');
    } else {
        $('html').removeClass('page_top page_bottom');
        if ($('html').attr('class') === '') {
            $('html').removeAttr('class');
        }
    }
}

$(document).ready(function () {
    initPagePos();
});
$(window).scroll(function () {
    initPagePos();
});
$(window).resize(function () {
    initPagePos();
});
/* "scroll_to", "on_top_button" */
$('.scroll_to').bind('click', function (e) {
    let anchor = $($(this).attr('href')).offset().top,
        timeRate = Math.round(Math.abs($(window).scrollTop() - anchor) / screen.availHeight);
    if (screen.availHeight * 0.75 < Math.abs($(window).scrollTop() - anchor)) {
        if (timeRate > 2 && $('html').find('.preloader').length !== 0) {
            $('.preloader').delay(0).fadeIn('normal');
            $('.preloader').delay(500).fadeOut('slow');
            $('html, body').stop().animate({
                scrollTop: anchor
            }, 1500);
        } else {
            $('html, body').stop().animate({
                scrollTop: anchor
            }, timeRate * 500);
        }
        /*console.log(`anchor:${anchor}, time rate:${timeRate}`);*/
    }
    e.preventDefault();
});