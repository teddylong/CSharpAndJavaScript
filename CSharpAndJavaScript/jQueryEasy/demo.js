$(function () {
    GetDataByDepName("Flight");
    GetBrowserMatrixByDepName("Flight");
    GetPlatformByDepName("Flight");
    GetAppByDepName("Flight");

    // Tabs Update
    var tabs = $('#tt').tabs().tabs('tabs');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].panel('options').tab.unbind().bind('mouseenter', { index: i }, function (e) {
            $('#tt').tabs('select', e.data.index);
            var depName = e.currentTarget.innerText;
            GetDataByDepName(depName);
            GetBrowserMatrixByDepName(depName);
            GetPlatformByDepName(depName);
            GetAppByDepName(depName);
            $('#dg').datagrid('reload');
        });
    }



    $('#timePicker').datebox('setValue', GetDateStr(0));
   

    
    var dg = $('#dg').datagrid();
    dg.datagrid('enableFilter', [
        {
            field: 'success',
            type: 'numberbox',
            options: { precision: 0 },
            op: ['equal', 'notequal', 'less', 'greater']
        },
        {
            field: 'fail',
            type: 'numberbox',
            options: { precision: 0 },
            op: ['equal', 'notequal', 'less', 'greater']
        },
        {
            field: 'caseid',
            type: 'numberbox',
            options: { precision: 0 },
            op: ['equal', 'notequal', 'less', 'greater']
        },
        {
            field: 'result',
            type: 'combobox',
            options: {
                panelHeight: 'auto',
                data: [{ value: '', text: 'ALL'}, { value: 'Pass', text: 'Pass' }, { value: 'Fail', text: 'Fail' }, { value: 'Warn', text: 'Warn' }],
                onChange: function (value) {
                    if (value == '') {
                        dg.datagrid('removeFilterRule', 'result');
                    } else {
                        dg.datagrid('addFilterRule', {
                            field: 'result',
                            op: 'equal',
                            value: value
                        });
                    }
                    dg.datagrid('doFilter');
                }
            }
        }
    ]);
    //dg.datagrid('doFilter');

    //$('#dg').datagrid({ loadFilter: pagerFilter }).datagrid('loadData');
});

function GetDataByDepName(depName) {
    $.get("Data.ashx",
            {
                type: "CaseTrend",
                depName: depName
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
                            text: 'Case Count'
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
}
function GetBrowserMatrixByDepName(depName)
{
    $.get("Data.ashx",
     {
         type: "GetBrowserMatrix",
         depName: depName
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
}
function GetPlatformByDepName(depName)
{
    $.get("Data.ashx",
     {
         type: "GetPlatform",
         depName: depName
     },
     function (result) {
         var platformPCData = result.split('%')[0].split(',');
         var platformAndroidData = result.split('%')[1].split(',');
         var platformiOSData = result.split('%')[2].split(',');

         var seriesPlatformPC = new Array();
         var seriesPlatformAndroid = new Array();
         var seriesPlatformiOS = new Array();

         $.each(platformPCData, function (item) {
             seriesPlatformPC.push(parseInt(platformPCData[item]));
         });
         $.each(platformAndroidData, function (item) {
             seriesPlatformAndroid.push(parseInt(platformAndroidData[item]));
         });
         $.each(platformiOSData, function (item) {
             seriesPlatformiOS.push(parseInt(platformiOSData[item]));
         });

         var colors = Highcharts.getOptions().colors, categories = ['PC', 'Android','iOS'],
         name = 'Platform brands',
         data = [{
             y: seriesPlatformPC[0],
             color: colors[0],
             drilldown: {
                 name: 'PC versions',
                 categories: ['Win-7', 'XP', 'Win-Server'],
                 data: [seriesPlatformPC[1], seriesPlatformPC[2], seriesPlatformPC[3]],
                 color: colors[1]
             }
         }, {
             y: seriesPlatformAndroid[0],
             color: colors[2],
             drilldown: {
                 name: 'Android versions',
                 categories: ['4.2', '4.0', '4.1'],
                 data: [seriesPlatformAndroid[1], seriesPlatformAndroid[2], seriesPlatformAndroid[3]],
                 color: colors[3]
             }
         }, {
             y: seriesPlatformiOS[0],
             color: colors[4],
             drilldown: {
                 name: 'iOS versions',
                 categories: ['7.0', '6.1', '6.0'],
                 data: [seriesPlatformiOS[1], seriesPlatformiOS[2], seriesPlatformiOS[3]],
                 color: colors[5]
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
         $('#container2').highcharts({
             chart: {
                 type: 'pie'
             },
             title: {
                 text: 'Platform Matrix'
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
                 name: 'Platform',
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
}
function GetAppByDepName(depName)
{
    $.get("Data.ashx",
    {
        type: "GetApp",
        depName: depName
    },
    function (result) {
        var platformAndroidData = result.split('%')[0].split(',');
        var platformiOSData = result.split('%')[1].split(',');

        var seriesPlatformAndroid = new Array();
        var seriesPlatformiOS = new Array();


        $.each(platformAndroidData, function (item) {
            seriesPlatformAndroid.push(parseInt(platformAndroidData[item]));
        });
        $.each(platformiOSData, function (item) {
            seriesPlatformiOS.push(parseInt(platformiOSData[item]));
        });


        var colors = Highcharts.getOptions().colors, categories = ['Android', 'iOS'],
        name = 'Mobile Platform brands',
        data = [{
            y: seriesPlatformAndroid[0],
            color: colors[2],
            drilldown: {
                name: 'Android App versions',
                categories: ['5.5', '5.6', '5,7'],
                data: [seriesPlatformAndroid[1], seriesPlatformAndroid[2], seriesPlatformAndroid[3]],
                color: colors[3]
            }
        }, {
            y: seriesPlatformiOS[0],
            color: colors[4],
            drilldown: {
                name: 'iOS App versions',
                categories: ['5.7', '5.5', '5.0'],
                data: [seriesPlatformiOS[1], seriesPlatformiOS[2], seriesPlatformiOS[3]],
                color: colors[5]
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
        $('#container3').highcharts({
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Mobile App Matrix'
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
                name: 'Platform',
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
                name: 'App Versions',
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
}
function pagerFilter(data) {
    if (typeof data.length == 'number' && typeof data.splice == 'function') {    // is array
        data = {
            total: data.length,
            rows: data
        }
    }
    var dg = $(this);
    var opts = dg.datagrid('options');
    var pager = dg.datagrid('getPager');
    pager.pagination({
        onSelectPage: function (pageNum, pageSize) {
            opts.pageNumber = pageNum;
            opts.pageSize = pageSize;
            pager.pagination('refresh', {
                pageNumber: pageNum,
                pageSize: pageSize
            });
            dg.datagrid('loadData', data);
        }
    });
    if (!data.originalRows) {
        data.originalRows = (data.rows);
    }
    var start = (opts.pageNumber - 1) * parseInt(opts.pageSize);
    var end = start + parseInt(opts.pageSize);
    data.rows = (data.originalRows.slice(start, end));
    return data;
}
function onSelect(date) {
    //$('#result').text(date)
    GetBrowserMatrixByDepName("Flight");
    GetPlatformByDepName("Flight");
    GetAppByDepName("Flight");
    //$('#dg').datagrid({ loadFilter: pagerFilter }).datagrid('loadData');

    var dg = $('#dg').datagrid();
    dg.datagrid('enableFilter', [
        {
            field: 'success',
            type: 'numberbox',
            options: { precision: 0 },
            op: ['equal', 'notequal', 'less', 'greater']
        },
        {
            field: 'fail',
            type: 'numberbox',
            options: { precision: 0 },
            op: ['equal', 'notequal', 'less', 'greater']
        },
        {
            field: 'caseid',
            type: 'numberbox',
            options: { precision: 0 },
            op: ['equal', 'notequal', 'less', 'greater']
        },  
        {
            field: 'result',
            type: 'combobox',
            options: {
                panelHeight: 'auto',
                data: [{ value: '', text: 'ALL'}, { value: 'Pass', text: 'Pass' }, { value: 'Fail', text: 'Fail' }, { value: 'Warn', text: 'Warn' }],
                onChange: function (value) {
                    if (value == '') {
                        dg.datagrid('removeFilterRule', 'result');
                    } else {
                        dg.datagrid('addFilterRule', {
                            field: 'result',
                            op: 'equal',
                            value: value
                        });
                    }
                    dg.datagrid('doFilter');
                }
            }
        }
        ]);
}
function myformatter(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
}
function myparser(s) {
    if (!s) return new Date();
    var ss = (s.split('-'));
    var y = parseInt(ss[0], 10);
    var m = parseInt(ss[1], 10);
    var d = parseInt(ss[2], 10);
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
        return new Date(y, m - 1, d);
    } else {
        return new Date();
    }
}

function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1; //获取当前月份的日期
    var d = dd.getDate();
    if (m < 10) m = "0" + m;
    if (d < 10) d = "0" + d;
    return y + "-" + m + "-" + d;
}
