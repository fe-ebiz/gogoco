$(function() {
    // 클릭 on 기능
    var item = $("[class*=dep-] > li > a");
    item.on("click", function() {
        item.removeClass("on");
        $(this).toggleClass("on");
    });
    // 폴더 expand 기능
    $(".code-list .icon-treeArr").on("click", function() {
        console.log("ok");
        if ( $(this).hasClass("indent") == true ) {
            $(this).removeClass("indent").addClass("expand");
        } else if ( $(this).hasClass("expand") == true ) {
            $(this).removeClass("expand").addClass("indent");
        }
        $(this).closest("a").next().toggleClass("expand");
    });
});
