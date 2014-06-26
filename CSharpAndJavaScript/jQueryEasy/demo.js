$(function () {

    $.get("Data.ashx",
        { 
            type: "CaseTrend",
            depName: "Flight",
        },
        function (result) {
        
        var pcData = result.split('%')[0].split(',');
        var androidData = result.split('%')[1].split(',');
        var iOSData = result.split('%')[2].split(',');
        
        var seriesPC = new Array();
        var seriesAndroid = new Array();
        var seriesiOS = new Array();
        
        $.each(androidData, function (item) {
            seriesAndroid.push(parseInt(androidData[item]));
        });
        $.each(pcData, function (item) {
            seriesPC.push(parseInt(pcData[item]));
        });
        $.each(iOSData, function (item) {
            seriesiOS.push(parseInt(iOSData[item]));
        });


        $('#container').highcharts({
            
            title: {
                text: 'Case Trend (Current Month)',

                x: -20 //center
            },
            subtitle: {
                text: '',
                x: -20
            },
            xAxis: {
                categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15',
                 '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
            },
            yAxis: {
                min:0,
                title: {
                    text: 'Number of times'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: ' times'
            },
            
            series: [{ name: 'PC', data: seriesPC }, { name: 'Android', data: seriesAndroid }, { name: 'iOS', data: seriesiOS }]
        });

    });

    // Tabs Update
    var tabs = $('#tt').tabs().tabs('tabs');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].panel('options').tab.unbind().bind('mouseenter', { index: i }, function (e) {
            $('#tt').tabs('select', e.data.index);
            var depName = e.currentTarget.innerText;
            GetDataByDepName(depName);
        });
    }
});


function GetDataByDepName(depName)
{
    
    $.get("Data.ashx",
        {
            type: "CaseTrend",
            depName: depName,
        },
        function (result) {

        var pcData = result.split('%')[0].split(',');
        var androidData = result.split('%')[1].split(',');
        var iOSData = result.split('%')[2].split(',');

        var seriesPC = new Array();
        var seriesAndroid = new Array();
        var seriesiOS = new Array();

        $.each(androidData, function (item) {
            seriesAndroid.push(parseInt(androidData[item]));
        });
        $.each(pcData, function (item) {
            seriesPC.push(parseInt(pcData[item]));
        });
        $.each(iOSData, function (item) {
            seriesiOS.push(parseInt(iOSData[item]));
        });


        var chart = $('#container').highcharts();
        var series = chart.series;
        while (series.length > 0) {
            series[0].remove(false);
        }
       
       
       
        chart.addSeries({ name: 'PC', data: seriesPC },false);
        chart.addSeries({ name: 'Android', data: seriesAndroid },false);
        chart.addSeries({ name: 'iOS', data: seriesiOS },false);
        chart.redraw();
       

    });
}