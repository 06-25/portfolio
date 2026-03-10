/* cursor */
$(document).ready(function () {
  const $cursor = $(".cursor");
  if (!$cursor.length) return;

  $(document).on("mousemove", function (e) {
    $cursor.css({
      top:  (e.clientY - 15) + "px",
      left: (e.clientX - 30) + "px"
    });
  });

  $(document).on("mouseenter", "a, button, .list, [href]", function () {
    $cursor.addClass("is-hover");
  }).on("mouseleave", "a, button, .list, [href]", function () {
    $cursor.removeClass("is-hover");
  });

  /* skill icon hover */
  const skills = [
    { n: 1, off: "html.svg",       on: "html2.svg"       },
    { n: 2, off: "css.svg",        on: "css2.svg"        },
    { n: 3, off: "jquery.svg",     on: "jquery2.svg"     },
    { n: 4, off: "javascript.svg", on: "javascript2.svg" },
    { n: 6, off: "figma.svg",      on: "figma2.svg"      },
    { n: 7, off: "photoshop.svg",  on: "photoshop2.svg"  },
  ];
  skills.forEach(({ n, off, on }) => {
    $(".skills_wrap img:nth-child(" + n + ")")
      .on("mouseenter", function () { $(this).attr("src", "assets/images/ui/" + on);  })
      .on("mouseleave", function () { $(this).attr("src", "assets/images/ui/" + off); });
  });
});

/* project_sec */
gsap.registerPlugin(ScrollTrigger);

const sections = gsap.utils.toArray('#project_sec .sec');

// 패널 고정
sections.forEach((el, i) => {
  ScrollTrigger.create({
    trigger: el,
    start: 'top top',
    end: 'bottom top',
    pin: true,
    pinSpacing: false
  });

  // 진입: 아래에서 슬라이드업
  gsap.from(el, {
    scale: 0.7,
    yPercent: 6,
    ease: 'none',
    scrollTrigger: {
      trigger: el,
      start: 'top bottom',
      end: 'top top',
      scrub: true
    }
  });

  // 이탈: 뒤로 물러나며 축소 (마지막 패널 제외)
  if (i < sections.length - 1) {
    gsap.to(el, {
      scale: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }
});

/* swiper */
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    280:  { slidesPerView: 1 },
    768:  { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
});

/* list_sec */
let activeImage;

gsap.utils.toArray('#list_sec .list_wrap a.list').forEach((elem) => {
  const image = elem.querySelector('img.fade');

  // quickTo로 생성한 헬퍼 함수를 저장해 mousemove 시 재사용
  const xTo = gsap.quickTo(image, "x", { duration: 0.5, ease: "power3" });
  const yTo = gsap.quickTo(image, "y", { duration: 0.5, ease: "power3" });
  const fade = gsap.to(image, { autoAlpha: 1, ease: 'none', paused: true });

  const onMove = (e) => { xTo(e.clientX); yTo(e.clientY); };

  elem.addEventListener('mouseenter', (e) => {
    
    gsap.set(image, {
      x: activeImage ? gsap.getProperty(activeImage, "x") : e.clientX,
      y: activeImage ? gsap.getProperty(activeImage, "y") : e.clientY,
    });
    activeImage = image;
    fade.play();
    document.addEventListener('mousemove', onMove);
  });

  elem.addEventListener('mouseleave', () => {
    fade.reverse();
    document.removeEventListener('mousemove', onMove);
  });
});

