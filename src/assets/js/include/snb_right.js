$(function() {
    $('.sidebar.right-reservation .btn-a-folder').on('click', function() {
        $(this).closest('.sidebar.right-reservation').toggleClass('unfold');
        $(".cont-container-f").toggleClass("fold");
    });
});