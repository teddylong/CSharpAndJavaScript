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
    <script type="text/javascript" src="jQueryEasy/demo.js"></script>
    <%--<script type="text/javascript">
        $(function(){
           
        });
    </script>--%>
</head>
<body>
    <form id="form1" runat="server">
        <div id="DataTableDiv" style="margin-left: auto; margin-right: auto; width: 700px;">
            <div style="margin: 20px 0;"></div>
            <table class="easyui-datagrid" title="DataGrid" style="width: 700px; height: 250px"
                data-options="singleSelect:true,collapsible:true,url:'Data.ashx?type=GetUser'">
                <thead>
                    <tr>
                        <th data-options="field:'id',width:120">ID</th>
                        <th data-options="field:'firstname',width:120">First Name</th>
                        <th data-options="field:'lastname',width:120,align:'right'">Last Name</th>
                        <th data-options="field:'phone',width:140,align:'right'">Phone</th>
                        <th data-options="field:'email',width:193">Email</th>
                    </tr>
                </thead>
            </table>
        </div>
        <br />
        <br />
        <div class="easyui-tabs" id="tt" data-options="tabWidth:112" style="width: 1000px; height: 30px; margin-left: auto; margin-right: auto;">
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
        <div id="container" style="margin-left: auto; margin-right: auto; min-width: 250px; height: 300px; max-width: 900px;"></div>

    </form>
</body>
</html>
