// "preloader"
function preloader(setProp) {
    // Default delay | Задержка по умолчанию
    setProp.delay = setProp.delay !== undefined && typeof setProp.delay === 'number' && setProp.delay >= 0 ? setProp.delay : 600;
    $(window).on('load', () => {
        $('#' + setProp.preloaderId).delay(setProp.delay).fadeOut('slow');
    });
}