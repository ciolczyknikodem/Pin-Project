//----------------------------------------------------------------------------------------------------------------------------- USED FUNCTIONS

var menuitems = $('#main-navi').find('li').slice(0,-1); //global variable

function findIndexToHide(){ //find menu items to hide under "more" button
    var menuwidth = $('.menu').width(),
        limit = $(window).width() - $('.logo-text').width() - ($('#more-navi').width()) - 100;
        indexToHide = function(){
            var right = $(menuitems[0]).position().left,
                offset = 0;
            for(var i = 0; i < menuitems.length; i++){
                var $this = $(menuitems[i]),
                    margin = parseInt($this.css('margin-right'));
                    offset = offset + $this.width() + margin;
                if(offset > limit){
                    return i-1;
                    break;
                }
            }
        }
        console.log(indexToHide());
    return indexToHide(); //all menu items with index higher than this will be hidden
}

function hideMenuItems(num){ //hide menu items from this index to the end of list
    var ww = $(window).width();
    $('.more-navi-items').html('');
    if(ww>768){ // hide a few menu items under "more" button for 1000px+ screens
        $('body').removeClass('pushed');
        $('.burger').removeClass('active');
        $('.more-navi-items').removeClass('side-panel');
        $(menuitems).each(function(){
            var index = $(this).index();
            if(index > num){
                $('.more-navi-items').append($(this).clone().css('display', 'block'));
                $(this).hide();
            }
        });
    }else{ //create "push menu" for <1000px screens
        $('.more-navi-items').addClass('side-panel');
        $(menuitems).each(function(){
            $('.more-navi-items').append($(this).clone());
            $(this).hide();
        });
    }
}

function organizeMenu(){ //execute menu items hiding etc.
    menuitems.each(function(){$(this).css('display','inline-block');});
    var index = findIndexToHide();
    hideMenuItems(index);
    $('.more-navi-items').hide();
}

function expandPanel(){ //show push menu
    var time = 600;
    $('body').css('position','absolute').animate({
        right : '280px'
    },time).addClass('pushed');
    $('.side-panel').css('right','-280px').show().stop(true,true).animate({
        right: '0px'
    },time,function(){
        $('.burger').addClass('active').addClass('evolved');
    });
    $('.menu-overlay').stop(true,true).animate({
        right: '280px'
    },time);
    // $('.top-bar').stop(true,true).animate({
    //     right: '280px'
    // },time);
}

function collapsePanel(){ //hide push menu
    var time = 600;
    $('body').animate({
        right : '0'
    },time,function(){$('body').removeClass('pushed')});
    $('.side-panel').stop(true,true).animate({
        right: '-280px'
    },time,function(){
        $(this).hide();
        $('.side-panel').css('right', '10px');
    });
    $('.burger').animate({
        right: '100px'
    },time,function(){
        $(this).css('right','240px')
    }).removeClass('active').removeClass('evolved');
    $('.menu-overlay').stop(true,true).animate({
        right: '0px'
    },time);
    $('.top-bar').stop(true,true).animate({
        right: '0px'
    },time);
}

//----------------------------------------------------------------------------------------------------------------------------- DOCUMENT READY
$(document).ready(function(){
// MENU
    $('.burger').click(function(){ //expand side panel for < 1000px screens
        if($('body').hasClass('pushed')){
            collapsePanel();
        }else{
            expandPanel();
        }
    });
    $('.menu-overlay').click(function(){ //show overlay on <body> while expanding side panel
        collapsePanel();
    });
    $('#more-navi').click(function(){ //showing menu items hidden in "more" button
        if(!$('.more-navi-items').hasClass('side-panel')){
            $('.more-navi-items').slideToggle('fast',function(){$('.more-navi-items').addClass('isvisible')});
        }
    });

    $('body').click(function(event) { //collapsing search module if expanded
        if($('.more-navi-items').hasClass('isvisible')){
            if(!$(event.target).closest('.more-navi-items').length) {
                $('.more-navi-items').slideToggle('fast',function(){$('.more-navi-items').removeClass('isvisible')});
            }
        }
    });
});

$(document).keyup(function(e) { //collapsing search module by tapping/pressing Esc
    if (e.keyCode == 27 && $('.search-module').hasClass('expanded')) {
        if($('.more-navi-items').hasClass('isvisible')){
            $('.more-navi-items').slideToggle('fast',function(){$('.more-navi-items').removeClass('isvisible')});
        }
    }
});

//----------------------------------------------------------------------------------------------------------------------------- WINDOW LOAD
$(window).load(function(){
    $('.global-menu').show();
    organizeMenu();
});

//----------------------------------------------------------------------------------------------------------------------------- WINDOW SCROLL
$(window).scroll(function(){
    var wst = $(window).scrollTop(),
        wh = $(window).height();
    if(wst > 100){
        $('.top-bar').addClass('sticky');
    }else{
        $('.top-bar').removeClass('sticky');
    }
})

//----------------------------------------------------------------------------------------------------------------------------- WINDOW RESIZE
function doneResizing(){
    organizeMenu();
}
var resizeId;
$(window).resize(function() {
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing, 200);
    var ww = $(window).width(), lefcik;
    ww > 768 ? lefcik = '10px' : lefcik = '-280px';
    $('.more-navi-items').css('right',lefcik);
});