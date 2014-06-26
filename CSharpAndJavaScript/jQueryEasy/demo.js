
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
                    min: 0,
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
            GetBrowserMatrixByDepName(depName);
        });
    }


});

$(function () {
    $.get("Data.ashx",
    {
        type: "GetBrowserMatrix",
        depName: "Flight"
    },
    function (result) {
        var chromeData = result.split('%')[0].split(',');
        var SafariData = result.split('%')[1].split(',');
        var AndroidData = result.split('%')[2].split(',');

        var seriesChrome = new Array();
        var seriesSafari = new Array();
        var seriesAndroid = new Array();

        $.each(chromeData, function (item) {
            seriesChrome.push(parseInt(chromeData[item]));
        });
        $.each(SafariData, function (item) {
            seriesSafari.push(parseInt(SafariData[item]));
        });
        $.each(AndroidData, function (item) {
            seriesAndroid.push(parseInt(AndroidData[item]));
        });

        var colors = Highcharts.getOptions().colors, categories = ['Chrome', 'Safari', 'Android'],
        name = 'Browser brands',
        data = [{
            y: seriesChrome[0],
            color: colors[2],
            drilldown: {
                name: 'Chrome versions',
                categories: ['10.0', '11.0', '12.0'],
                data: [seriesChrome[1], seriesChrome[2], seriesChrome[3]],
                color: colors[2]
            }
        }, {
            y: seriesSafari[0],
            color: colors[3],
            drilldown: {
                name: 'Safari versions',
                categories: ['5.0', '4.0', '4.1'],
                data: [seriesSafari[1], seriesSafari[2], seriesSafari[3]],
                color: colors[3]
            }
        }, {
            y: seriesAndroid[0],
            color: colors[4],
            drilldown: {
                name: 'Android Browser versions',
                categories: ['4.2', '4.4','4.5'],
                data: [seriesAndroid[1], seriesAndroid[2], seriesAndroid[3]],
                color: colors[4]
            }
        }];
        var browserData = [];
        var versionsData = [];
        for (var i = 0; i < data.length; i++) {

            // add browser data
            browserData.push({
                name: categories[i],
                y: data[i].y,
                color: data[i].color
            });

            // add version data
            for (var j = 0; j < data[i].drilldown.data.length; j++) {
                var brightness = 0.2 - (j / data[i].drilldown.data.length) / 5;
                versionsData.push({
                    name: data[i].drilldown.categories[j],
                    y: data[i].drilldown.data[j],
                    color: Highcharts.Color(data[i].color).brighten(brightness).get()
                });
            }
        }

        // Create the Pie chart
        $('#container1').highcharts({
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Browser Matrix'
            },
            yAxis: {
                title: {
                    text: 'Total percent market share'
                }
            },
            plotOptions: {
                pie: {
                    shadow: false,
                    center: ['50%', '50%']
                }
            },
            tooltip: {
                valueSuffix: '%'
            },
            series: [{
                name: 'Browsers',
                data: browserData,
                size: '60%',
                dataLabels: {
                    formatter: function () {
                        return this.y > 5 ? this.point.name : null;
                    },
                    color: 'white',
                    distance: -45
                }
            }, {
                name: 'Versions',
                data: versionsData,
                size: '80%',
                innerSize: '60%',
                dataLabels: {
                    formatter: function () {
                        // display only if larger than 1
                        return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%' : null;
                    }
                }
            }]
        });
    });
});


function GetDataByDepName(depName) {

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

            chart.addSeries({ name: 'PC', data: seriesPC }, false);
            chart.addSeries({ name: 'Android', data: seriesAndroid }, false);
            chart.addSeries({ name: 'iOS', data: seriesiOS }, false);
            chart.redraw();
          


        });
}
function GetBrowserMatrixByDepName(depName)
{
    $.get("Data.ashx",
    {
        type: "GetBrowserMatrix",
        depName: "Flight"
    },
    function (result) {

        var chromeData = result.split('%')[0].split(',');
        var SafariData = result.split('%')[1].split(',');
        var AndroidData = result.split('%')[2].split(',');

        var seriesChrome = new Array();
        var seriesSafari = new Array();
        var seriesAndroid = new Array();

        $.each(chromeData, function (item) {
            seriesChrome.push(parseInt(chromeData[item]));
        });
        $.each(SafariData, function (item) {
            seriesSafari.push(parseInt(SafariData[item]));
        });
        $.each(AndroidData, function (item) {
            seriesAndroid.push(parseInt(AndroidData[item]));
        });

        var chart = $('#container1').highcharts();
        var series = chart.series;
        while (series.length > 0) {
            series[0].remove(false);
        }
        var colors = Highcharts.getOptions().colors;
        categories = ['Chrome', 'Safari', 'Android'],
        data = [{
            y: seriesChrome[0],
            color: colors[2],
            drilldown: {
                name: 'Chrome versions',
                categories: ['10.0', '11.0', '12.0'],
                data: [seriesChrome[1], seriesChrome[2], seriesChrome[3]],
                color: colors[2]
            }
        }, {
            y: seriesSafari[0],
            color: colors[3],
            drilldown: {
                name: 'Safari versions',
                categories: ['5.0', '4.0', '4.1'],
                data: [seriesSafari[1], seriesSafari[2], seriesSafari[3]],
                color: colors[3]
            }
        }, {
            y: seriesAndroid[0],
            color: colors[4],
            drilldown: {
                name: 'Android Browser versions',
                categories: ['4.2', '4.4', '4.5'],
                data: [seriesAndroid[1], seriesAndroid[2], seriesAndroid[3]],
                color: colors[4]
            }
        }];


        var browserData = [];
        var versionsData = [];
        for (var i = 0; i < data.length; i++) {

            // add browser data
            browserData.push({
                name: categories[i],
                y: data[i].y,
                color: data[i].color
            });

            // add version data
            for (var j = 0; j < data[i].drilldown.data.length; j++) {
                var brightness = 0.2 - (j / data[i].drilldown.data.length) / 5;
                versionsData.push({
                    name: data[i].drilldown.categories[j],
                    y: data[i].drilldown.data[j],
                    color: Highcharts.Color(data[i].color).brighten(brightness).get()
                });
            }
        }

        chart.addSeries({
            name: 'Browsers',
            data: browserData,
            size: '60%',
            dataLabels: {
                formatter: function () {
                    return this.y > 5 ? this.point.name : null;
                },
            color: 'white',
            distance: -30
            }
        }, false);
        chart.addSeries({
            name: 'Versions',
            data: versionsData,
            size: '80%',
            innerSize: '60%',
            dataLabels: {
                formatter: function () {
                    return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%' : null;
                }
            }
        }, false);
        chart.redraw();
    });
}
