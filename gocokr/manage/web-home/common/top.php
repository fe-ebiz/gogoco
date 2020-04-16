<?php
require (__DIR__.'/../load.php');
include_once (INC_DIR.'web-home/common/logincheck.php');
include_once (INC_DIR.'web-home/common/add.php');
$css = ($_SESSION['chain'] == 'c072') ? '_bs' : '';

$__Temp = array(
	array('강릉관광호텔', 'h1142'),
	array('경주한옥마을황남관', 'h888'),
	array('낙산메리엘콘도', 'c029'),
	array('낙산비치호텔', 'h123'),
	array('남한강일성콘도', 'c066'),
	array('담모라리조트', 'r181'),
	array('대천로하스호텔', 'y2gseo'),
	array('더킹호텔', 'h1335'),
	array('도고카라반', 'p795'),
	array('동강시스타', 'r091'),
	array('동해카라반호텔', 'c0002 '),
	array('라마다앙코르평택', 'h1285'),
	array('라마다용인호텔', 'h1339'),
	array('루체빌리조트', 'h1012'),
	array('메이힐스', 'r012'),
	array('모항해나루', 'h1099'),
	array('부곡온천일성콘도', 'c063'),
	array('설악썬밸리', 'r036'),
	array('설악일성콘도', 'c060'),
	array('세종호텔춘천', 'h122'),
	array('쏠비치아쿠아', 'T026'),
	array('씨베이호텔', 'h1559'),
	array('아이원리조트', 'r179'),
	array('아이파크콘도', 'c032'),
	array('여수비치콘도', 'P248'),
	array('여수오동재호텔', 'h530'),
	array('연호리조트', 'c033'),
	array('오션투유리조트', 'c014'),
	array('오투리조트', 'r046'),
	array('이스턴파크', 'p606'),
	array('제주비치일성콘도', 'c062'),
	array('지리산일성콘도', 'c065'),
	array('케이호텔', 'h748'),
	array('코레스코치악', 'c015'),
	array('토요코인부산역1지점', 'h386'),
	array('토요코인부산역2', 'h367'),
	array('토요코인서면점', 'h804'),
	array('토요코인해운대1지점', 'h413'),
	array('토요코인해운대2', 'h904'),
	array('통영관광호텔', 'h735'),
	array('파라다이스스파도고', 'T001'),
	array('팔레드시즈', 'c019'),
	array('하이밸리호텔', 'h506'),
	array('한옥호텔오동재', 'h530'),
	array('현대수리조트', 'r030')
)
?>
<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
<html xmlns='http://www.w3.org/1999/xhtml' xml:lang='ko' lang='ko'>
<head>
<title>Management-Go</title>
<meta http-equiv='content-type' content='text/html; charset=utf-8'/>
<meta http-equiv='Pragma' content='no-cache'> 
<meta http-equiv='Cache-Control' content='no-cache'>
<meta http-equiv='Expires' content='Mon, 06 Jan 1990 00:00:01 GMT'> 
<meta http-equiv='Expires' content='-1'> 
<meta http-equiv='X-UA-Compatible' content='IE=edge' />
<meta http-equiv='imagetoolbar' content='false'/>
<meta property='og:type' content='website'>
<meta property='og:title' content='Management-Go'>
<meta property='og:description' content='국내외여행, 호텔, 편션, 리조트, 콘도 최저가할인예약 GO.CO.KR'>
<meta property='og:url' content='http://www.go.co.kr'>
<meta name='author' content='GO.CO.KR'/>
<meta name='description' content='국내외여행, 호텔, 편션, 리조트, 콘도 최저가할인예약 GO.CO.KR'/>
<meta name='classification' content='GO.CO.KR'/>
<meta name='keywords' content='GO.CO.KR'/>
<link rel='shortcut icon' href='<?=base_img?>/go.ico' />
<link rel='stylesheet' href='<?=base_css?>/reset.css?v=<?=time()?>' type='text/css'/>
<link rel='stylesheet' href='<?=base_css?>/layout.css?v=<?=time()?>' type='text/css'/>
<link rel='stylesheet' href='<?=base_css?>/room_layout<?=$css?>.css'>
<link rel="stylesheet" href='<?=base_css?>/jquery-ui.css' />
<style>
.table-wrapper .table-box .d-table  th.th-d {padding-left: 10px;}
</style>
<script src='//code.jquery.com/jquery-1.12.2.min.js' integrity='sha256-lZFHibXzMHo3GGeehn1hudTAP3Sc0uKXBXAzHX1sjtk=' crossorigin='anonymous'></script>
<script src='<?=base_js?>/jquery-ui.js'></script>
<script src='<?=base_js?>/datepicker_ko.js'></script>
<script src='<?=base_js?>/jquery.number.min.js'></script>
<script src='<?=base_js?>/common.js'></script>


<script type="text/javascript">
$(function() {
	$('#sdate').datepicker({ dateFormat:'yy-mm-dd', showAnim:'slideDown', dayNamesMin:['일','월','화','수','목','금','토'], changeMonth: true, changeYear: true });
	$('#edate').datepicker({ dateFormat:'yy-mm-dd', showAnim:'slideDown', dayNamesMin:['일','월','화','수','목','금','토'], changeMonth: true, changeYear: true });
	$('#sdate2').datepicker({ dateFormat:'yy-mm', showAnim:'slideDown', dayNamesMin:['일','월','화','수','목','금','토'], changeMonth: true, changeYear: true });
	$('#edate2').datepicker({ dateFormat:'yy-mm', showAnim:'slideDown', dayNamesMin:['일','월','화','수','목','금','토'], changeMonth: true, changeYear: true });
	
	var menupos = $('#nav-bar').offset().top; 
	
	$(window).scroll(function(){ 
		
		//특정높이 이상부터 스크립트 실행 
		if($(window).scrollTop() > 150) {
		   if($(window).scrollTop() >= menupos) { 
				$('#nav-bar').css({'position': 'fixed', 'top': '0'}); 			
				$('#nav-bar .nav').css({'height': 55, 'top': 0});
				$('#alert_info').css({'position': 'fixed', 'top': 50, 'z-index': 2}); 
				$('#top_mar').show();
				$('#logo').hide().css({'position': 'fixed', 'top': 0, 'width': 116, 'z-index': 3, 'right': '66%', 'margin-right': 325}).hover(function(){
					$(this).css({'width': '116px', 'text-align': 'left'});	
				});
			} else {
				$('#nav-bar').css('position','relative');
				$('#alert_info').css({'position': 'relative', 'top': 0}); 
				$('#nav-bar .nav').css({'height': 50});
				$('#top_mar').hide();
				$('#logo').hide();
			}
		} else if($(window).scrollTop() == 0){
			//스크롤이 맨위로 가면 초기화 
			$('#nav-bar').css('position','relative');
			$('#alert_info').css({'position': 'relative', 'top': 0}); 
			$('#nav-bar .nav').css({'height': 50});
			$('#top_mar').hide();
			$('#logo').hide();
		}		
    });

	$('.table-bordered thead input[name=week]').change(function(){
        var dayofweek = $(this).attr('data-week-of-day');
        var checked =  $(this).is(':checked');
        $('.table-bordered tbody tr td input[name=date][data-week-of-day='+dayofweek+']').prop('checked', checked);
    });
});

function login(e) {
	$.ajax({		
		type: 'post',
		url: '/inc/state.php',
		data: 'mode=login&admin=2&a=' + e,
		success: function(r) {
			location.reload();
		}
	});
}
</script>
</head>
<body>
<div id='headerW'>
	<div class='header'>
		<h1><a href='/'><img src='<?=base_img?>/logo_<?=$LOGO?>.jpg'></a></h1>
		<div class='snb'>				
            <div class="using-user">
                <a href="javascript:;" class="toggle-btn" onclick="$(this).next().toggle()">접속멤버 110명</a>
                <div class="using-member-area" style="display: none">
                    <ul class="list">
                        <li>OOO, 123.123.12.12, 2020-04-16 05:10:10 </li>
                        <li>OOO, 123.123.12.12, 2020-04-16 05:10:10 </li>
                        <li>OOO, 123.123.12.12, 2020-04-16 05:10:10 </li>
                        <li>OOO, 123.123.12.12, 2020-04-16 05:10:10 </li>
                        <li>OOO, 123.123.12.12, 2020-04-16 05:10:10 </li>
                        <li>OOO, 123.123.12.12, 2020-04-16 05:10:10 </li>
                        <li>OOO, 123.123.12.12, 2020-04-16 05:10:10 </li>
                        <li>OOO, 123.123.12.12, 2020-04-16 05:10:10 </li>
                        <li>OOO, 123.123.12.12, 2020-04-16 05:10:10 </li>
                        <li>OOO, 123.123.12.12, 2020-04-16 05:10:10 </li>
                    </ul>
                </div>
            </div>		
			<?=$manager?>님 &nbsp; 
			<a href='/' class='log_btn'>HOME</a> 
			<a href='http://www.go.co.kr/home/view/?p_no=<?=XOREncode($member_info['no'])?>' class='log_btn' target='_blank'>바로가기</a> 
			<a href='/logout.php' class='log_btn'>로그아웃</a> 
			<a onclick='page.layer("password", "")' class='log_btn'>비밀번호변경</a>
			<?php if($employ['grade'] == 1) { ?>			
			<select style='height: 28px;' onchange='kspark.move(this.value)'>
			<?php
			$_a = 'select * from n_product where own="Y"';
			$_b = mysql_query($_a, $dbconn);
			while($_c = mysql_fetch_assoc($_b)) { ?> 
			<option value='<?=$_c['w_id']?>' <?=($_c['w_id'] == $member_info['w_id']) ? 'selected="selected"' : ''?>><?=$_c['company']?></option>
			<?php
			}
			echo $is_add;

			if($employ['userid'] == 'kspark' || $employ['userid'] == 'neonuri' || $employ['userid'] == 'ohsugum') {
			?>
				<option value=''>=============================</option>
			<?php
				for($z = 0; $z < sizeof($__Temp); $z++) { ?>
				<option value='<?=$__Temp[$z][1]?>' <?=($__Temp[$z][1] == $member_info['w_id']) ? 'selected="selected"' : ''?>><?=$__Temp[$z][0]?></option>
				<?php } 
			}
			?>			
			</select>
			<?php } ?>
		</div>
	</div>
</div>

<div id='nav-bar' style='z-index: 3; position: relative; top: 0px;'>
	<ul class='nav' style='height: 50px; top: 0px;'>
		<li <?=$class1?>>
			<a href='reserve.php'>판매기록</a>
			<ul class='dep2-menu'>
				<li><a href='reserve.php'>판매목록</a></li>
				<li><a href='reserve.php?e=Y'>이벤트 판매목록</a></li>
				<li><a href='virtual.php'>입금대기</a></li>
				<li><a href='chkin1.php'>투숙자 리스트</a></li>
				<li><a href='etc.php'>부대시설 현황</a></li>
				<?php if($uid == 'kspark') { ?>	
				<li><a href='facilities.php'>부대시설</a></li>
				<?php } ?>
			</ul>
		</li>
		<li <?=$class2?>>
			<a href='sale1.php?v=2'>객실관리</a>
			<ul class='dep2-menu'>
				<li><a href='sale1.php?v=2'>요금</a></li>
				<li><a href='sale3.php'>현황</a></li>
				<!--li><a href='sale2.php'>현황2</a></li-->
				<li><a href='room.php'>관리</a></li>
			</ul>
		</li>
		<li <?=$class3?>>
			<a href='room_day.php'>판매현황</a>
			<ul class='dep2-menu'>
				<li><a href='room_day.php'>전체 일별</a></li>
				<li><a href='room_month.php'>전체 월별</a></li>

				<li><a href='agency_day.php'>판매채널 일별(결제)</a></li>
				<li><a href='agency_month.php'>판매채널 월별(결제)</a></li>
				<li><a href='agency_day.php?a=1'>판매채널 일별(투숙)</a></li>
				<li><a href='agency_month.php?a=1'>판매채널 월별(투숙)</a></li>
				<li><a href='agency_room.php'>판매채널 일별(객실)</a></li>

				<li><a href='etc_day.php'>부대시설 일별</a></li>
				<li><a href='etc_month.php'>부대시설 월별</a></li>
			</ul>
		</li>
		<li <?=$class4?>><a href='info.php'>호텔정보</a></li>		
	</ul>
</div>

<div id='top_mar' style='display:none; z-index:9999;'></div>

<div id='wrapper'>
	<div id='container' <?=$extra?>>

<?php
if($cur_pos == 99) {
	echo '</div></div>';	
} else if($cur_pos == 88) {
	echo '</div>';
}
?>