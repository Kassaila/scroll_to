// "scroll_to"
function scrollTo(setProp) {
    // "page_position" (top or bottom)
    let scrollBottom = () => $(window).scrollTop() + screen.availHeight,
        initPagePos = () => {
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
    // init "page_position" on events
    if (setProp.initPosition) {
        $(document).ready(() => initPagePos());
        $(window).scroll(() => initPagePos());
        $(window).resize(() => initPagePos());
    }
    // "scroll_to", "on_top_button"
    $('.' + setProp.scrollClass).bind('click', function (e) {
        let anchor = $($(this).attr('href')).offset().top,
            timeRate = Math.round(Math.abs($(window).scrollTop() - anchor) / screen.availHeight);
        if (screen.availHeight * 0.75 < Math.abs($(window).scrollTop() - anchor)) {
            if (timeRate > 2 && $('html').find('#' + setProp.preloaderId).length !== 0 && setProp.preloader) {
                $('#' + setProp.preloaderId).delay(0).fadeIn('normal');
                $('#' + setProp.preloaderId).delay(500).fadeOut('slow');
                $('html, body').stop().animate({
                    scrollTop: anchor
                }, 1500);
            } else {
                $('html, body').stop().animate({
                    scrollTop: anchor
                }, timeRate * 500);
            }
        }
        e.preventDefault();
    });
}