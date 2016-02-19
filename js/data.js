$(function(){
    var contenth=$(window).height()-$(".thehead").outerHeight();
    $(".content").css("height",contenth);
    //输入框的动画
    //按钮
    var add=$(".add");
    //输入框
    var form=$("form");
    //输入框关闭的按钮
    var formClose=$(".formclose");
    var flag=true;

    var oldv=localStorage.message==null?[]:JSON.parse(localStorage.message);

    add.click(function(){

        if(flag) {
            form.attr({"data-a":"animate-down"}).css("display","block");
            flag=false;
        }else{
            form.attr({"data-a":"animate-up"})
            flag=true;
        }
    })
    formClose.click(function(){
        form.attr({"data-a":"animate-up"})
        flag=true;
    })
    /*表单的验证*/

    $(".submitbtn").click(function(){
        var textv=form.find(":text").val();
        var conv=form.find("textarea").val();
        var timev=form.find("#time").val();

        if(textv==""){
            alert("标题不能为空");
            return;
        }
        if(conv==""){
            alert("内容不能为空");
            return;
        }
        if(timev==""){
            alert("时间必选");
            return;
        }


        //存储信息

        var obj={title:textv,con:conv,time:timev,id:new Date().getTime()};
        oldv.push(obj);
        var str=JSON.stringify(oldv);
        localStorage.message=str;
        form.find(":text").val("");
        form.find("textarea").val("");
        form.find("#time").val("");

        //显示信息

        var copy=$(".con").eq(0).clone().appendTo($(".content")).fadeIn(100).css({
            left:($(".content").width()-$(".con").outerWidth())*Math.random(),
            top:($(".content").height()-$(".con").outerHeight())*Math.random()
        }).attr("id",obj.id);
        //console.log(copy.children())
        //copy.attr()
        copy.children(".panel-body").eq(0).html(textv);
        copy.children(".panel-body").eq(1).html(conv);
        copy.children(".panel-body").eq(2).html(timev);
        var newtitle=copy.children(".title")
        newtitle.mousedown(function(e){
            var ox= e.offsetX;
            var oy= e.offsetY;
            var that=$(this).parent();
            $(document).mousemove(function(e){
                var cx= e.clientX;
                //console.log(cx)
                var cy= e.clientY-$(".thehead").outerHeight();
                $(that).css({
                    left:cx-ox,
                    top:cy-oy-20
                })
            })
            $(document).on("mouseup",function(){
                $(document).off("mousemove");
                $(document).off("mouseup");
            })
        })

        copy.children(".conclose").click(function(){
            var parent=$(this).parent()
            var num=parent.index()-1
            parent.attr({"data-a":"animate-hide"})
            oldv.splice(num,1);
            //console.log(oldv)
            localStorage.message=JSON.stringify(oldv)
        })



    })

    var oldvLen=oldv.length;
    //console.log(oldv.length)
    if(oldvLen!=0){
        for(var i=0;i<oldvLen;i++){
            var copy=$(".con").eq(0).clone().appendTo($(".content")).fadeIn(100).css({
                left:($(".content").width()-$(".con").outerWidth())*Math.random(),
                top:($(".content").height()-$(".con").outerHeight())*Math.random()
            }).attr("data-a","none").attr("id",oldv[i].id);
            //console.log(copy.children())
            copy.children(".panel-body").eq(0).html(oldv[i].title);
            copy.children(".panel-body").eq(1).html(oldv[i].con);
            copy.children(".panel-body").eq(2).html(oldv[i].time);
        }


    }

    setTimeout(function(){
        var title=$(".title");
        title.mousedown(function(e){
            var ox= e.offsetX;
            var oy= e.offsetY;
            var that=$(this).parent();
            $(document).mousemove(function(e){
                var cx= e.clientX;
                var cy= e.clientY-$(".thehead").outerHeight();
                $(that).css({
                    left:cx-ox,
                    top:cy-oy-20
                })
            })
            $(document).on("mouseup",function(){
                $(document).off("mousemove");
                $(document).off("mouseup");
            })
        })
        $(".conclose").click(function(){

            var parent=$(this).parent()
            var num=parent.index()-1
            parent.attr({"data-a":"animate-hide"})
            oldv.splice(num,1);
            //console.log(oldv)
            localStorage.message=JSON.stringify(oldv)
        })

    },0)

    $(".con").mousedown(function(e){
        e.preventDefault()
        $(".con").css({
            zIndex:10
        })
        $(this).css({
            zIndex:100
        })
    })
    //console.log(oldv)

   //$(".gb").click(function(){
   //    $(".panel").css("display","none");
   //})
})