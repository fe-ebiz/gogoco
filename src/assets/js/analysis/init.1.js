//대시보드 전역변수 설정
var rstChartBar, rstChartAChartBar, ostChartBar, dbLegend;
var dbLabel = new Array();

$(function() {
    //변수 선언
    var num = 1; // 현재 달 지정 (이전 0, 현재 1, 다음 2)
    var ostBtnTxt = $('.cont-ost .btn-box .btn-gray.nation').text();//점유율 통계 범례 기본값 '국적'
    
    /* 함수실행 */
    yearCal();
    overLastYearChart();
    rstChart(num); //수익 통계 차트
    //ostChart(num, ostBtnTxt); //점유율 통계 차트
    ostChart(ostBtnTxt);
    
    /* 수익통 계 버튼 */
    $('.cont-rst .btn-gray').on('click', function(){
        //상세차트가 on되어있을 경우 
        if( $('.chart-rst').hasClass('on') ){
            $('.chart-rst').removeClass('on');
            rstChartAChartBar.destroy();
        }
        rstChartBar.destroy();
        ostChartBar.destroy();
        ostChart(ostBtnTxt);
        if( $(this).hasClass('prev') ){ //이전 달
            //$(this).addClass('on');
            rstChart(0);
        }else if( $(this).hasClass('next') ) { //다음 달
            rstChart(2);
        }else { //이번 달
            rstChart(1);
        }
    });
    
    /* 점유율 통계 버튼 */
    $('.cont-ost .btn-gray').on('click', function(){
        var ostTxt = $(this).text();
        ostChartBar.destroy();
        ostChart(ostTxt);
    });
    
    /* 수익 통계 차트 클릭 시 */
    $('#chart-rst').on('click', function(evt){
        $('.chart-rst').addClass('on'); //달버튼 클릭시 차트 제거를 위해
        
        var activePoint = rstChartBar.getElementAtEvent(event);
        
        if( activePoint.length > 0 ) {
            var clickedElementindex = activePoint[0]._index;
            var label = rstChartBar.data.labels[clickedElementindex];
            //console.log(label);
            
            rstChartBar.destroy();
            rstChartAChart(label);
            
            /*if( clickedElementindex == 0 ){
                //console.log('selected day')
            }else{
                //console.log('other day')
            }*/
        }
    });
});

/*
 * 전년도 매출현황
 */

/* 달력 - 년도별 */
function yearCal(){
    $('input.type-year').datepicker({
        minViewMode: 'years',
        format: 'yyyy',
        //todayBtn: true,
        autoclose: true
    });
}

/* 테이블 & 차트 */
function overLastYearChart() {
    var year = ['2018', '2019'],
        label = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        dataPv = [71571690, 54442025, 49900652, 82223360, 82223360, 82223360, 82223360, 82223360, 82223360, 82223360, 82223360, 82223360, 82223360, 143815040],
        dataNt = [141061577, 133769949, 121899293, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    
    var chart = $('#chart'),
        tblHd = $('.grid-tbl-container .grid-head .grid-tbl .rowgroup'),
        tblConArea = $('.grid-tbl-container .grid-contents'),
        tblCon = tblConArea.find('.grid-tbl .rowgroup');
    
    // thead
    var hdHtml = "";
    hdHtml += "<tr>";
    hdHtml += '<th><div class="cell">월</div></th>';
    for ( var y=0 ; y < year.length ; y++ ) {
        hdHtml += '<th><div class="cell">' + year[y] + '</div></th>';
    }
    hdHtml += "</tr>";
    tblHd.append(hdHtml);
    
    // tbody
    for( var i = 0 ; i < label.length ; i++ ){
        tblCon.append('<tr><td><div class="cell">' + label[i] + '</div></td><td><div class="cell">' + Number(dataPv[i]).toLocaleString() + '</div></td><td><div class="cell">' + Number(dataNt[i]).toLocaleString() + '</div></td></tr>');
    }

    //table scoll y
    if( tblConArea.height() < tblCon.height() ) {
        $('.grid-tbl-container .grid-area').css({'border-right-width' : 1+'px'});
        tblHd.parents('.grid-scrollable').css({'padding-right' : 17+'px'});
    }
    
    //chart data
    var barChartData = {        
        labels: label,
        datasets: [{
            label: year[0],
            backgroundColor: '#8ebc00',
            data: dataPv
        }, {
            label: year[1],
            backgroundColor: '#309b46',
            data: dataNt
        }]
    };
    
    window.onload = function() {
        //chart
        var ctx = chart.get(0).getContext('2d'); 
        
        window.theChart = new Chart(ctx, {
             type: 'bar',
             data: barChartData,
             options: {
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{ 
                        gridLines: {
                            color: '#c7c7c7'
                        },
                        categoryPercentage: 0.7,
                        barThickness: 30
                    }],
                    yAxes: [{ 
                        gridLines: {
                            color: '#c7c7c7'
                        },
                        ticks: {
                            beginAtZero: true,
                            fontColor: '#999',
                            callback: function(value, index, values) {
                                value = value.toString();
                                if( value.length < 4 ) {}
                                else {
                                    value = value.substring(0 , value.length-3); // 뒤에서 000 세개 제거
                                }
                                value = value.split(/(?=(?:...)*$)/);
                                value = value.join(',');
                                value = value.concat(' 천원');
                                return value;
                            }
                        }
                    }]
                },
                legend: { 
                    position: 'top',
                    labels: {
                        boxWidth: 25,
                        fontSize: 13,
                    }
                },
                tooltips: {
                    callbacks: {
                        title: function() {},
                        label: function(tooltipItem, data) {
                            return data.datasets[tooltipItem.datasetIndex].label + ' : ' + Number(tooltipItem.yLabel).toLocaleString();
                        }
                    }
                }
            }  
    
        });
    }
}

/*
 * 대시보드
 */
/* 날짜 */
function calendarFn(num){
    var date = new Date(),
        year = date.getFullYear(), //년도
        month = date.getMonth(), //월-1
        monthNum = month+Number(num), // 월
        week = ['일', '월', '화', '수', '목', '금', '토'], //주
        dateVal = new Date(year, monthNum, 0), 
        dayDate = dateVal.getDate(),
        legendMonth, xNum;
    
    // 차트 mm 월 형식
    if( String(monthNum).length < 2 ) {
        legendMonth = String("0")+String(monthNum);
    }
        
    dbLegend = year +'-'+legendMonth;

    //console.log(year, monthNum, dayDate);
    
    // 차트 x값 mm + 요일
    for( var i = 0 ; i < dayDate ; i++ ){
        if( String(i+1).length < 2 ) {
            xNum = String("0")+String(i+1);
        }else {
            xNum = String(i+1);
        }
        dbLabel[i] = xNum+week[new Date(Number(year)+'-'+Number(monthNum)+'-'+Number(xNum)).getDay()];
    }
}

/* 수익 통계 차트 */
function rstChart(num) {
    var chartDatePv = [102657, 2222, 33, 444, 5555, 66, 77777, 888, 999, 1000, 9195, 123854, 1322, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 285, 29, 30, 31],
        chartDateNow = [13432088, 2967386, 32237799, 4036075, 5442114, 66222, 755260, 85155, 95213, 1053352, 112345, 123854, 10322, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 285, 29, 30],
        chartDateNt = [0, 2, 3, 23, 0, 5, 7, 8, 99, 10, 10001, 12, 1322, 14, 1225, 146, 17, 178, 189, 2550, 21, 22, 23, 24, 25, 26, 27, 285, 29, 30, 311];
    
    var chartDate = new Array();
    
    //날짜함수
    calendarFn(num);
    
    //값
    switch (num) {
        case 0 :
            chartDate = chartDatePv;
            break;
        case 2 :
            chartDate = chartDateNt;
            break;
        default :
            chartDate = chartDateNow;
            break;    
    }
    /*if( num == 0 ) {
        chartDate = chartDatePv;
    }else if ( num == 2 ) {
        chartDate = chartDateNt;
    }else {
        chartDate = chartDateNow;
    }*/
    
    //chart
    var barChartData = {        
        labels: dbLabel,
        datasets: [{
            label: dbLegend,
            backgroundColor: '#8ebc00',
            data: chartDate
        }]
    };
    
    //차트 옵션
    var options  = {
        type: 'bar',
        data: barChartData,
        options: {
            maintainAspectRatio: false,
            scales: {
                xAxes: [{ 
                    display: true,
                    gridLines: {
                        color: '#c7c7c7'
                    },
                    ticks: {
                        fontStyle: 'normal'
                    },
                    categoryPercentage: 0.7,
                    barThickness: 11
                }],
                yAxes: [{ 
                    gridLines: {
                        color: '#c7c7c7'
                    },
                    ticks: {
                        beginAtZero: true,
                        fontColor: '#999',
                        callback: function(value, index, values) {
                            value = value.toString();
                            if( value.length < 4 ) {}
                            else {
                                value = value.substring(0 , value.length-3);
                            }
                            value = value.split(/(?=(?:...)*$)/);
                            value = value.join(',');
                            value = value.concat(' 천원');
                            return value;
                        }
                    }
                }]
            },
            legend: { 
                labels: {
                    boxWidth: 0,
                    fontSize: 17 
                },
                onClick: function(e){
                    e.stopPropagation();
                }
            },
            tooltips: {
                callbacks: {
                    title: function() {},
                    label: function(tooltipItem, data) {
                        return data.datasets[tooltipItem.datasetIndex].label + '-' + String(tooltipItem.xLabel).toLocaleString() + ' : ' + Number(tooltipItem.yLabel).toLocaleString();
                    }
                }
            },
            /*onClick: function(){
                console.log('click')
            }*/
        }  
    };
    
    var ctx = $('#chart-rst').get(0).getContext('2d'); 
    
    rstChartBar = new Chart(ctx, options);	
    
}

/* 수익 통계 차트 클릭 시 나타나는 차트 */
function rstChartAChart(cacLgd) {
    var label = ['지솔루션/기아차 협력', '육군본부', '윈덤', '호텔나우', '다이렉트', '아고다', '위메프', '인터파크', '주식회사 보아기연', '익스피디아'],
        chartDate = [627270, 454550, 351250, 297223, 255454, 192082, 106961, 94910, 75455, 64600];
    
    //chart
    var barChartData = {        
        labels: label,
        datasets: [{
            label: cacLgd,
            backgroundColor: '#007bc3',
            data: chartDate
        }]
    };
    
    //차트 옵션
    var options  = {
        type: 'horizontalBar',
        data: barChartData,
        options: {
            maintainAspectRatio: false,
            scales: {
                xAxes: [{ 
                    display: true,
                    gridLines: {
                        color: '#c7c7c7'
                    },
                    ticks: {
                        fontStyle: 'normal',
                        callback: function(value, index, values) {
                            value = value.toString();
                            if( value.length < 4 ) {}
                            else {
                                value = value.substring(0 , value.length-3);
                            }
                            value = value.split(/(?=(?:...)*$)/);
                            value = value.join(',');
                            value = value.concat(' 천원');
                            return value;
                        }
                    },
                    categoryPercentage: 0.7,
                }],
                yAxes: [{ 
                    gridLines: {
                        color: '#c7c7c7'
                    },
                    ticks: {
                        beginAtZero: true,
                        fontColor: '#999'
                    },
                    barThickness: 13
                }]
            },
            legend: { 
                labels: {
                    boxWidth: 0,
                    fontSize: 17 
                },
                onClick: function(e){
                    e.stopPropagation();
                }
            },
            tooltips: {
                callbacks: {
                    title: function() {},
                    label: function(tooltipItem, data) {
                        return String(tooltipItem.yLabel).toLocaleString() + ' : ' + Number(tooltipItem.xLabel).toLocaleString();
                    }
                }
            },
        }  
    };
    
    var ctx = $('#chart-rst').get(0).getContext('2d'); 
    
    rstChartAChartBar = new Chart(ctx, options);	
     
}

/* 점유율 통계 차트 - ALL */
function ostChart(ostBtnTxt) {
        //국적
    var natLabel = ['NONE', '한국', '일본'],
        natDate = [94, 5.2, 0.8],
        //계정
        accLabel = ['지솔루션/기아차 협력', '윈덤', '고코투어(가자닷컴)', '다이렉트', '창평고', '호텔나우', '광주수피아여자중학교', '아고다', '호텔타임', '주식회사 보아기연'],
        accDate = [21.8, 15.8, 9.5, 9.1, 8.3, 5.9, 5.6, 5.2, 3.1, 2.5],
        //시장
        mkLabel = ['온라인 여행사', 'DIRECTG', 'DIRECTF', 'CORFIT'],
        mkDate = [46, 43, 9.1, 1.9],
        //출처
        socLabel = ['핸드폰', '이메일', '기타', '팩스', '홈페이지', '방문'],
        socDate = [33.5, 29.4, 13.6, 12.3, 6.7, 4.4];
    
    var ostLabel = new Array(),
        ostDate = new Array();
    
    //값
    switch (ostBtnTxt) {
        case '계정' :
            ostLabel = accLabel;
            ostDate = accDate;
            break;
        case '시장' :
            ostLabel = mkLabel;
            ostDate = mkDate;
            break;
        case '출처' :
            ostLabel = socLabel;
            ostDate = socDate;
            break;
        default :
            ostLabel = natLabel;
            ostDate = natDate;
            break;
    }
    
    
    //chart
    var barChartData = {        
        labels: ostLabel,
        datasets: [{
            label: ostBtnTxt,
            backgroundColor: '#ff8632',
            data: ostDate
        }]
    };
     
    //차트 옵션
    var options  = {
        type: 'horizontalBar',
        data: barChartData,
        options: {
            maintainAspectRatio: false,
            scales: {
                xAxes: [{ 
                    display: true,
                    gridLines: {
                        color: '#c7c7c7'
                    },
                    ticks: {
                        fontStyle: 'normal'
                    },
                    categoryPercentage: 0.7,
                }],
                yAxes: [{ 
                    gridLines: {
                        color: '#c7c7c7'
                    },
                    ticks: {
                        beginAtZero: true
                    },
                    minBarLength: 11,
                    maxBarThickness: 131
                }]
            },
            legend: { 
                labels: {
                    boxWidth: 0,
                    fontSize: 17 
                },
                onClick: function(e){
                    e.stopPropagation();
                }
            },
            tooltips: {
                callbacks: {
                    title: function() {},
                    label: function(tooltipItem, data) {
                        return String(tooltipItem.yLabel).toLocaleString() + ' - ' + Number(tooltipItem.xLabel).toLocaleString();
                    }
                }
            },
        }  
    };
    
    var ctx = $('#chart-ost').get(0).getContext('2d'); 
    
    ostChartBar = new Chart(ctx, options);
}