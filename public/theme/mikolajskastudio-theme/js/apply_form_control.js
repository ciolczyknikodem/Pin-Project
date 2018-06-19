$(document).ready(function () {
    var paths=$('body').find('.path');
    $('.path').append('<div class="field-overlay"></div>');
    $( "input[type='file']" ).each(function( index ) {
        var e = this;
        $('span#' + $(this).attr('id') + '.button').click(function (ev) {
            ev.preventDefault();
            $(e).click();
        });
        $(e).change(function () {
            var filename = $(e).val().split("\\");
            $('label[for=' + $(e).attr('id') + ']').text(String(filename[filename.length - 1]));
        });
    });
});