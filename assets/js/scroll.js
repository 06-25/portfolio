$(document).ready(function(){

  let ani = $(".fade");

  //Scroll
  $.fn.scrollMoving = function(){
    let elementTop = $(this).offset().top;
    let elementBottom = elementTop + $(this).outerHeight();

    let viewportTop = $(window).scrollTop();
    let viewportBottom = viewportTop + $(window).height();

    return (viewportTop < elementBottom) && (elementTop < viewportBottom);
  };

  // rAF throttle: 스크롤 이벤트는 60fps보다 잦게 발생하므로
  // 최대 1프레임당 1번만 layout read가 일어나도록 throttle
  let ticking = false;

  $(window).on("load scroll", function(){
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(function(){
      ani.each(function(){
        if($(this).scrollMoving()){
          $(this).addClass("moving");
        } else {
          $(this).removeClass("moving"); // 뷰포트 밖으로 나가면 클래스 제거
        }
      });
      ticking = false;
    });
  });

  // historyAnimation
  $(".tab li").click(function(){
    let tabNum = $(this).index();
    let tabMove = 70*tabNum;
    $(".tab-header").animate({top:tabMove});
    $(this).addClass("active");
    $(this).siblings().removeClass("active");

    let tabResult = $(this).attr("data-alt");
    $(".tab-contents div").removeClass("active");
    $("#"+tabResult).addClass("active");
  });

  //eventButtonEffect
  $(".port-list ul li").slice(0,3).show();

  $(".load-more").click(function(){
    $(".port-list ul li:hidden").slice(0,3).fadeIn();
    if($('.port-list ul li:hidden').length == 0) {
      $(this).hide()
    }
  });


});