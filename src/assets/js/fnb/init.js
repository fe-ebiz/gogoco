$(function() {
    // Month, Day 탭 버튼
    $(".tab-list > button").on("click", function() {
        var idx = $(this).index();
        console.log(idx);
        $(this).addClass("on").siblings().removeClass("on");
        $(".item-list > div").eq(idx).show().siblings().hide();
    });

    // x 버튼
    $(".month-tbl .row-item .ic-x").on("click", function() {
        $(this).closest(".row-item").remove();
    });
});
