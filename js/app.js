$(function () {
    //设置背景图轮转
    var imgs = $(".xbg").children();
    var imgNum = imgs.length;
    var cur = 0;
    cur = Math.ceil(Math.random() * 10) % imgNum;
    $(imgs[cur]).animate({opacity: 1}, 500);
    setInterval(function () {
        $(imgs[cur]).animate({opacity: 0}, 1000);
        cur = Math.ceil(Math.random() * 10) % imgNum;
        $(imgs[cur]).animate({opacity: 1}, 1000);
    }, 30000);

    //开始按钮
    $("#start").bind("click", function () {
        scrollToDom("#catalogue");
    });

    //加载目录
    var articles = $.articles;//获取文章数据集
    var list = $("#list");//获取目录list
    for (var i = 0; i < articles.length; i++) {
        //复制目录项
        var item = $("#item-model").clone();
        //组装目录项
        item.attr("id", "item-" + articles[i].id);
        item.attr("index", i);
        item.find(".item-order").html(i + 1);
        item.find(".item-title").html(erectString(articles[i].title));
        //插入目录末尾
        item.insertBefore("#list-end");
        item.show();
        item.bind("click", function () {
            showArticle(this)
        });
    }

    var reg = new RegExp("#[a-zA-Z0-9_]*#", "g");

    //显示文章
    function showArticle(item) {
        var index = $(item).attr("index");//获取文章序号
        var arid = $.articles[index].id;//获取文章ID
        if ($("#article-" + arid).attr("id") != undefined) {
            scrollToDom("#article-" + arid);
            return;
        }
        var content = $("#s_" + arid).html();//获取文章正文
        var result = content.match(reg);//查找文章中的所有附件
        var attachments = $.articles[index].attach;//获得附件实体
        //将附件替换成HTML形式
        for (var i = 0; i < result.length; i++) {
            var atid = result[i].substring(1, result[i].length - 1);
            var atta = attachments[atid];
            if (atta.type == "pic")//替换图片
            {
                var picture = $("#pic_model").clone();
                picture.attr("id", atid);
                picture.find("p").html(atta.desc);
                picture.find("img").attr("src", atta.url1);
                picture.show();
                content = content.replace(result[i], picture.prop("outerHTML"));
            }
            else if (attachments[atid].type == "music")//替换音频
            {
                var music = $("#mus_model").clone();
                music.attr("id", atid);
                music.find("p").html(atta.desc);
                music.find("source").attr("src", atta.url);
                music.show();
                if (attachments[atid].auto == 1) {
                    music.find("audio").attr("autoplay", "autoplay");
                }
                content = content.replace(result[i], music.prop("outerHTML"));
            }
        }

        //将所有换行符\n替换为<br/>
        content = content.replace(/\n/g, "<br/>");
        //复制文章模板，将content嵌入
        var arti = $("#article-model").clone();
        arti.attr("id", "article-" + arid);
        arti.find(".title h1").html($.articles[index].title);
        arti.find(".text").html(content);
        arti.insertBefore("footer");
        arti.show();
        scrollToDom("#article-" + arid);

    }


    //文章解析函数
    function analysisArticle() {

    }



    //检测滚动条状态
    var back = $("#back");
    back.bind("click", function(){
        scrollToDom("#catalogue");
    });
    $(window).scroll(function () {

        if ($(window).scrollTop() > 769) {
            back.fadeIn();
        } else {
            back.fadeOut();
        }
    });


    //---------------------------工具函数-------------------------------

    //将文本添加<br>变成垂直方向
    function erectString(str) {
        var s = "";
        for (var i = 0; i < str.length; i++) {
            s += str.charAt(i) + "<br/>";
        }
        return s;
    }

    //页面滚动到指定位置
    function scrollToDom(dom, callback) {
        $("html,body").animate({scrollTop: $(dom).offset().top}, 800, callback)
    }


});