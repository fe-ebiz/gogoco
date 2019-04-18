$(function() {

    rmAreaFn();

});

// 객실 현황 기능
function rmAreaFn() {
    var rmArea = $("#roomArea");
    // rm = rmArea.finc(".")
    // Total 클릭시
    rmArea.find(".item-floor .floor.total").on("click", function() {
        rmArea.find(".item-floor .floor").removeClass("on");
        $(this).addClass("on");
        rmArea.find(".item-room").fadeIn();
    });
    // 층수 클릭시
    rmArea.find(".item-floor .floor").not(".floor.total").on("click", function() {
        $(this).toggleClass("on");
        var flrName = $(this).text(),
        on_length = rmArea.find(".item-floor .floor.on").size();
        flrName = "floor-" + flrName;
        // console.log(on_length);
        if ( rmArea.find(".item-floor .floor.total").hasClass("on") ) {
            rmArea.find(".item-room").not(".item-room[ref='"+ flrName +"']").fadeOut();
            rmArea.find(".item-room[ref='"+ flrName +"']").fadeIn();
            // total on 경우를 체크하기 위해 뒤에 실행
            rmArea.find(".item-floor .floor.total").removeClass("on");
        } else if ( on_length == 0 ) {
            rmArea.find(".item-floor .floor.total").trigger("click");
        } else {
            if ( $(this).hasClass("on") ) {
                rmArea.find(".item-room[ref='"+ flrName +"']").fadeIn();
            } else {
                rmArea.find(".item-room[ref='"+ flrName +"']").fadeOut();
            }
            // total on 경우를 체크하기 위해 뒤에 실행
            rmArea.find(".item-floor .floor.total").removeClass("on");
        }
    });
    // 룸 클릭시     
    rmArea.find(".list-room > li").on("click", function() {
        $(this).toggleClass("on");
    });
}