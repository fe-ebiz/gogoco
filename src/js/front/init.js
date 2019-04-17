$(function() {

    rmAreaFn();

});

// 객실 현황 기능
function rmAreaFn() {
    var rmArea = $("#roomArea");
    // rm = rmArea.finc(".")
    rmArea.find(".item-floor .floor").on("click", function() {
        // console.log($(this).text());
        var flrName = $(this).text();
        if (flrName == "Total") {
            rmArea.find(".item-room").fadeIn();
        } else {
            flrName = "floor-" + flrName;
            // rmArea.find(".item-room").fadeOut();
            rmArea.find(".item-room").not(".item-room[ref="+ flrName +"]").fadeOut();
            rmArea.find(".item-room[ref="+ flrName +"]").fadeIn();
        }
    });
    rmArea.find(".list-room > li").on("click", function() {
        $(this).toggleClass("clk");
    });
}