<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="CSharpAndJavaScript.Index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>WhatEver</title>
    <link rel="stylesheet" type="text/css" href="jQueryEasy/easyui.css" />
    <link rel="stylesheet" type="text/css" href="jQueryEasy/icon.css" />
    <link rel="stylesheet" type="text/css" href="jQueryEasy/demo.css" />
    <script type="text/javascript" src="jQueryEasy/jquery.min.js"></script>
    <script type="text/javascript" src="jQueryEasy/jquery.easyui.min.js"></script>

    <script type="text/javascript" src="HighChart/highcharts.js"></script>
    <script type="text/javascript" src="http://code.highcharts.com/modules/exporting.js"></script>
    <script type="text/javascript" src="jQueryEasy/datagrid-filter.js"></script>
    <script type="text/javascript" src="jQueryEasy/demo.js"></script>
    <script type="text/javascript">
       
         
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <br />
        <div id="WholeDiv" style="margin-left:auto;margin-right:auto;width:1400px;">
        <div class="easyui-tabs" id="tt" data-options="tabWidth:85" style="width: 1400px; height: 30px; margin-left: auto; margin-right: auto;">
            <div title="Flight" style="padding: 10px">
            </div>
            <div title="Hotel" style="padding: 10px">
            </div>
            <div title="Car" style="padding: 10px">
            </div>
            <div title="Corp" style="padding: 10px">
            </div>
            <div title="NB" style="padding: 10px">
            </div>
            <div title="Vacations" style="padding: 10px">
            </div>
            <div title="PF" style="padding: 10px">
            </div>
            <div title="YOU" style="padding: 10px">
            </div>
            <div title="Cruise" style="padding: 10px">
            </div>
            <div title="Intl" style="padding: 10px">
            </div>
            <div title="TTD" style="padding: 10px">
            </div>
            <div title="Taocan" style="padding: 10px">
            </div>
            <div title="Train" style="padding: 10px">
            </div>
            <div title="HT" style="padding: 10px">
            </div>
        </div>
        <div id="container" style="margin-left: auto; margin-right: auto; min-width: 450px; height: 300px; max-width: 1200px;"></div>
        <br /><br />
        <div id="ttt" class="easyui-tabs" style="width: 520px; height: 460px">
            <div title="Browser Matrix" style="padding: 10px">
                <div id="container1" style="width: 530px; height: 400px; margin-left: -40px;"></div>
            </div>
            <div title="Platform Matrix" style="padding: 10px">
                <div id="container2" style="width: 530px; height: 400px; margin-left: -40px;"></div>
            </div>
            <div title="App Matrix" style="padding: 10px">
                <div id="container3" style="width: 530px; height: 400px; margin-left: -40px;"></div>
            </div>
        </div>

        <div id="DataTableDiv" style="margin-left: 530px; margin-top: -480px; width: 870px;">
            <div style="margin: 20px 0;"></div>
            <table id="dg" title="Case Detail" style="width: 870px; height: 460px;"
                data-options="
                rownumbers:true,
                singleSelect:true,
                autoRowHeight:false,
                pagination:true,
                pageSize:10,
                url:'Data.ashx?type=GetUser',
                toolbar:'#tb'">
                <thead>
                    <tr>
                        <th data-options="field:'caseid',width:80,align:'center'">CaseID</th>
                        <th data-options="field:'name',width:220,align:'center'">Name</th>
                        <th data-options="field:'time',width:180,align:'center'">Time</th>
                        <th data-options="field:'success',width:60,align:'center'">Success</th>
                        <th data-options="field:'fail',width:60,align:'center'">Fail</th>
                        <th data-options="field:'result',width:60,align:'center'">Result</th>
                        <th data-options="field:'platform',width:175,align:'center'">Platform</th>
                    </tr>
                </thead>
            </table>
            <div id="tb" style="padding: 5px; height: auto">
                <div>
                    Date Choose:<input class="easyui-datebox" id="timePicker" style="width: 120px" data-options="onSelect:onSelect,formatter:myformatter,parser:myparser" />   
                </div>
            </div>
        </div>
        </div>
    </form>
</body>
</html>
