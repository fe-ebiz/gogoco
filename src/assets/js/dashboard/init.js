$(function() {
    goTop();
});

function goTop() {
    var $goTop = $('#goTop');
    var headerHt = $('#header').outerHeight();
    $(window).on('scroll', function() {
        var scrTop = $(window).scrollTop();
        if ( scrTop > headerHt ) {
            $goTop.fadeIn('fast');
        } else {
            $goTop.fadeOut('fast');
        }
    })
}
