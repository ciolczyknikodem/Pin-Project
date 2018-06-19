$(document).on("click", '.filter-label', function(event) {
    var list = $(this).next('ul.filter-options'),
        filters = $('body').find('.filter'),
        parent = $(this).parent(),
        checkboxes = $('.filters-container').find(':checkbox');
    filters.removeClass('toggled');
    if(!parent.hasClass('toggled')){ 
       parent.addClass('toggled'); 
    }
    params_temp[lastparamname] = [];
    checkboxes.each(function(){
        if($(this).attr('name')!='real'){
        $(this).prop('checked',0);
        }
    });
});
$(document).on("click", 'label', function(event) {
    $(this).parent().find('input').click();
});
var toggledblock = 0;
$(document).on("click", '.filter-icon', function(event) {
    $(this).parent().toggleClass('visible');
    if(toggledblock == 0){
        var hideTooltip = setTimeout(function(){
            $('.filter-cta').fadeToggle('slow',function(){
                $('.filter-cta').remove();
            });
            toggledblock = 1;
        },500);
    }
});
$(document).keyup(function(e) { //collapsing search module by tapping/pressing Esc
    if (e.keyCode == 27 && $('.filters-container').hasClass('visible')) {
        $('.filters-container').removeClass('visible');
    }
});