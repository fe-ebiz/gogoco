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
				$('input:radio[name=etc]:input[value=' + data.dd + ']').attr('checked', true);
				
				if(data.service == 'ooo' || data.service == 'oos') {
					$('#ss').val(data.service);
					$('#f-date').val(data.chkin);
					$('#t-date').val(data.chkout);
				} else {
					$('#ss').val('');
					$('#f-date').val('');
					$('#t-date').val('');
				}
				
				if(data.chk == 1) {
					$('#r-info-btn1').html('<button type=\'button\' class=\'btn-gray\'>MAKE<br>EMPTY</button>');
					$('#r-info-btn2').html('<button type=\'button\' class=\'btn-gray\'>SAVE</button>');
				} else {
					$('#r-info-btn1').html('<button type=\'button\' class=\'btn-red\'>MAKE<br>EMPTY</button>');
					$('#r-info-btn2').html('<button type=\'button\' class=\'btn-blue\' onclick=\'room.save(1)\'>SAVE</button>');
				}
			}
		});	


    });
    // 룹 별 마우스 우측 클릭시
    var roomNo = 0;
    rmArea.find(".list-room > li").on('mousedown', function(e) {
        if (  (event.button == 2) || (event.which == 3) ) {
            // console.log('마우스 오른쪽 클릭 사용 x')
			roomNo = $(this).find('.roomNo .num').text();
			status = $('#r' + roomNo).data('value');
			string = (status > 0) ? 'In House' : 'Walk In';
            
			$('#etc').html(string); 

            rmArea.on('contextmenu', function () {
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
        // $(this).closest('.sts-pop').hide();

		console.log( $(this).attr('class') );

		room.status(roomNo, $(this).attr('class'));
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
	all: function() {
		var chk		= $('#a-chk').prop('checked');

		if(chk){
			$('.assign-chk').prop('checked', true);
		} else {
			$('.assign-chk').prop('checked', false);
		}
	},

	status: function(e, i) {
		console.log(i);
		if(i == 'walkin') {
			page.layer("inhouse", "rsv", e + "|inhouse");
		} else {
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
		}
	},

	change: function(i, k) {
		$.ajax({		
			type: 'post',
			url: './inc/',
			data: 'mode=room-change&a=' + $('select[name=room]').val() + '&b=' + i + '&c=' + k,
			success: function(r) {
				$('#change').html(r);
			}
		});	
	},

	assign: function(e) {
		$.ajax({		
			type: 'post',
			url: '/_new/views/front/inc/',
			data: 'mode=room-assign&a=' + e + '&b=' + $('input[name=ho]:checked').val(),
			success: function(r) {
				data = $.parseJSON(r);
				alert('저장되었습니다.');
				$('#chk').show();
				$('.as-' + data.idx).html(data.ho);
				$('input[name=ho]').val(data.ho);
				page.close();
				//location.reload();
				//console.log(r);
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
					location.reload();
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
				console.log(r);
			}
		});
	},

	ooo: function() {
		$.ajax({		
			type: 'post',
			url: './inc/',
			data: 'mode=room-ooo&a=' + $('#type').val() + '&b=' + $('#h1').val() + '&c=' + $('#h2').val(),
			success: function(r) {
				$('#history').html(r);
			}
		});
	},

	search: function() {
		$.ajax({		
			type: 'post',
			url: './inc/',
			data: $('#iform').serialize(),
			success: function(r) {
				console.log(r);
				$('#status').html(r);
			}
		});
	},

	clear: function() {
		$('#iform').find('input[type=checkbox]').each(function(i){
			$('#iform').find('input[type=checkbox]').eq(i).prop('checked', false);
		});

		room.search();
	},

	reload: function(e) {
		$('#show').val(e);
		$('input[name=m_ho]').val(e);
	},
	
	move: function() {
		$.ajax({		
			type: 'post',
			url: './inc/',
			data: $('#iform').serialize(),
			success: function(r) {
				alert('변경되었습니다.');
				location.reload();
			}
		});
	},

	ext1: function(e) {
		var cont = $('#scroll');

		$.ajax({		
			type: 'post',
			url: './inc/',
			data: 'mode=room-ext1&a=' + $('#cdate').val() + '&b=' + $('#temp1').val() + '&c=' + e,
			success: function(r) {
				var data = r.split('|');

				if(data[0] != 'no') {
					$('#ext').html(r);

					if(e == 1) {
						$('#temp2').val(data[1]);
						$('input[name=exp]').val($('#cdate').val());
					} else {
						$('#cdate').val(data[1]);
					}	
				}
				$('#temp3').val('');
			}
		});

		setTimeout(function(){
			cont.scrollTop(10000000000000000000000000);
		}, 500);
			
	},

	ext2: function() {
		$.ajax({		
			type: 'post',
			url: './inc/',
			data: 'mode=room-ext2&a=' + $('#new-rate').val() + '&b=' + $('#temp2').val(),
			success: function(r) {
				data = r.split('||');
				$('#ext').html(data[0]);
				$('#temp2').val(data[1]);
				$('#temp3').val($('#rate').val());
			}
		});	
	},

	ext: function() {
		$.ajax({		
			type: 'post',
			url: './inc/',
			data: $('#ext-save').serialize(),
			success: function(r) {
				alert('수정되었습니다.');
				location.reload();
				//console.log(r);
			}
		});	
	},

	chkout: function(i, e) {
		if(i == 80) {
			if(confirm('체크아웃 하시겠습니까?') == true) {
				$.ajax({	
					type: 'post',
					url: '/_new/views/',
					data: 'mode=chkout&ho=' + e,
					success: function(r) {
						alert('처리되었습니다.');
						location.reload();
						//console.log(r);
					}
				});
			}
		} else {
			alert('체크아웃을 할 수 없는 날짜입니다.');
			return;
		}
	}
}

var inhouse = {
	search: function() {
		$.ajax({		
			type: 'post',
			url: './inc/',
			data: $('#iform').serialize(),
			success: function(r) {
				$('#inhouse').html(r);
			}
		});
	}
}


var chkin = {
	search: function() {
		if(!$('input[name=sdate]').val()) {
			alert('체크인 날짜를 입력해주세요.');
			$('input[name=sdate]').focus();
			return;
		}

		$.ajax({		
			type: 'post',
			url: './inc/',
			data: $('#iform').serialize(),
			success: function(r) {
				$('#chkin').html(r);
			}
		});
	},

	revert: function(a) {
		if(confirm('체크인 전으로 복구하시겠습니까?') == true) {
			$.ajax({		
				type: 'post',
				url: './inc/',
				data: 'mode=revert&a=' + a,
				success: function(r) {
					$('.as-' + a).html('');
					console.log(r);
				}
			});
		}
	}
}

var chkout = {
	search: function() {
		$.ajax({		
			type: 'post',
			url: './inc/',
			data: $('#iform').serialize(),
			success: function(r) {
				$('#chkout').html(r);
				console.log(r);
			}
		});
	}
}

