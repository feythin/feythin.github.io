$(document).ready(function(){
    if($('h2').length > 2){
        var h2 = [],h3 = [],tmpl = '<ul>',h2index = 0;

        var findScrollableElement = function(els) {
            for (var i = 0, argLength = arguments.length; i < argLength; i++) {
                var el = arguments[i],
                $scrollElement = $(el);
                if ($scrollElement.scrollTop() > 0) {
                    return $scrollElement;
                } else {
                    $scrollElement.scrollTop(1);
                    var isScrollable = $scrollElement.scrollTop() > 0;
                    $scrollElement.scrollTop(0);
                    if (isScrollable) {
                        return $scrollElement;
                    }
                }
            }
            return [];
        };

        $.each($('h2,h3'),function(index,item){
            if(item.tagName.toLowerCase() == 'h2'){
                var h2item = {};
                h2item.name = $(item).text();
                h2item.id = 'menuIndex'+index;
                h2.push(h2item);
                h2index++;
            }else{
                var h3item = {};
                h3item.name = $(item).text();
                h3item.id = 'menuIndex'+index;
                if(!h3[h2index-1]){
                    h3[h2index-1] = [];
                }
                h3[h2index-1].push(h3item);
            }
            item.id = 'menuIndex' + index
        });

        //添加h1
        tmpl += '<li class="h1"><a href="#" data-top="0">'+$('h1').text()+'</a></li>';

        for(var i=0;i<h2.length;i++){
            tmpl += '<li><a href="#" data-id="'+h2[i].id+'">'+h2[i].name+'</a></li>';
            if(h3[i]){
                for(var j=0;j<h3[i].length;j++){
                    tmpl += '<li class="h3"><a href="#" data-id="'+h3[i][j].id+'">'+h3[i][j].name+'</a></li>';
                }
            }
        }
        tmpl += '</ul>';

        var $scrollable = findScrollableElement('body','html');
        $('body').append('<div id="menuIndex"></div>');
        $('#menuIndex').append($(tmpl)).delegate('a','click',function(e){
            e.preventDefault();
            var scrollNum = $(this).attr('data-top') || $('#'+$(this).attr('data-id')).offset().top;
            //window.scrollTo(0,scrollNum-30);
            $scrollable.animate({ scrollTop: scrollNum-40 }, 400, 'swing');
        })

        $(window).load(function(){
            var scrollTop = [];
            $.each($('#menuIndex li a'),function(index,item){
                if(!$(item).attr('data-top')){
                    var top = $('#'+$(item).attr('data-id')).offset().top;
                    scrollTop.push(top);
                    $(item).attr('data-top',top);
                }
            });

            $(window).scroll(function(){
                var nowTop = $(window).scrollTop(),index,length = scrollTop.length;
                if(nowTop+60 > scrollTop[length-1]){
                    index = length
                }else{
                    for(var i=0;i<length;i++){
                        if(nowTop+60 <= scrollTop[i]){
                            index = i
                            break;
                        }
                    }
                }
                $('#menuIndex li').removeClass('on')
                $('#menuIndex li').eq(index).addClass('on')
            });
        });

        //用js计算屏幕的高度
        $('#menuIndex').css('max-height',$(window).height()-80);
    }
});