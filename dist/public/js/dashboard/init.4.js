$(function() {
    // 현재 달 지정 (이전 0, 현재 1, 다음 2)
    var num = 1;
    /* 수익통계 함수실행 */
    rstChart(num);
});


/* 날짜&차트 */
function rstChart(num) {
    var chartDatePv = [102657, 2222, 33, 444, 5555, 66, 77777, 888, 999, 1000, 9195, 123854, 1322, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 285, 29, 30, 31],
        chartDateNow = [13432088, 2967386, 32237799, 4036075, 5442114, 66222, 755260, 85155, 95213, 1053352, 112345, 123854, 10322, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 285, 29, 30],
        chartDateNt = [0, 2, 3, 23, 0, 5, 7, 8, 99, 10, 10001, 12, 1322, 14, 1225, 146, 17, 178, 189, 2550, 21, 22, 23, 24, 25, 26, 27, 285, 29, 30, 311];
    
    var label = new Array(),
        chartDate = new Array();
    
    /* 날짜 */
    var date = new Date(),
        year = date.getFullYear(), // 년도
        month = date.getMonth(), // 월 - 1
        monthNum = month+Number(num), // 월
        week = ['일', '월', '화', '수', '목', '금', '토'], //주
        dateVal = new Date(year, monthNum, 0), 
        dayDate = dateVal.getDate(),
        legendMonth, xNum;
    
    // 차트 mm 월 형식
    if( String(monthNum).length < 2 ) {
        legendMonth = String("0")+String(monthNum);
    }
    var legend = year +'-'+legendMonth;

    //console.log(year, monthNum, dayDate);
    
    // 차트 x값 mm + 요일
    for( var i = 1 ; i <= dayDate ; i++ ){
        if( String(i).length < 2 ) {
            xNum = String("0")+String(i);
        }else {
            xNum = String(i);
        }
        label[i] = xNum+week[new Date(Number(year)+'-'+Number(monthNum)+'-'+Number(xNum)).getDay()];
    }
    
    //값
    if( num == 0 ) {
        chartDate = chartDatePv;
    }else if ( num == 2 ) {
        chartDate = chartDateNt;
    }else {
        chartDate = chartDateNow;
    }
    
    //chart
    var barChartData = {        
        labels: label,
        datasets: [{
            label: legend,
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
                }
            },
            tooltips: {
                callbacks: {
                    title: function() {},
                    label: function(tooltipItem, data) {
                        return data.datasets[tooltipItem.datasetIndex].label + '-' + String(tooltipItem.xLabel).toLocaleString() + ' : ' + Number(tooltipItem.yLabel).toLocaleString();
                    }
                }
            }
        }  
    };
    
    var ctx = $('#chart-rst').get(0).getContext('2d'); 
    
    var myLineChart = Chart.Bar(ctx, options);	
    
    
    $('.cont-rst .btn-gray').on('click', function(){
        myLineChart.destroy();
        if( $(this).hasClass('prev') ){
            rstChart(0);
        }else if( $(this).hasClass('next') ) {
            rstChart(2);
        }else {
            rstChart(1);
        }
        /* myLineChart.reset(); */	
    });
}














