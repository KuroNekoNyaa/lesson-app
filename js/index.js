
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth>=640){
                docEl.style.fontSize = '100px';
            }else{
                docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
    recalc();
})(document, window);


var $left_arrow = $('.left-arrow'),
    $right_arrow = $('.right-arrow'),
    $pagination = $('.pagination span'),
    $inner = $('.inner'),
    imgWidth = $('.innerwraper img').eq(0).width(),
    index = 0,
    flag = true
;

/*
** 导航切换
 */
$pagination.on('click', function (event) {
    //手动切换的时候就清除自动播放的timer
    clearInterval(timer);
    index = $pagination.index($(this));
    selectPic(index);

})

/*
** 点击箭头切换
 */
$left_arrow.on('click', function () {
    clearInterval(timer);
    index--;
    if(index < 0) {
        index = 3
    }
    selectPic(index);
})

$right_arrow.on('click', function () {
    index++;
    if (index %4 ===0) {
        index = 0;
    }
    selectPic(index);
    clearInterval(timer);
});

function selectPic(num) {
    clearInterval(timer);
    $pagination.eq(num).addClass('active').siblings().removeClass('active');
    // 自动播放
    if (num % 4 === 0) {
        $pagination.eq(0).addClass('active').siblings().removeClass('active');
    }

    $inner.stop().animate({
        left: -num * imgWidth
    }, 1000, function () {
        //点击切换图片效果后三秒再开始自动播放
        timer = setInterval(go, 3000);
        //自动播放检查是否到最后一张
        if (index %4 ===0) {
            index = 0;
            $inner.css('left', '0px');
        }
    })
}
/*
** 自动播放
 */
function autoGo(flag) {
    if (flag) {
        timer = setInterval(go, 3000);
    }
}
autoGo(flag)

function go() {
    index++;
    selectPic(index)
}

// hover状态停止自动播放 离开恢复
$inner.on('mouseover', function () {
    clearInterval(timer);
});

$inner.on('mouseout', function () {
    timer = setInterval(go, 3000);
})


var footer_icon = $('.footer-icon'),
    footer_a = $('.footer-icon a');

footer_icon.on('click', function (e) {
    footer_a.removeClass('icon-active');
    $(this).children().addClass('icon-active');
});
