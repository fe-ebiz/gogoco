$(function() {

	// input autocomplete off
	$('input').attr('autocomplete','off');
	popClsFn();
	datePick();
	ascending();
    tabFn();
    dropMenu();

	// $('#sdate').datepicker({
	// 	onClose: function() {    
	// 		$('#edate').datepicker('option', 'minDate', '+0d');
	// 	}    
	// });
});

// 팝업 기능 등록
var popFn = {
	show: function(obj_name) {
		$(obj_name).show();
	},
	show_flag: function(obj_name, obj_this, flag) {
        if (flag == false) {
            $(obj_this).closest(".pop-container").children(".bg-back").hide();
        }
		$(obj_name).show();
    },
    close_flag: function(obj_name, obj_this, flag) {
        if (flag == true) {
            $(obj_name).closest(".pop-container").children(".bg-back").show();
        }
        $(obj_name).show();
		$(obj_this).closest(".pop-container").hide();
	}
}


var page = {
	layer: function(a, b, c) {
		if(a == 'pkg') {
			var c = $(c.closest("tr")).index();
		}

		$.ajax({		
			type: 'post',
			url: '/_new/views/layer/',
			data: 'a=' + a + '&b=' + b + '&c=' + c,
			success: function(e) {
				$('#layer').html(e);
			}
		});
	},
	
	close: function() {
		$('.pop-container').hide();
	},

	depth: function() {
		
	},

	favorites: function(a, b, c) {
		$.ajax({		
			type: 'post',
			url: '/_new/views/',
			data: 'mode=favorites&a=' + a + '&b=' + b + '&c=' + c,
			success: function(r) {
				//console.log(r);
				location.reload();
			}
		});
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
    $.datepicker.setDefaults({
        dateFormat: 'yy-mm-dd',
        prevText: '이전 달',
        nextText: '다음 달',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        showMonthAfterYear: true,
        yearSuffix: '년'
    });
	$( "input.date-ui" ).datepicker({
		dateFormat: 'yy-mm-dd'
    });	



    $('#sdate').datepicker({
		minDate: 0,
		onClose: function(selectedDate) {
			$("#edate").datepicker( "option", "minDate", selectedDate );
		}
	});

	$('#edate').datepicker({
		minDate: 0,
		onSelect: function() {
			$.ajax({
				type: 'post',
				url: './inc/',
				data: 'mode=date&sdate=' + $('#sdate').val() + '&edate=' + this.value,
				success: function(r) {
					var data = r.split('|');
					
					$('input[name=nights]').val(data[0]);
					$('#rate').val(addCommas(data[1]));
					rsv.convert(data[1], 'convert');
				}
			});
		}
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
        
        if (box.length > 0) {
            box.find(".item-list > div").eq(idx).addClass("on").siblings().removeClass("on");
            box.find(".item-list > div").eq(idx).show().siblings().hide();
        }

		$(this).addClass("on").siblings().removeClass("on");
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

// drop메뉴 기능
function dropMenu() {
    var dropBox = $('.inp-drop-box'),
        resetBtn = dropBox.find('.ic-del');
    dropBox.find('.form-input').click(function() {
        $(this).next().show();
    });
    dropBox.find('.drop-menu > li').click(function() {
        var txtVal = $(this).text();
        $(this).parent().prev().val(txtVal);
        $(this).parent().filter('.drop-menu').hide();
    });
    resetBtn.click(function() {
        $(this).siblings().filter('.form-input').val('');
        $(this).siblings().filter('.drop-menu').hide();
    });
    $(document).on('click', function(e){
        if ( !$(e.target).is('.inp-drop-box .form-input') && !$(e.target).is('.inp-drop-box .drop-menu > li') ) {
            dropBox.find('.drop-menu').hide();
        }
    });
}

function addCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function removeCommas(x) {
    if(!x || x.length == 0) return "";
    else return x.split(",").join("");
}