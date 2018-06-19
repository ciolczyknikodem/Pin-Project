var json_data;
var params_temp = {};
var cat_arr = [];
var params_arr = [0];
var params_img_arr = [0];

function getJson(url) {
    lang = getLanguage();
    $.ajax({
        dataType: 'json',
        url: url,
        success: function (data) {
            var numbernumber = 0;
            var altdata = [];
            for(i in data){
                altdata.push(data[i]);
            };

            sessionStorage.setItem("projectReferrer", window.location.href);

            //$.each(data, function (k, v) {
            $(altdata).each(function(k,v){
                var imgobj, imgurl, slug, itemtitle, finalstring = '', imgid;
                $.each(v, function (k2, v2) {
                    if (k2 == 'images') { 
                        imgobj = $.parseJSON(v2[0]["image"]);
                        imgid = v2[0]["id"];
                        var roomname = v2[0]["param1"],
                            seeproject = 'ZOBACZ PROJEKT';
                        $.each(imgobj, function(l,u){
                            if(l=='file'){
                            imgurl = window.location.protocol + '//' + window.location.hostname + '/files/' + u; 
                            }
                        });
                        finalstring += '<li style="background-image: url('+imgurl+');">';

                        if(lang == 'en'){
                            seeproject = 'SEE THE PROJECT';
                            slug = window.location.protocol + '//' + window.location.hostname + '/en/project/' + v["slug"] + '#' +roomname+ '?id=' + imgid;
                        } else {
                            slug = window.location.protocol + '//' + window.location.hostname + '/projekt/' + v["slug"] + '#' +roomname+ '?id=' + imgid;
                        }
                        finalstring += '<a href="'+slug+'">';
                        
                        itemtitle = v["title"];
                        finalstring += '<div class="zobacz"><h3>'+itemtitle+'</h3><span>'+seeproject+'</span></div></a></li>';
                    }
                });
                $('#portfolio-items').append(finalstring);
                numbernumber++;
            });
        }
    });
}
var lastparamname;
function getParamValues(selector, html_class, name){
    if(lastparamname != name){
        params_temp[lastparamname] = [];
    }
    if(params_temp[name] == null ){
        params_temp[name] = [];
    }
    var param = '';
    if(selector.checked && $(selector).hasClass(html_class) && $(selector).attr('name') == name){
        params_temp[name].push($(selector).val());
    }else if(!selector.checked && $(selector).hasClass(html_class) && $(selector).attr('name') == name){
        params_temp[name].splice( $.inArray($(selector).val(), params_temp[name]), 1 );
    }
    if(params_temp[name].length != 0) {
        param = name + '~' + params_temp[name].join('+');
    }else{
        param = '';
    }
    
    lastparamname = name;
    return param;
}

function createParamRequest(params_check) {
    params_arr_temp = [];
    var arrayLength = params_check.length;
    for (var i = 0; i < arrayLength; i++) {
        if(params_check[i].length != 0) {
            params_arr_temp.push(params_check[i]);
        }
    }
    if(params_arr_temp.length == 0){
        params_arr_temp = [0];
    }
    return params_arr_temp;
}

function setMenuOptionState(option_name, avail_options) {
    if($("input[name=" + option_name + "]:checked").length < 1) {
        var option_values = []
        $("input[name=" + option_name + "]").each(function () {
            option_values.push($(this).val());
        })
        var valuesLength = option_values.length;
        var availOptionsLength = avail_options[option_name].length;
        var selector;
        var is_match;
        for (var i = 0; i < valuesLength; i++) {
            is_match = false;
            selector = $("input[name='" + option_name + "'][value='" + option_values[i] + "']");
            for (var j = 0; j < availOptionsLength; j++) {
                if (option_values[i] == avail_options[option_name][j]) {
                    is_match = true;
                }
            }
            if (is_match == true) {
                selector.prop('disabled', false);
            } else {
                selector.prop('disabled', true);
            }
        }
    }
}
function loadPortfolioSwitcher(url){
    var switcher = $('.filters-container'),
        catlabel,
        realphotolabel,
        lang;
    lang = getLanguage();
    if(lang == 'en'){
        catlabel = 'Styles';
        switcher.append('<div class="ico filter-icon"><div class="filter-cta en"></div></div>');
    }else{
        catlabel = 'Style';
        switcher.append('<div class="ico filter-icon"><div class="filter-cta pl"></div></div>');
    }
    $.ajax({
        dataType: 'json',
        url: url,
        success: function (data) {
            var str='<ul class="filters-list">',
                i=0;
                str+='<li class="filter" data-filter-name="category"><h3 class="filter-label styles">'+catlabel+'</h3><ul class="filter-options">';
                $.each(data["categories"], function (k2, v2) {
                    if(lang == 'en'){
                        str+='<li class="filter-option category '+k2+'"><input type="checkbox" name="'+v2["slug"]+'" value="true" class="category"><label>'+v2["nameEN"]+'</label></li>';
                    }else{
                        str+='<li class="filter-option category '+k2+'"><input type="checkbox" name="'+v2["slug"]+'" value="true" class="category"><label>'+v2["name"]+'</label></li>';
                    }
                });
                str+='</ul></li>';
                $.each(data["project_params"], function (k2, v2) {
                    if(lang == 'en'){
                        str+='<li class="filter" data-filter-name="'+v2["slug"]+'"><h3 class="filter-label '+v2["slug"]+'">'+v2["nameEN"]+'</h3><ul class="filter-options">';
                        $.each(v2["value"], function(k3,v3){
                            str+='<li class="filter-option '+v2["slug"]+'"><input type="checkbox" name="'+v2["slug"]+'" value="'+k3+'" class="param"><label>'+v3["valEN"]+'</label></li>';
                        });
                    }else{
                        str+='<li class="filter" data-filter-name="'+v2["slug"]+'"><h3 class="filter-label '+v2["slug"]+'">'+v2["name"]+'</h3><ul class="filter-options">';
                        $.each(v2["value"], function(k3,v3){
                            str+='<li class="filter-option '+v2["slug"]+'"><input type="checkbox" name="'+v2["slug"]+'" value="'+k3+'" class="param"><label>'+v3["val"]+'</label></li>';
                        }); 
                    }
                str+='</ul></li>';
                });
                $.each(data["image_params"], function (k2, v2) {
                    if(i==0){
                        if(lang == 'en'){
                        str+='<li class="filter" data-filter-name="'+k2+'"><h3 class="filter-label '+k2+' no-arrow"><input type="checkbox" name="real" class="param_img" value="1"><label>'+v2["nameEN"]+'</label></h3><ul class="filter-options"><li class="filter-option '+k2+'"></li></ul></li>';
                        }else{
                        str+='<li class="filter" data-filter-name="'+k2+'"><h3 class="filter-label '+k2+' no-arrow"><input type="checkbox" name="real" class="param_img" value="1"><label>'+v2["name"]+'</label></h3><ul class="filter-options"><li class="filter-option '+k2+'"></li></ul></li>';
                        }
                    }
                    if(i>0){
                         if(lang == 'en'){
                        str+='<li class="filter" data-filter-name="'+v2["slug"]+'"><h3 class="filter-label '+v2["slug"]+'">'+v2["nameEN"]+'</h3><ul class="filter-options">';
                        $.each(v2["value"], function(k3,v3){
                            str+='<li class="filter-option '+v2["slug"]+'"><input type="checkbox" name="'+v2["slug"]+'" value="'+k3+'" class="param"><label>'+v3["valEN"]+'</label></li>';
                        });
                    }else{
                        str+='<li class="filter" data-filter-name="'+v2["slug"]+'"><h3 class="filter-label '+v2["slug"]+'">'+v2["name"]+'</h3><ul class="filter-options">';
                        $.each(v2["value"], function(k3,v3){
                            str+='<li class="filter-option '+v2["slug"]+'"><input type="checkbox" name="'+v2["slug"]+'" value="'+k3+'" class="param"><label>'+v3["val"]+'</label></li>';
                        }); 
                    }   
                    str+='</ul></li>';
                    }
                    i++;
                });
            str = str + '</ul>';
            switcher.append(str);
        }
    });
}
function getLanguage(){
    var langslug = window.location.pathname.split("/")[1],
        lang;
        if(['en'].indexOf(langslug) != -1){
            lang = langslug;
        }else{
            lang = 'pl';
        }
    return lang;
}
$(document).ready(function () {
    var home_url, 
        tempurl,
        url='http://mikolajskastudio.pl/pl/projekty-i-realizacje/getFilterParams',
        lang = getLanguage(),
        param1 = '',
        param2 =  '',
        room,
        roomcheck,
        is_implemented = -1,
        param1_img = 0;
    home_url = window.location.protocol + '//' + window.location.hostname+'/'+lang+'/'+window.location.pathname.split("/")[1];
    if(lang == 'en'){
        home_url = window.location.protocol + '//' + window.location.hostname+'/'+lang+'/projekty-i-realizacje';//+window.location.pathname.split("/")[1];
    }
    
//----------------------------------------------------------------------------------------------------------------------URL READING
    if(window.location.hash.substring(0, 9) == '#/filter$') {
        tempurl = home_url + window.location.hash.substring(1, window.location.hash.length) + "&type=json";
    }else {
        tempurl = home_url + "/filter$cat=all&params=0&real=-1&img_params=0&type=json"
    }

    getJson(tempurl);


    $('.filter-icon').click(function() {
        sessionStorage.setItem("projectReferrer", window.location.href);
    });
//----------------------------------------------------------------------------------------------------------------------CHECKOXES FILTERING
    loadPortfolioSwitcher(url);
    $('body').on('change',":checkbox.category, :checkbox.param, :checkbox.param_img",function(event) {
//----------------------------------------------------------------------------------------------------------------------CATEGORIES
        cat_arr = [];
        params_arr = [0];
        param1_img = 0;

        $('input:checked.category').each(function(){
            cat_arr.push($(this).attr('name'));
        });
        if($(this).attr('name') != 'real'){
            $(':checkbox[name="real"]').prop('checked',false);
            is_implemented = -1;
        }
        if($(this).attr('name') == 'rooms'){
            roomcheck = $(this).index('[name="rooms"]');
            $(':checkbox.category').each(function(){
                $(this).prop('checked',false);
            });
            params_arr = [0];
        }
        $('[name="rooms"]').each(function(){
            if(roomcheck != $(this).index('[name="rooms"]')){
                $(this).prop('checked', false);
            }else{
                if($(this).prop('checked') == true){
                    param1_img = $(this).attr('name') + '~' + $(this).val();
                }
            }
        });
        param1='';
        param2='';
         if($(this).attr('name') == 'area'){
             param2 = getParamValues(this, 'param', 'area');
             $('[name="objects"]').each(function(){
                $(this).prop('checked',false);
            });
             params_arr = createParamRequest([param2]);
         }
         if($(this).attr('name') == 'objects'){
             param1 = getParamValues(this, 'param', 'objects');
             $('[name="area"]').each(function(){
                $(this).prop('checked',false);
            });
             params_arr = createParamRequest([param1]);
         }
//        param1 = getParamValues(this, 'param', 'objects');
//        param2 = getParamValues(this, 'param', 'area');
        if(this.checked && $(this).hasClass("param_img") && $(this).attr('name') == 'real') {
            is_implemented = $(this).val();
        }else if(!this.checked && $(this).hasClass("param_img") && $(this).attr('name') == 'real'){
            is_implemented = -1;
        }
        params_img_arr = createParamRequest([param1_img]);

        if($('input:checked.category').length == 0){
            cat_arr = ['all'];
        }
        if($('input:checked.param').length == 0){
            params_arr = [0];
        }

        $("#portfolio-items").empty();
        var hash_url = "/filter$cat=" + cat_arr.join() + "&params=" + params_arr.join() + "&real=" + is_implemented + "&img_params=" + params_img_arr.join();
        url = home_url + hash_url + "&type=json";
        window.location.hash = hash_url;
        room = param1_img;
        getJson(url);

//----------------------------------------------------------------------------------------------------------------------SET MENU'S CHECKBOXES STATES
    })

});