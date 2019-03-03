/**Developed by Dmytro Symonov
 * {s} symonov.com
 * 2018
 */
// "scroll_to"
function scrollTo(setProp) {
    // Default options | Настройки по умолчанию
    setProp.initPosition = setProp.initPosition !== undefined && typeof setProp.initPosition === 'boolean' ? setProp.initPosition : true;
    setProp.initScrHeight = setProp.initScrHeight !== undefined && typeof setProp.initScrHeight === 'number' && setProp.initScrHeight >= 0.1 && setProp.initScrHeight <= 1 ? setProp.initScrHeight : 0.75;
    // "page_position" (top or bottom)
    let scrollBottom = () => $(window).scrollTop() + screen.availHeight,
        initPagePos = () => {
            if (screen.availHeight * setProp.initScrHeight > $(window).scrollTop()) {
                $('html').addClass('page_top');
            } else if ($('html').height() - screen.availHeight * setProp.initScrHeight < scrollBottom()) {
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
    // Default options | Настройки по умолчанию
    setProp.scrollClass = setProp.scrollClass !== undefined && typeof setProp.scrollClass === 'string' && setProp.scrollClass !== '' ? setProp.scrollClass : 'scroll_to';
    setProp.scrollDelay = setProp.scrollDelay !== undefined && typeof setProp.scrollDelay === 'number' && setProp.scrollDelay >= 0 ? setProp.scrollDelay : 600;
    setProp.preloader = setProp.preloader !== undefined && typeof setProp.preloader === 'boolean' ? setProp.preloader : false;
    // "scroll_to", "on_top_button"
    $('.' + setProp.scrollClass).bind('click', function (e) {
        let anchor = $($(this).attr('href')).offset().top,
            timeRate = Math.round(Math.abs($(window).scrollTop() - anchor) / screen.availHeight);
        if (screen.availHeight * 0.75 < Math.abs($(window).scrollTop() - anchor)) {
            if (setProp.preloader && $('html').find('#' + setProp.preloaderId).length !== 0 && timeRate > 2) {
                $('#' + setProp.preloaderId).fadeIn('normal');
                $('#' + setProp.preloaderId).delay(setProp.scrollDelay * 2 + 300).fadeOut('slow');
                $('html, body').stop();
                setTimeout(() => $('html, body').animate({
                    scrollTop: anchor
                }, setProp.scrollDelay * 2), 300);
            } else {
                $('html, body').stop().animate({
                    scrollTop: anchor
                }, timeRate * setProp.scrollDelay);
            }
        }
        e.preventDefault();
    });
}