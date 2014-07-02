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

    $('#cc input').click(function () {
        var v = $(this).val();
        $('#typeDetailTitle').text(function () { return v; });
        if (v.indexOf("1") > -1) {
            $('#typeDetailText').text(function () { return "This is Test type one...."; });
        }
        if (v.indexOf("2") > -1) {
            $('#typeDetailText').text(function () { return "This is Test type two...."; });
        }
        if (v.indexOf("3") > -1) {
            $('#typeDetailText').text(function () { return "This is Test type three...."; });
        }
    });

    $('.phoneDiv img').click(function () {
        var isBorder = $(this).css("border");
        if (isBorder.indexOf("4") == -1) {
            $(this).css("border", "4px solid blue");    
        }
        else
        {
            $(this).removeAttr("style");
        }
        WriteDetail();
    });
    
});

function WriteDetail()
{
    var textDetail = "";
    var regN = /[\n]/g;
    $('.phoneDiv img').each(function () {
        var isBorder = $(this).css("border");
        if (isBorder.indexOf("4") != -1) {
            textDetail += $(this).attr("alt") + "<br/><br/>";
        }
    });

    $("#phoneDetailText").html(textDetail);
   
}