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
		$(this).addClass("on").siblings().removeClass("on");
		
		var roomNo = $(this).find('.roomNo .num').text();

		$.ajax({		
			type: 'post',
			url: './inc/',
			data: 'mode=room-info&a=' + roomNo,
			success: function(r) {
				var data = $.parseJSON(r);
				$('#r-info-floor').empty();
				$('#r-info-floor').append(data.floor);
				$('#r-info-num').val(data.ho);
				$('#r-info-room').empty();
				$('#r-info-room').append(data.select);
				$('#r-info-assign').empty();
				$('#r-info-assign').append(data.select);
				$('#r-info-chkin').empty();
				$('#r-info-chkin').append(data.select);
			}
		});	


    });
    // 룹 별 마우스 우측 클릭시
    var roomNo = 0;
    rmArea.find(".list-room > li").on('mousedown', function(e) {
        if (  (event.button == 2) || (event.which == 3) ) {
            // console.log('마우스 오른쪽 클릭 사용 x')
            roomNo = $(this).find('.roomNo .num').text();
            // console.log( roomNo );
            $(document).on('contextmenu', function() {
                return false;
            });
            var posTop = e.clientY,
                posLeft = e.clientX;
            if ( (posTop + $('.sts-pop').outerHeight() ) > $(window).height() ) {
                posTop = posTop - $('.sts-pop').outerHeight();
                $('.sts-pop').css({
                    "left": posLeft,
                    "top": posTop,
                    "position": "fixed"
                }).show();
            } else {
                $('.sts-pop').css({
                    "left": posLeft,
                    "top": posTop,
                    "position": "fixed"
                }).show();
            }
        }
    });
    // 상태 팝업 클릭시

    $('.sts-pop .sts-list > li').on('click', function(e) {
        //console.log( roomNo );
        //console.log( $(this).text() );
        // $(this).closest('.sts-pop').hide();
		room.status(roomNo, $(e.target).attr('class'));
    });

    // 팝업 영역 제외 클릭 시 사라짐
    $(document).on('click', function(e){
        if ( !$(e.target).is('.sts-pop .sts-list > li') ) {
            // console.log('hi');
            $('.sts-pop').hide();
        }
    });

    // 층별 01호 표시
    rmArea.find('.item-room > .roomNo > .num').each(function(index, item) {
        var text = $(item).text();
        var temp = text.substring(text.length - 2, text.length);
        if ( temp == 01 ) {
            $(item).closest('.item-room').addClass('floor-fst');
        }
    });
}


var room = {
	status: function(e, i) {
		$.ajax({		
			type: 'post',
			url: './inc/',
			data: 'mode=room-status&a=' + e + '&b=' + i,
			success: function(r) {
				alert('저장되었습니다.');
				$('.sts-pop').hide();
				$('#r' + e).html(r);
			}
		});	
	},

	change: function(e, i, k) {
		$.ajax({		
			type: 'post',
			url: './inc/',
			data: 'mode=room-change&a=' + e + '&b=' + i + '&c=' + k,
			success: function(r) {
				$('#change').html(r);
			}
		});	
	},

	assign: function(e) {
		$.ajax({		
			type: 'post',
			url: './inc/',
			data: 'mode=room-assign&a=' + e + '&b=' + $('input[name=ho]:checked').val(),
			success: function(r) {
				alert('저장되었습니다.');
				location.reload();
			}
		});	
	},

	chkin: function(e) {
		if(confirm('체크인 하시겠습니까?') == true) {
			$.ajax({		
				type: 'post',
				url: './inc/',
				data: 'mode=room-chkin&a=' + e,
				success: function(r) {
					alert('처리가 완료되었습니다.');
					$('#s-' + e).html(r);
				}
			});
		} 
	},

	save: function(e) {
		if(!$('#r-info-num').val()) {
			alert('호수를 선택하세요');
			return;
		}

		$.ajax({		
			type: 'post',
			url: './inc/',
			data: $('#status' + e).serialize(),
			success: function(r) {
				alert('저장되었습니다.');
				var data = r.split('|');
				$('#r' + data[1]).html(data[0]);
				//console.log(r);
			}
		});
	}
}