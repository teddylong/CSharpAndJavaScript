$(function () {


    
    //$('#TaskPanel').hide();
    $('#addBtn').bind('click', function () {
        $('#AddPanel').hide();
        $('#TaskPanel').show();
    });

    $('#CancelBtn').bind('click', function () {
        $('#AddPanel').show();
        $('#TaskPanel').hide();
    });
});