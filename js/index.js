$(function () {
    // 显示隐藏回到顶部按钮
    var tooltop = $("main").offset().top;
    var flag = true;

    $(window).scroll(function () {
        if (flag) {
            if ($(document).scrollTop() >= tooltop-10) {
                $("#top-back").fadeIn();
                $(".head-navbox").css("background-color", "rgba(0, 0, 0, .9)")
                $("main>section").each(function (i, ele) {
                    if ($(document).scrollTop() > $(ele).offset().top-10) {
                        $(".head-right>ul>li").eq(i + 1).addClass("nav-current").siblings().removeClass("nav-current");
                    }
                })
            } else {
                $("#top-back").fadeOut();
                $(".head-navbox").css("background-color", "transparent")
                $(".head-right>ul>li:eq(0)").addClass("nav-current").siblings("li").removeClass("nav-current");
            }
        }
    })

    $(".head-right>ul>li").click(function () {
        flag = false;
        if ($(this).index() > 0) {
            var current = $("main>section").eq($(this).index() - 1).offset().top;
            console.log(current)
            $("body,html").stop().animate({
                scrollTop: current
            }, function () {
                flag = true;
            })
        } else {
            $("body,html").stop().animate({
                scrollTop: 0
            }, function () {
                flag = true;
            })
        }
        $(this).addClass("nav-current").siblings().removeClass("nav-current");
    })
    // 鼠标滑过nav切换效果
    // $(".head-right>ul>li").mouseover(function () {
    //     $(this).addClass("nav-current").siblings("li").removeClass("nav-current");
    // }).mouseout(function () {
    //     $(this).removeClass("nav-current");
    // })

    // 轮播图效果
    let index = 0
    let time = ''
    // 鼠标滑动起始位置
    let start = 0
    // 鼠标滑动结束位置
    let end = 0
    automatic()
    // 上一张逻辑
    function Previous () {
        // 将原先展示（拥有activeImg类名的图片）先保存
        let old = $(".banner-active")
        // 隐藏先前显示的照片
        old.removeClass("banner-active").fadeOut(2000)
        // 判断是否是第一张图片
        // Started为第一张图片的独有类名，用来判断是否为第一张图片，判断上一张边界逻辑
        if (old.is(".Started")) {
            // 是则将最后一张图片显示
            $(".Ending").addClass("banner-active").fadeIn(2000)
        }
        // 否则显示上一张图片
        old.prev().addClass("banner-active").fadeIn(2000)
        // 根据当前显示照片的下标决定显示的圆点
        index = $(".banner-active").index()
        // 调用圆点逻辑方法
        yuanActive()
    }
    // 下一张逻辑
    function Next () {
        let old = $(".banner-active")
        old.removeClass("banner-active").fadeOut(2000)
        // 判断是否是最后一张图片
        // Started为最后一张图片的独有类名，用来判断是否为最后一张图片，判断下一张边界逻辑
        if (old.is(".Ending")) {
            $(".Started").addClass("banner-active").fadeIn(2000)
        }
        old.next().addClass("banner-active").fadeIn(2000)
        $(".banner-active").index(this)
        index = $(".banner-active").index()
        yuanActive()
    }
    // 圆点显示逻辑
    function yuanActive () {
        let arr = $(`.circle-item:nth-child(${index + 1})`)
        $(".circle-active").removeClass("circle-active")
        arr.addClass("circle-active")
    }
    // 计时器
    function automatic () {
        time = setInterval(() => {
            Next()
        }, 5000)
    }
    //鼠标点击事件
    $(".scroll-backgro").mousedown(function (e) {
        // console.log('x:' + e.pageX + 'y:' + e.pageY)
        start = e.pageX
        clearInterval(time)
    })
    // 左键松开事件
    $(".scroll-backgro").mouseup(function (e) {
        // console.log('x:' + e.pageX + 'y:' + e.pageY)
        end = e.pageX
        automatic()
        if (start - end > 100) {
            // console.log("左划")
            Next()
        } else if (end - start > 100) {
            // console.log("右划")
            Previous()
        }
    })
})
