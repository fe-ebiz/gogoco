$(function() {
    $('#gnb .btn-menupop.category-favorite').on('click', function() {
        $(this).toggleClass('on');
        $('#favoriteMenu').find('.lnb').toggle();
    });
});