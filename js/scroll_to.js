/* "preloader" */
$(window).on('load', function () {
    $('.preloader').delay(600).fadeOut('slow');
    $('.preloader').children().fadeIn('normal').fadeOut('normal');
});
/* "init_page_position" (top or bottom) */
let docHeight = $('html').height(),
    scrollBottom = () => {
        return $(window).scrollTop() + screen.availHeight;
    },
    initPagePos = () => {
        if (screen.availHeight * 0.75 > $(window).scrollTop()) {
            $('body').addClass('page_top');
        } else if (docHeight - screen.availHeight * 0.75 < scrollBottom()) {
            $('body').addClass('page_bottom');
        } else {
            $('body').removeClass('page_top page_bottom');
            if ($('body').attr('class') === '') {
                $('body').removeAttr('class');
            }
        }
    }
$(window).resize(() => { docHeight = $('html').height(); })
$(document).ready(() => { initPagePos(); });
$(window).scroll(() => { initPagePos(); });
/* "scroll_to", "on_top_button" */
$('.scroll_to').bind('click', function (e) {
    let anchor = $($(this).attr('href')).offset().top,
        timeRate = Math.round(Math.abs($(window).scrollTop() - anchor) / screen.availHeight);
    if (screen.availHeight * 0.75 < Math.abs($(window).scrollTop() - anchor)) {
        if (timeRate > 2) {
            $('.preloader').delay(0).fadeIn('slow');
            $('.preloader').delay(timeRate * 300).fadeOut('slow');
        }
        $('html, body').stop().animate({
            scrollTop: anchor
        }, timeRate * 500);
        /*console.log(`anchor:${anchor}, time rate:${timeRate};
main delay:${timeRate * 500},pre delay:${timeRate * 300}`);*/
    }
    e.preventDefault();
});