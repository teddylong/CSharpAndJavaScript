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

</head>
<body>
    <form id="form1" runat="server">
        <div>
            <h2>Basic DataGrid</h2>
            
            <div style="margin: 20px 0;"></div>

            <table class="easyui-datagrid"  title="Basic DataGrid" style="width: 700px; height: 250px"
                data-options="singleSelect:true,collapsible:true,url:'Data.ashx'" >
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
    </form>
</body>
</html>
