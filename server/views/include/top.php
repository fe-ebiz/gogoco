<?php
require (__DIR__.'/../../load.php');
?>
<!DOCTYPE html>
<!--[if IE 8]><html lang='ko-KR' class='no-js ie8 lt-ie10'><![endif]-->
<!--[if IE 9]><html lang='ko-KR' class='no-js ie9 lt-ie10'><![endif]-->
<!--[if !IE]><!-->
<html lang='ko-KR'>
<!--<![endif]-->

<head>
<meta http-equiv='X-UA-Compatible' content='IE=Edge'>
<meta charset='UTF-8'>
<meta name='description' content='description'>
<meta name='keywords' content='keywords'>
<meta name='author' content='author'>
<meta name='viewport' content='width=device-width, initial-scale=1'>
<title>Management-Go</title>

<meta property='og:locale' content='ko_KR'>
<meta property='og:type' content='website'>
<meta property='og:title' content=''>
<meta property='og:image' content=''>
<meta property='og:description' content=''>
<meta property='og:url' content=''>
<meta property='og:site_name' content=''>
<meta name='twitter:title' content=''>
<meta name='twitter:card' content='summary'>
<meta name='twitter:image' content=''>
<meta name='twitter:description' content=''>
<!--<link rel='canonical' href='도메인'>-->
<link rel='shortcut icon' href='../../../public/img/go/go.ico' />
<!--폰트-->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
<link rel="stylesheet" href="../../public/fonts/nanumgothic/nanumgothic.css">
<link rel="stylesheet" href="../../public/fonts/notosanskr/notosanskr.css">

<!--공통 Css-->
<!--	<link rel='stylesheet' href='//static.go.co.kr/css/go/reset.css' type='text/css'>-->
<!--	<link rel='stylesheet' href='//static.go.co.kr/css/go/layout.css' type='text/css'>-->
<link rel='stylesheet' href='../../public/css/reset.css'>

<!--<link rel='stylesheet' href='//code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css'>-->
<link rel='stylesheet' href='../../public/css/jquery-ui-1.12.1.min.css'>

<!--개별 Css-->
<link rel='stylesheet' href='../../public/css/common.css?v=<?=microtime()?>'>
<link rel='stylesheet' href='../../public/css/winpop/winpop.css?v=<?=microtime()?>'>
<link rel='stylesheet' href='../../public/css/include/pop.css?v=<?=microtime()?>'>
<link rel='stylesheet' href='../../public/css/<?=$page?>/init.css?v=<?=microtime()?>'>

<script src='../../public/js/jquery-1.12.4.min.js'></script>
<script src='../../public/js/jquery-ui-1.12.1.min.js'></script>

<!--개별 Js-->
<script src='../../public/js/common.js?v=<?=microtime()?>'></script>
<script src='../../public/js/<?=$page?>/init.js?v=<?=microtime()?>'></script>

<!--[if lt IE 9]>
	<script type='text/javascript' src='//oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js'></script>
<![endif]-->
</head>
<body class='page-<?=$page?>'>
<div class='wrapper'>
	<header class='header'>
		<div class='group cont-header'>
			<h1 class='logo'>
				<a href='/' class='logo-a'>
					<img src='../../public/img/common/logo_mng.png' alt='고코투어 CMS' class='logo-img'>
				</a>
			</h1>
			<nav class='cf gnb' id="gnb">
				<div class="btn-box">
					<button type="button" class="btn-menupop category-all">
						<span class="bar"></span>
						<span class="bar"></span>
						<span class="bar"></span>
					</button>
				</div>
				<?php include_once (INC_DIR.'web-home/_new/views/include/smenu.php'); ?>
			</nav>
			<nav class='user-bar'>
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
				<span class='user'><?=$manager?>님 <i class='fa fa-user-circle'></i></span>
				<ul class='menu cf'>
					<li class='item item-1'><a href='/'><i class="icon-menu ic-home"></i> <span class='hidden'>홈</span></a>
					</li>
					<li class='item item-2'><a href='http://www.go.co.kr/home/view/?p_no=<?=XOREncode($member_info['no'])?>' target='_blank'><i class="icon-menu ic-explore"></i> <span class='hidden'>바로가기</span></a>
					</li>
					<li class='item item-2'><a href='../member/logout.php'><i class="icon-menu ic-out"></i> <span class='hidden'>로그아웃</span></a>
					</li>
                    <!--li class='item item-2'><a href='../member/logout.php?t=<?=$target_url?>'><i class="icon-menu ic-out"></i> <span class='hidden'>로그아웃</span></a>
                    </li-->
					<li class='item item-1'><a onclick='page.layer("add", "adm", "<?=$employ['userid']?>")'><i class="icon-menu ic-gear"></i> <span class='hidden'>정보수정</span></a></li>
				</ul>
				<div class='site-info'>
					<?php if($employ['grade'] == 1 && (!empty($auth))) { ?>			
					<select class='slt-site' onchange='page.move(this.value)'>
					<?php
					$_a = 'select * from n_product where own="Y"';
					$_b = mysql_query($_a, $dbconn);
					while($_c = mysql_fetch_assoc($_b)) { ?> 
					<option value='<?=$_c['w_id']?>' <?=($_c['w_id'] == $member_info['w_id']) ? 'selected="selected"' : ''?>><?=$_c['company']?></option>
					<?php
					}
					echo $is_add;
					?>			
					</select>
					<?php } ?>
				</div>
			</nav>
		</div>
	</header>

	<aside class='sidebar left'>
		<h2 class='hidden'>사이드 네비게이션</h2>
		<div class='lnb' id='favorites'>
			<?php
			$length = is_array($bookmark) ? sizeof($bookmark) : 0;

			if($length < 9) {
			?>			
			<a class='btna quick-plus' onclick='page.favorites(1, $("h2.skip").text(), "<?=$_SERVER['REQUEST_URI']?>")'><img src='../../public/img/icon/quick/quickMenuPlus.png' alt='즐겨찾기 메뉴 추가'></a>
			<?php
			}
			if($length < 1) {
				echo '<a class="btna quick-none"><img src="../../public/img/icon/quick/split.png" alt="즐겨찾기 메뉴 없음"></a>';
			} else {
				echo '<ul class="menu cf">';

				for($i = 0; $i < sizeof($bookmark); $i++)
				{
					$_page	= $_SERVER['REQUEST_URI'];
					$_class	= ($_page == $bookmark[$i]['path']) ? ' on' : '';
					$_img	= explode('/', $bookmark[$i]['path']);

					
					echo '	<li class="item'.$_class.'">';
					echo '		<a href="'.$bookmark[$i]['path'].'">';
					echo '			<img src="../../public/img/icon/quick/'.$_img[3].'.png" alt="프론트">';
					echo '			<span class="lbl">'.$bookmark[$i]['name'].'</span>';
					echo '		</a>';
					echo '	</li>';					
				}

				echo '</ul>';
			}
			?>
			<!-- /.menu -->		

			<div class='qm-pop'>
				<ul class='qm-list'>
					<li ref='deleteOne'><img src='../../public/img/icon/doc.png' alt='DOC'> 삭제</li>
					<li class='division'></li>
					<li ref='deleteAll'><img src='../../public/img/icon/doc.png' alt='DOC'> 전부 삭제</li>
				</ul>
			</div>
		</div>
	</aside>
	<!-- /.slidebar.left -->

	<?php include_once (INC_DIR.'web-home/_new/views/include/allmenu.php'); ?>