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

$('.slider-item').bind('swipeleft', function(){
    showPrev();
});
$('.slider-item').bind('swiperight', function(){
    showNext();
});

function showPrev(){
    var currentSlide = $('.slider-item.active'),
        currentIndex = currentSlide.index('.slider-item'),
        limit = $(document).find('.slider-item').length,
        slider = $('ul.slider'),
        counter = 0;
    if(currentIndex == 0){
        counter = limit - 1;
    }else{
        counter = currentIndex - 1;
    }
    showSlide(counter);
}

function showNext(){
    var currentSlide = $('.slider-item.active'),
        currentIndex = currentSlide.index('.slider-item'),
        limit = $(document).find('.slider-item').length,
        slider = $('ul.slider'),
        counter = 0;
    if(currentIndex < limit-1){
        counter = currentIndex + 1;
    }else{
        counter = 0;
    }    
    showSlide(counter);
}

function arrowNavi(){
    $('.arrow').click(function(){    
        if($(this).hasClass('right')){
            showNext();
        }
        if($(this).hasClass('left')){
            showPrev();
        }
    });
}
function showSlide(num){
    var slides = $('.slider').find('li'),
        slider = $('ul.slider');
    if(!slider.hasClass('playin')){
        slider.addClass('playin');
        $(slides).removeClass('active');
        $(slides[num]).addClass('active').animate({
            opacity: 1
        },500,function(){
            slider.removeClass('playin');
            var urltail = $(slides[num]).attr('data-room');
            window.location.hash = urltail;
            activeDot();
            slides.each(function(){
                if($(this).hasClass('active')==false){
                    $(this).css('opacity','0');            
                }
            })
        });
    }
}
function recognizeLink(){
    var urltail = window.location.hash.replace('#',''),
        slides = $('.slider-item'),
        index = 0;
    $(slides).each(function(){
       if($(this).attr('data-room') == urltail){
           index = $(this).index('.slider-item');
       }
    });
    showSlide(index);
}
function dotNavi(el){
    var index = el.attr('id').replace('dot','');
    showSlide(index);
}



$(document).ready(function(){
    var slides = $('.slider').find('li');
    prepareSlides();
    createDots();
    arrowNavi();
    recognizeLink();
    $('.dot').click(function(){
        dotNavi($(this));
    });
    $('.slider-item').click(function(){
        if($(this).find('iframe') && ($(this).hasClass('playing')==false)){
            $(this).addClass('playing');
        }else{
            $(this).removeClass('playing');
        }
    });
});

window.onhashchange = function(){
    recognizeLink();
};