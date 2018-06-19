function createDots(){
    var slides = $('.slider').find('li'),
        str = '',
        dots = $('.dots');
    for(var i = 0; i < slides.length; i++){
        str += '<div class="dot" id="dot'+i+'"></div>'
    }
    dots.html(str);
}

function activeDot(){
    var slides = $('.slider').find('li'),
        dots = $('.main-slider').find('.dot'),
        num,
        activeSlide = slides.map(function(){
            if($(this).hasClass('active')){
                num = $(this).index();
                return $(this);
            }
        });
    $(dots).removeClass('active');
    $(dots[num]).addClass('active');
    return num;
}

function prepareSlides(){
    var slides = $('.slider').find('li');
    slides.each(function(){
        $(this).removeClass('active').css('opacity','0');
        if($(this).find('iframe')){
            var iframe = $(this).find('iframe'),
                width = $(this).width(),
                height = $(this).height();
            iframe.attr('width',width).attr('height',height);
        }
    });
}
function playSlider(){
    var counter = activeDot(),
        slides = $('.slider').find('li');
    if(counter == slides.length-1){
        counter = 0;
    }else{
        counter++;
    }
    showSlide(counter);
}
function arrowNavi(){
    $('.arrow').click(function(){    
        var currentSlide = $('.slider-item.active'),
            currentIndex = currentSlide.index('.slider-item'),
            limit = $(document).find('.slider-item').length,
            counter = 0;
        clearInterval(playslides);
        if($(this).hasClass('right')){
            if(currentIndex < limit-1){
                counter = currentIndex + 1;
            }else{
                counter = 0;
            }
        }
        if($(this).hasClass('left')){
            if(currentIndex == 0){
                counter = limit - 1;
            }else{
                counter = currentIndex - 1;
            }
        }
        showSlide(counter);
        playslides = setInterval(function(){
            playSlider();
        },5000);
    });
}
function showSlide(num){
    var slides = $('.slider').find('li');
    $(slides).removeClass('active');
    $(slides[num]).addClass('active').animate({
        opacity: 1
    },500,function(){
        activeDot();
        slides.each(function(){
            if($(this).hasClass('active')==false){
                $(this).css('opacity','0');            
            }
        })
    });
}
function dotNavi(el){
    var index = el.attr('id').replace('dot','');
    showSlide(index);
}
var playslides = setInterval(function(){
    playSlider();
},5000);

$(document).ready(function(){
    var slides = $('.slider').find('li');
    prepareSlides();
    createDots();
    arrowNavi();
    showSlide(0);
    $('.dot').click(function(){
        dotNavi($(this));
        clearInterval(playslides);
        playslides = setInterval(function(){
            playSlider();
        },5000);
    });
})