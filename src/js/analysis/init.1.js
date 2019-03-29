$(function() {

    overLastYearChart();    

});

function overLastYearChart() {
    var year = ['2018', '2019'],
        label = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        dataPv = [71571690, 54442025, 49900652, 82223360, 82223360, 82223360, 82223360, 82223360, 82223360, 82223360, 82223360, 82223360, 82223360, 143815040],
        dataNt = [141061577, 133769949, 121899293, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    
    var chart = $('#chart'),
        tblHd = $('.grid-tbl-container .grid-head .grid-tbl .rowgroup'),
        tblCon = $('.grid-tbl-container .grid-contents .grid-tbl .rowgroup');
    
    //table
    //년도 추가
    // for( var y = 0 ; y < year.length ; y++ ){
    //     tblHd.find('th:eq('+(y+1)+') .cell').text(year[y]);
    // }
    // //table contents 태그생성
    // var td = '<td><div class="cell"></div></td>';
    // for( var i = 0 ; i < label.length ; i++ ){
    //     tblCon.append('<tr>'+ td + td + td +'</tr>');
    // }
    // //금액 추가
    // for( var j = 0 ; j < label.length ; j++ ){
    //     tblCon.find('tr:eq('+j+')').find('td:eq(0) .cell').text(label[j]).end().find('td:eq(1) .cell').text(dataPv[j]).end().find('td:eq(2) .cell').text(dataNt[j]);
    // }
    
    // thead
    var hdHtml = "";
    hdHtml += "<tr>";
    hdHtml += '<th><div class="cell">월</div></th>';
    for ( var y=0 ; y < year.length ; y++ ) {
        hdHtml += '<th><div class="cell">' + year[y] + '</div></th>';
    }
    hdHtml += "/<tr>";
    tblHd.append(hdHtml);
    
    // tbody
    for( var i = 0 ; i < label.length ; i++ ){
        tblCon.append('<tr><td><div class="cell">' + label[i] + '</div></td><td><div class="cell">' + Number(dataPv[i]).toLocaleString() + '</div></td><td><div class="cell">' + Number(dataNt[i]).toLocaleString() + '</div></td></tr>');
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