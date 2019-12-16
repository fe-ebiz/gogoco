$(function () {

    rmAreaFn();

});

// 객실 현황 기능
function rmAreaFn() {
    var rmArea = $("#roomArea");
    // rm = rmArea.finc(".")
    // Total 클릭시
    rmArea.find(".item-floor .floor.total").on("click", function () {
        rmArea.find(".item-floor .floor").removeClass("on");
        $(this).addClass("on");
        rmArea.find(".item-room").fadeIn();
    });
    // 층수 클릭시
    rmArea.find(".item-floor .floor").not(".floor.total").on("click", function () {
        $(this).toggleClass("on");
        var flrName = $(this).text(),
            on_length = rmArea.find(".item-floor .floor.on").size();
        flrName = "floor-" + flrName;
        // console.log(on_length);
        if (rmArea.find(".item-floor .floor.total").hasClass("on")) {
            rmArea.find(".item-room").not(".item-room[ref='" + flrName + "']").fadeOut();
            rmArea.find(".item-room[ref='" + flrName + "']").fadeIn();
            // total on 경우를 체크하기 위해 뒤에 실행
            rmArea.find(".item-floor .floor.total").removeClass("on");
        } else if (on_length == 0) {
            rmArea.find(".item-floor .floor.total").trigger("click");
        } else {
            if ($(this).hasClass("on")) {
                rmArea.find(".item-room[ref='" + flrName + "']").fadeIn();
            } else {
                rmArea.find(".item-room[ref='" + flrName + "']").fadeOut();
            }
            // total on 경우를 체크하기 위해 뒤에 실행
            rmArea.find(".item-floor .floor.total").removeClass("on");
        }
    });
    // 룸 클릭시
    rmArea.on("click", ".list-room > li", function () {
        $(this).addClass("on").siblings().removeClass("on");

        var roomNo = $(this).find('.roomNo .num').text();

        $.ajax({
            type: 'post',
            url: './inc/',
            data: 'mode=room-info&a=' + roomNo,
            success: function (r) {
                console.log(r);
                data = $.parseJSON(r);
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
                $('#r-info-memo').val(data.memo);

                if (data.service == 'ooo' || data.service == 'oos') {
                    $('#ss').val(data.service);
                    $('#f-date').val(data.chkin);
                    $('#t-date').val(data.chkout);
                } else {
                    $('#ss').val('');
                    $('#f-date').val('');
                    $('#t-date').val('');
                }

                if (data.chk == 1) {
                    $('#r-info-btn1').html('<button type=\'button\' class=\'btn-gray\'>MAKE<br>EMPTY</button>');
                    /*
                    $('#ss').attr('disabled', true);
                    $('#f-date').attr('disabled', true);
                    $('#t-date').attr('disabled', true);
                    */
                } else {
                    $('#r-info-btn1').html('<button type=\'button\' class=\'btn-red\'>MAKE<br>EMPTY</button>');
                    /*
                    $('#ss').attr('disabled', false);
                    $('#f-date').attr('disabled', false);
                    $('#t-date').attr('disabled', false);
                    */
                }
            }
        });


    });
    // 룹 별 마우스 우측 클릭시
    var roomNo = 0;
    rmArea.on('mousedown', ".list-room > li", function (e) {
        console.log(1);
        if ((event.button == 2) || (event.which == 3)) {
            console.log('마우스 오른쪽 클릭 사용 x')
            roomNo = $(this).find('.roomNo .num').text();
            console.log('test');



            status = $('#r' + roomNo).data('value');
            string = (status > 0) ? 'In House' : 'Walk In';

            $('#etc').html(string);

            rmArea.on('contextmenu', function () {
                return false;
            });
            var posTop = e.clientY,
                posLeft = e.clientX;
            if ((posTop + $('.sts-pop').outerHeight()) > $(window).height()) {
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

            $('div.sts-pop').data('temp', status);
        }
    });
    // 상태 팝업 클릭시

    $('.sts-pop .sts-list > li').on('click', function (e) {
        tmp = ($(this).attr('class') == 'walkin') ? $('div.sts-pop').data('temp') : roomNo;
        room.status(tmp, $(this).attr('class'));
    });

    // 팝업 영역 제외 클릭 시 사라짐
    $(document).on('click', function (e) {
        if (!$(e.target).is('.sts-pop .sts-list > li')) {
            $('.sts-pop').hide();
        }
    });

    // 층별 01호 표시
    rmArea.find('.item-room > .roomNo > .num').each(function (index, item) {
        var text = $(item).text();
        var temp = text.substring(text.length - 2, text.length);
        if (temp == 01) {
            $(item).closest('.item-room').addClass('floor-fst');
        }
    });
}


var room = {
    all: function () {
        var chk = $('#a-chk').prop('checked');

        if (chk) {
            $('.assign-chk').prop('checked', true);
        } else {
            $('.assign-chk').prop('checked', false);
        }
    },

    status: function (e, i) {
        console.log(i);
        if (i == 'walkin') {
            if (e > 0) {
                page.layer('inhouse', 'rsv', e + '|ih');
            } else {
                page.layer('walk-fit', 'front', e + '|ih');
            }
        } else {
            $.ajax({
                type: 'post',
                url: './inc/',
                data: 'mode=room-status&a=' + e + '&b=' + i,
                success: function (r) {
                    alert('저장되었습니다.');
                    $('.sts-pop').hide();
                    $('#r' + e).html(r);
                }
            });
        }
    },

    change: function (i, k) {
        $.ajax({
            type: 'post',
            url: './inc/',
            data: 'mode=room-change&a=' + $('select[name=_rooms]').val() + '&b=' + i + '&c=' + k,
            success: function (r) {
                $('#change').html(r);
            }
        });
    },

    assign: function (e) {
        $.ajax({
            type: 'post',
            url: '/_new/views/front/inc/',
            data: 'mode=room-assign&a=' + e + '&b=' + $('input[name=ho]:checked').val(),
            success: function (r) {
                console.log(r);
                var data = $.parseJSON(r);
                alert('저장되었습니다.');

                $('#chk1').attr('disabled', false);
                $('.as-' + data.idx).html(data.ho);
                $('.g-r-' + data.idx).html(data.room);
                $('input[name=ho]').val(data.ho);
                $('#rsv-ho-' + data.idx).html(data.ho);
                $('#rsv-chkin').html(data.btn);
                page.close();
            }
        });
    },

    chkin: function (e) {
        if (!e) {
            alert('객실 배정을 해주세요.');
            return;
        } else {
            if (confirm('체크인 하시겠습니까?') == true) {
                $.ajax({
                    type: 'post',
                    url: './inc/',
                    data: 'mode=room-chkin&a=' + e,
                    success: function (r) {
                        data = $.parseJSON(r);

                        alert('처리가 완료되었습니다.');
                        page.close();
                        page.layer('inhouse', 'rsv', data.rno + '|ih');
                        $('#s-' + data.sno).remove();
                    }
                });
            }
        }
    },

    chkall: function () {
        chk = $('input[class=assign-chk]:checked').length;

        if (chk < 1) {
            alert('예약건을 선택해주세요.');
            return;
        } else {
            if (confirm('객실 배정된 예약건만 진행됩니다\n체크인 하시겠습니까?') == true) {
                if (confirm('H/A 객실을 생성하시겠습니까?') == true) {
                    $('input[name=ha]').val('Y');
                }

                page.loading(1);

                $.ajax({
                    type: 'post',
                    url: './inc/',
                    data: $('#grp').serialize(),
                    success: function (r) {
                        console.log(r);
                        alert('처리가 완료되었습니다.');
                        page.loading(2);
                        location.href = 'inhouse.php';
                        //location.reload();
                        //page.close();
                        //page.layer('inhouse', 'rsv' , r +'|ih');
                    }
                });
            }
        }
    },

    save: function (e) {
        if (!$('#r-info-num').val()) {
            alert('호수를 선택하세요');
            return;
        }

        $.ajax({
            type: 'post',
            url: './inc/',
            data: $('#status' + e).serialize(),
            success: function (r) {
                console.log(r);
                alert('저장되었습니다.');
                var data = r.split('|');
                $('#r' + data[1]).html(data[0]);
            }
        });
    },

    ooo: function () {
        $.ajax({
            type: 'post',
            url: './inc/',
            data: $('#oform').serialize(),
            success: function (r) {
                $('#history').html(r);
            }
        });
    },

    search: function () {
        $.ajax({
            type: 'post',
            url: './inc/',
            data: $('#iform').serialize(),
            success: function (r) {
                $('#status').html(r);
            }
        });
    },

    clear: function () {
        $('#iform').find('input[type=checkbox]').each(function (i) {
            $('#iform').find('input[type=checkbox]').eq(i).prop('checked', false);
        });

        room.search();
    },

    reload: function (e) {
        $('#show').val(e);
        $('input[name=m_ho]').val(e);
    },

    move: function () {
        $.ajax({
            type: 'post',
            url: './inc/',
            data: $('#mform').serialize(),
            success: function (r) {
                alert('객실 변경이 완료되었습니다.');
                location.reload();
            }
        });
    },

    ext1: function (e) {
        var cont = $('#scroll');

        $.ajax({
            type: 'post',
            url: './inc/',
            data: 'mode=room-ext1&a=' + $('#cdate').val() + '&b=' + $('#temp1').val() + '&c=' + e,
            success: function (r) {
                var data = r.split('|');

                if (data[0] != 'no') {
                    $('#ext').html(r);

                    if (e == 1) {
                        $('#temp2').val(data[1]);
                        $('input[name=exp]').val($('#cdate').val());
                    } else {
                        $('#cdate').val(data[1]);
                    }
                }
                $('#temp3').val('');
            }
        });

        setTimeout(function () {
            cont.scrollTop(10000000000000000000000000);
        }, 500);

    },

    ext2: function () {
        $.ajax({
            type: 'post',
            url: './inc/',
            data: 'mode=room-ext2&a=' + $('#new-rate').val() + '&b=' + $('#temp2').val(),
            success: function (r) {
                data = r.split('||');
                $('#ext').html(data[0]);
                $('#temp2').val(data[1]);
                $('#temp3').val($('#rate').val());
            }
        });
    },

    ext: function () {
        page.loading(1);

        $.ajax({
            type: 'post',
            url: './inc/',
            data: $('#ext-save').serialize(),
            success: function (r) {
                //var data = $.parseJSON(r);
                alert('수정되었습니다.');
                page.loading(2);
                page.close();
                page.close();
                page.layer('inhouse', 'rsv', r + '|co');

                console.log(r);
            }
        });
    },

    chkout: function (i, e) {
        data = i.split('|');

        if (data[0] != '80') {
            alert('체크아웃 날짜를 확인해주세요.');
            return;
        }

        if (data[1] != '0') {
            alert('Balance를 확인해주세요.');
            return;
        }

        if (confirm('체크아웃 하시겠습니까?') == true) {
            $.ajax({
                type: 'post',
                url: '/_new/views/',
                data: 'mode=chkout&ho=' + e,
                success: function (r) {
                    alert('처리되었습니다.');
                    location.reload();
                }
            });
        }
    }
}

var inhouse = {
    search: function () {
        $.ajax({
            type: 'post',
            url: './inc/',
            data: $('#iform').serialize(),
            success: function (r) {
                $('#inhouse').html(r);
            }
        });
    }
}


var chkin = {
    search: function () {
        if (!$('input[name=sdate]').val()) {
            alert('체크인 날짜를 입력해주세요.');
            $('input[name=sdate]').focus();
            return;
        }

        $.ajax({
            type: 'post',
            url: './inc/',
            data: $('#iform').serialize(),
            success: function (r) {
                var data = $.parseJSON(r);

                $('#chkin').html(data.list);
                $('#chkin-total').html(data.list2);
                $('#arr').html(data.arr);

                //console.log(data.list);
                //$('#chkin').html(r);
            }
        });
    },

    revert: function (a) {
        if (confirm('체크인 전으로 복구하시겠습니까?') == true) {
            page.loading(1);

            $.ajax({
                type: 'post',
                url: './inc/',
                data: 'mode=chkin-revert&a=' + a,
                success: function (r) {
                    var data = $.parseJSON(r);
                    $('#revert-' + a).html(data.btn);
                    page.loading(2);
                }
            });
        }
    }
}

var chkout = {
    search: function () {
        $.ajax({
            type: 'post',
            url: './inc/',
            data: $('#iform').serialize(),
            success: function (r) {
                $('#chkout').html(r);
            }
        });
    },

    revert: function (a) {
        if (confirm('체크아웃 전으로 복구하시겠습니까?') == true) {
            page.loading(1);
            $.ajax({
                type: 'post',
                url: './inc/',
                data: 'mode=chkout-revert&a=' + a,
                success: function (r) {
                    var data = $.parseJSON(r);
                    page.loading(2);
                    $('#s-' + data.idx).remove();
                }
            });
        }
    }
}

var status = {
    reset: function (e) {
        if (e == '') {
            $('#f-date').val('');
            $('#t-date').val('');
        }
    }
}

var walk = {
    reg: function () {
        if (!$('input[name=name]').val()) {
            alert('게스트 이름을 입력해주세요.');
            $('input[name=name]').focus();
            return;
        }

        if (!$('input[name=chkin]').val()) {
            alert('체크인 날짜를 선택해주세요.');
            $('input[name=chkin]').focus();
            return;
        }

        if (!$('input[name=chkout]').val()) {
            alert('체크아웃 날짜를 선택해주세요.');
            $('input[name=chkout]').focus();
            return;
        }

        if (!$('input[name=person]').val()) {
            alert('투숙인원을 입력해주세요.');
            $('input[name=person]').focus();
            return;
        }

        if (!$('input[name=rate]').val()) {
            alert('요금을 입력해주세요.');
            $('input[name=rate]').focus();
            return;
        }

        $('.lds-mask').show();

        $.ajax({
            type: 'post',
            url: '/_new/views/',
            data: $('#reg').serialize(),
            success: function (r) {
                console.log(r);
                $('.lds-mask').hide();
                page.close();
                page.layer('inhouse', 'rsv', r);
            }
        });
    },

    cxl: function (e) {
        switch (e) {
            case '1':
                value = '9001';
                $('#room').attr('disabled', false);
                $('#room option[value=""]').remove();
                rsv.night();
                break;
            case '2':
                value = '9999';
                $('#room').prepend('<option value=""></option>');
                $('#room option:eq(0)').attr('selected', 'selected');
                $('#room').attr('disabled', true);
                $('#r-rate1').val(0);
                $('#r-rate2').val(0);
                $('#r-rate3').val(0);
                $('#rate').val(0);
                $('#info-r').val('');
                $('#info-s').val('');
                $('#info-p').val('');
                rsv.convert($('#rate').val(), 'convert');
                break;
            default:
                value = '';
                $('#room').attr('disabled', false);
                $('#room option[value=""]').remove();
                rsv.night();
                break;
        }

        $('input[name=h-no]').val(value);
        $('#walkin').attr('disabled', false);
    },

    assign: function (e) {
        str = $('input[name=ho]:checked').val().split('|');

        $('input[name=h-no]').val(str[0]);
        $('#walkin').attr('disabled', false);

        console.log('front');
        page.close();
    }
}