// "preloader"
function preloader(setProp) {
    $(window).on('load', () => {
        $('#' + setProp.preloaderId).delay(setProp.delay).fadeOut('slow');
        $('#' + setProp.preloaderId).children().fadeIn('normal').fadeOut('normal');
    });
}