(function(){
$(document).ready(function(){
    $(document).on('click', '.ico-about-us', function () {
        if(!$(this).hasClass('show') && !$('.about-container').hasClass('show') ){
            $(this).addClass('show').addClass('suggesting');
            $('.about-container').addClass('show');
        } else {
            $(this).removeClass('show').removeClass('suggesting');
            $('.about-container').removeClass('show');
        };
    });
    $('.about-container').scroll(function(){
        var ot = $(this).find('about-text');
        if(ot.offset().top < 0){
            $(this).find('.ico-about-us').removeClass('suggesting');
        }
    });
});
})();