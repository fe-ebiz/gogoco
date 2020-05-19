<?php
require (__DIR__.'/../../load.php');

$sdate = date("Y-m-d");
$edate = date("Y-m-d", strtotime("+3 month"));

$__cnt = mysql_fetch_assoc(mysql_query('select count(*) as cnt from login where wdate="'.date('Y-m-d').'"', $dbconn4));
?>
<!DOCTYPE html>
<!--[if IE 8]><html lang="ko-KR" class="no-js ie8 lt-ie10"><![endif]-->
<!--[if IE 9]><html lang="ko-KR" class="no-js ie9 lt-ie10"><![endif]-->
<!--[if !IE]><!-->
<html lang="ko-KR">
<!--<![endif]-->

<head>
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta charset="UTF-8">
    <meta name="description" content="description">
    <meta name="keywords" content="keywords">
    <meta name="author" content="author">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Management-Go</title>

    <meta property="og:type" content="website">
    <meta property="og:title" content="고코매니저">
    <meta property="og:description" content="Management">
    <meta property="og:image" content="../../public/img/common/og_gocomng.jpg">
    <meta property="og:url" content="">

    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="">
    <meta name="twitter:description" content="">
    <meta name="twitter:image" content="">
    <meta name="twitter:domain" content="">
    <!--<link rel="canonical" href="도메인">-->

    <link rel="shortcut icon" href="../../public/img/go/go.ico">

    <!--폰트-->
    <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/cs/s/font-awesome.min.css"> -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">

    <link rel="stylesheet" href="../../public/fonts/nanumgothic/nanumgothic.css">
    <link rel="stylesheet" href="../../public/fonts/notosanskr/notosanskr.css">

    <!--공통 Css-->
    <!--	<link rel="stylesheet" href="https://static.go.co.kr/css/go/reset.css" type="text/css">-->
    <!--	<link rel="stylesheet" href="https://static.go.co.kr/css/go/layout.css" type="text/css">-->
    <link rel="stylesheet" href="../../public/css/reset.css">

    <!--<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">-->
    <link rel="stylesheet" href="../../public/css/jquery-ui-1.12.1.min.css">

    <!--개별 Css-->
    <link rel="stylesheet" href="../../public/css/dashboard/common.css">
    <link rel="stylesheet" href="../../public/css/winpop/winpop.css">
    <link rel="stylesheet" href="../../public/css/include/pop.css">
    <link rel="stylesheet" href="../../public/css/dashboard/init.css">

    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/detectizr/1.5.0/detectizr.min.js"></script> -->
    <script src="../../public/js/jquery-1.12.4.min.js"></script>
    <script src="../../public/js/jquery-ui-1.12.1.min.js"></script>
    <!-- <script>
		Modernizr.Detectizr.detect();
	</script> -->

    <!--개별 Js-->
    <script src="../../public/js/common.js"></script>

    <!--[if lt IE 9]>
		<script type="text/javascript" src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
	<![endif]-->

</head>


<body class="page-dashboard">

    <header class="wrapper">
        <header class="header" id="header">
            <div class="group cont-utils">

            </div>
            <div class="group cont-header">
                <h1 class="logo">
                    <a href="/" class="logo-a">
                        <!-- 사이트 별 로고 -->
                        <img src="../../public/img/common/logo_mng.png" alt="고코투어 CMS" class="logo-img">
                        <!-- <img src="../../public/img/common/logo_ocean.jpg" alt="고코투어 CMS" class="logo-img"> -->
                        <!-- <img src="../../public/img/common/logo_bsdogo.jpg" alt="고코투어 CMS" class="logo-img"> -->
                        <!-- <img src="../../public/img/common/logo_ramada.png" alt="고코투어 CMS" class="logo-img"> -->
                    </a>
                </h1>

				<nav class="cf gnb" id="gnb">
					<ul class="menu dep-1">
						<li>
							<ul class="dep-2" style="display: block">
								<li><a href='/sale3.php'>현황</a></li>
								<li><a href='/agency_day.php'>판매채널 일별(결제)</a></li>
								<li><a href='/agency_month.php'>판매채널 월별(결제)</a></li>
								<li><a href='/agency_day.php?a=1'>판매채널 일별(투숙)</a></li>
								<li><a href='/agency_month.php?a=1'>판매채널 월별(투숙)</a></li>
								<li><a href='/agency_room.php'>판매채널 일별(객실)</a></li>
							</ul>
						</li>
					</ul>
				</nav>

                <nav class="user-bar">
                    <div class="using-user">
                        <a href="javascript:;" class="toggle-btn" onclick="$(this).next().toggle()">접속멤버 <?=$__cnt["cnt"]?>명</a>
                        <div class="using-member-area" style="display: none">
							<table class="list" style="width: 100%">
		                        <?php
		                        $_a = 'select * from login where wdate="'.date('Y-m-d').'" order by wdate desc, wtime desc';
		                        $_b = mysql_query($_a, $dbconn4);
		                        while($_c = mysql_fetch_assoc($_b))
		                        {
			                        $_row = mysql_fetch_assoc(mysql_query('select * from employee where userid="'.$_c["userid"].'"', $dbconn4));
			                        ?>
									<tr>
										<td><?=$_row["name"]?></td>
										<td><?=$_c["uip"]?></td>
										<td><?=substr($_c["wdate"], 5, 5)?> <?=substr($_c["wtime"], 0, 5)?></td>
									</tr>
		                        <?php } ?>
							</table>
                        </div>
                    </div>
					<span class='user'><?=$manager?>님 <i class='fa fa-user-circle'></i></span>
                    <ul class="menu cf">
						<li class='item item-1'><a href='/'><i class="icon-menu ic-home"></i> <span class='hidden'>홈</span></a></li>
						<li class='item item-2'><a href='http://www.go.co.kr/home/view/?p_no=<?=XOREncode($member_info['no'])?>' target='_blank'><i class="icon-menu ic-explore"></i> <span class='hidden'>바로가기</span></a></li>
						<li class='item item-2'><a href='../member/logout.php'><i class="icon-menu ic-out"></i> <span class='hidden'>로그아웃</span></a></li>
						<li class='item item-1'><a onclick='page.layer("add", "adm", "<?=$employ['userid']?>")'><i class="icon-menu ic-gear"></i> <span class='hidden'>정보수정</span></a></li>
                    </ul>
                    <div class="site-info">
	                    <?php if($employ['grade'] == 1 && (!empty($auth))) { ?>
							<select class='slt-site' onchange='page.move(this.value)'>
			                    <?php
			                    $_a = 'select * from n_product where own="Y"';
			                    $_b = mysql_query($_a, $dbconn);
			                    while($_c = mysql_fetch_assoc($_b)) { ?>
									<option value='<?=$_c['w_id']?>' <?=($_c['w_id'] == $member_info['w_id']) ? 'selected="selected"' : ''?>><?=$_c['company']?></option>
				                    <?php
			                    }
			                    ?>
							</select>
	                    <?php } ?>
                    </div>
                </nav>
            </div>
        </header>
        <!--//.header-->
        <script>
			/*
            $('#gnb .dep-1 > li > a').on('click', function() {
                $(this).closest('li').siblings().find('> a').next().slideUp(100);
                $(this).next().slideToggle(100);
            });

			 */
        </script>

        <div class="cf contents dboard-contents" style="postion: fixed; margin-top: 63%">
            <div class="cf cont-container-f">
                <div class="cont-list">
                    <div class="row-3 row-contents">
                        <!-- Revenue -->
                        <div class="row-cont cont-rvn">
							<p class="row-tit">
		                        <?=$sdate?> ~ <?=$edate?><br/>(입실예정 40 이상)
							</p>
							<div id="area1"></div>
						</div>
                        <!-- Notice -->
                    </div>
                </div>
                <!--//.cont-name-->
            </div>
        </div>

    </div>

	<div class="lds-mask" style="display: none">
		<div class="lds-wrapper">
			<div class="lds-container">
				<div class="lds-facebook">
					<div></div>
					<div></div>
					<div></div>
				</div>
				<div class="lds-text">
					Loading...
				</div>
			</div>
		</div>
	</div>
	<script>
		page.loading(1);
		$.ajax({
			type: 'post',
			url: 'data.php',
			success: function(r) {
				page.loading(2);
				$('#area1').html(r);
			}
		});
	</script>


</body>

</html>