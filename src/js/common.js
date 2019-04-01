$(function() {

	popClsFn();
	datePick();
	ascending();
	tabFn();

});

// 팝업 기능 등록
var popFn = {
	show: function(obj_name) {
		$(obj_name).show();
	}
}

// 팝업 닫기 기능
function popClsFn() {
	var containerName = ".pop-container",
		popContainer = $(containerName),
		btn_cls = popContainer.find(".fn-cls");

	btn_cls.on("click", function() {
		$(this).closest(containerName).hide();
	});
	popContainer.find(".bg-back").on("click", function() {
		$(this).closest(containerName).hide();
	});
}

// 달력 ui
function datePick() {
	$( "input.date-ui" ).datepicker({
		dateFormat: 'yy-mm-dd'
	});
}

// 결과 오름차순 토글
function ascending() {
	$(".order-ui").on("click", function() {
		$(this).toggleClass("ascending");
	});
}

// 탭 기능
function tabFn() {
	var box = "";
	$(".tab-list > .tab").on("click", function() {
		var idx = $(this).index();
		box = $(this).closest(".fn-tabShow");

		$(this).addClass("on").siblings().removeClass("on");
		box.find(".item-list > div").eq(idx).addClass("on").siblings().removeClass("on");
		box.find(".item-list > div").eq(idx).show().siblings().hide();
	});
}

// dep 클릭 기능
function depUlClk() {
    // 클릭 on 기능
    var item = $("[class*=dep-] > li > a");
    item.on("click", function() {
        item.removeClass("on");
        $(this).toggleClass("on");
    });
    // 폴더 expand 기능
    $(".fn-fold .icon-treeArr").on("click", function() {
        // console.log("ok");
        if ( $(this).hasClass("indent") == true ) {
            $(this).removeClass("indent").addClass("expand");
        } else if ( $(this).hasClass("expand") == true ) {
            $(this).removeClass("expand").addClass("indent");
        }
        $(this).closest("a").next().toggleClass("expand");
    });
}

function depTblClk() {
    // 클릭 on 기능
    $(".fn-fold tr").on("click", function() {
        $(this).toggleClass("on").siblings().removeClass("on");
    });

    // 폴더 expand 기능
    $(".fn-fold .icon-treeArr").on("click", function () {
        // console.log("ok");
        var lineRef = $(this).closest("tr").attr("ref");
        console.log(lineRef);

        // 아이콘 변경 및 목록 펼치기
        if ($(this).hasClass("indent") == true) {
            console.log("indent : " + $(this).hasClass("indent"));
            $(this).removeClass("indent").addClass("expand");
            if (lineRef == "line000") {
                $(".fn-fold tr.dep-2").show();
            } else {
                lineRef += "-0";
                console.log(lineRef);
                $(".fn-fold tr[ref='" + lineRef + "']").show();
            }
        } else if ($(this).hasClass("expand") == true) {
            console.log("expand : " + $(this).hasClass("expand"));
            $(this).removeClass("expand").addClass("indent");
            if (lineRef == "line000") {
                $(".fn-fold tr[ref]").not("tr[ref='line000']").hide();
                $(".fn-fold .icon-treeArr").removeClass("expand").addClass("indent");
            } else {
                lineRef += "-0";
                console.log(lineRef);
                $(".fn-fold tr[ref*='" + lineRef + "']").hide();
                $(".fn-fold tr[ref*='" + lineRef + "']").find(".icon-treeArr").removeClass("expand").addClass("indent");
            }
        }

    });
}