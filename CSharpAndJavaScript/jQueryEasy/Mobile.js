$(function () {

    $('#TaskPanel').hide();
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
        if (v.indexOf("Function") > -1) {
            $('#typeDetailText').text(function () { return "This is Function Testing...."; });
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

    $('#SubmitBtn').click(function ()
    {

    })

    $('#JobListCombo').combobox(
        {
            onSelect: function ()
            {
                if ($('#JobListCombo').combobox('getText').indexOf("H5") > -1) {
                    $('#H5Button').linkbutton('select');
                }
                if ($('#JobListCombo').combobox('getText').indexOf("App") > -1) {
                    $('#AppButton').linkbutton('select');
                }
                if ($('#JobListCombo').combobox('getText').indexOf("Hybrid") > -1) {
                    $('#HybridButton').linkbutton('select');
                }
                $('#H5Button').linkbutton('disable');
                $('#HybridButton').linkbutton('disable');
                $('#AppButton').linkbutton('disable');
            }
        })
    $('#AppUploadText').attr("disabled", "disabled");
    $('#AppUploadBtn').attr("disabled", "disabled");
    
    
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
function formatItem(row) {
    var s = '<span style="font-weight:bold">' + row.Name + '</span><br/>' +
            '<span style="color:#888">' + row.Url + '</span>';
    return s;
}
function JobInit(jobName)
{
    if (jobName.indexOf("H5") > -1) {
        
    }
}