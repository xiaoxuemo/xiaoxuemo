$(function () {
    //���ñ���ͼ��ת
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

    //��ʼ��ť
    $("#start").bind("click", function () {
        scrollToDom("#catalogue");
    });

    //����Ŀ¼
    var articles = $.articles;//��ȡ�������ݼ�
    var list = $("#list");//��ȡĿ¼list
    for (var i = 0; i < articles.length; i++) {
        //����Ŀ¼��
        var item = $("#item-model").clone();
        //��װĿ¼��
        item.attr("id", "item-" + articles[i].id);
        item.attr("index", i);
        item.find(".item-order").html(i + 1);
        item.find(".item-title").html(erectString(articles[i].title));
        //����Ŀ¼ĩβ
        item.insertBefore("#list-end");
        item.show();
        item.bind("click", function () {
            showArticle(this)
        });
    }

    var reg = new RegExp("#[a-zA-Z0-9_]*#", "g");

    //��ʾ����
    function showArticle(item) {
        var index = $(item).attr("index");//��ȡ�������
        var arid = $.articles[index].id;//��ȡ����ID
        if ($("#article-" + arid).attr("id") != undefined) {
            scrollToDom("#article-" + arid);
            return;
        }
        var content = $("#s_" + arid).html();//��ȡ��������
        var result = content.match(reg);//���������е����и���
        var attachments = $.articles[index].attach;//��ø���ʵ��
        //�������滻��HTML��ʽ
        for (var i = 0; i < result.length; i++) {
            var atid = result[i].substring(1, result[i].length - 1);
            var atta = attachments[atid];
            if (atta.type == "pic")//�滻ͼƬ
            {
                var picture = $("#pic_model").clone();
                picture.attr("id", atid);
                picture.find("p").html(atta.desc);
                picture.find("img").attr("src", atta.url1);
                picture.show();
                content = content.replace(result[i], picture.prop("outerHTML"));
            }
            else if (attachments[atid].type == "music")//�滻��Ƶ
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

        //�����л��з�\n�滻Ϊ<br/>
        content = content.replace(/\n/g, "<br/>");
        //��������ģ�壬��contentǶ��
        var arti = $("#article-model").clone();
        arti.attr("id", "article-" + arid);
        arti.find(".title h1").html($.articles[index].title);
        arti.find(".text").html(content);
        arti.insertBefore("footer");
        arti.show();
        scrollToDom("#article-" + arid);

    }


    //���½�������
    function analysisArticle() {

    }



    //��������״̬
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


    //---------------------------���ߺ���-------------------------------

    //���ı����<br>��ɴ�ֱ����
    function erectString(str) {
        var s = "";
        for (var i = 0; i < str.length; i++) {
            s += str.charAt(i) + "<br/>";
        }
        return s;
    }

    //ҳ�������ָ��λ��
    function scrollToDom(dom, callback) {
        $("html,body").animate({scrollTop: $(dom).offset().top}, 800, callback)
    }


});