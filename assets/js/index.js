gsap.registerPlugin(ScrollTrigger);

//header-sec
const showAnim = gsap.from('.header-sec', { 
  yPercent: -200,
  paused: true,
  duration: 0.2
}).progress(1);

ScrollTrigger.create({
  start: "top top",
  end: "max",
  // markers: true,
  onUpdate: (self) => {
    self.direction === -1 ? showAnim.play() : showAnim.reverse()
  }
});

//text-wrap
document.querySelectorAll('.text-wrap').forEach((wrap) => {
  gsap.timeline({
    scrollTrigger: {
      trigger: wrap,
      start: '0% 50%',
      end: '100% 80%',
      scrub: 1,
    },
  })
  .from(wrap.querySelectorAll('p'), {
    y: 100,
    opacity: 0,
    stagger: {
      each: 0.2,
      ease: 'power3.inOut',
    },
  });
});

//strength-sec
const setMoveHorizontalText = (array) => {
  const tl = gsap.timeline();

  tl.addLabel('text', 0);

  array.forEach((el, idx) => {
    tl.to(
      el,
      {
        x: () => (idx % 2 === 0 ? '-20rem' : '20rem'),
        repeatRefresh: true,
      },
      `text+=${idx * 0.05}`
    );
  });

  return tl;
};

//skills-wrap 공통 애니메이션 — skills-wrap이 추가되면 자동 적용
document.querySelectorAll('.skills-wrap').forEach((wrap) => {
  const items = [...wrap.querySelectorAll('p')];
  if (!items.length) return;

  const tl = setMoveHorizontalText(items);

  ScrollTrigger.create({
    trigger: wrap,
    start: 'top bottom',
    end: 'bottom top',
    animation: tl,
    scrub: 1,
  });
});

//img-sec
const initImgSection = () => {
  const images = document.querySelectorAll('#img-sec .img-image img');
  if (!images.length) return;

  const listItems = gsap.utils.toArray('#img-sec .img-text ul li');
  const lastImage = images[images.length - 1];

  gsap.set(images, { zIndex: 0, opacity: 0 });
  gsap.set(images[0], { opacity: 1, zIndex: 1 });

  ScrollTrigger.create({
    trigger: '.img-image',
    start: 'top top',
    endTrigger: '.img-text',
    end: 'bottom bottom',
    pin: true,
    pinSpacing: false,
  });

  listItems.forEach((li, index) => {
    ScrollTrigger.create({
      trigger: li,
      start: 'top 60%',
      end: 'bottom top',
      onEnter: () => gsap.set(images[index], { opacity: 1, zIndex: 1 }),
      // ✅ 첫 번째 이미지는 LeaveBack 시에도 opacity 유지
      onLeaveBack: () => {
        if (index === 0) return;
        gsap.set(images[index], { opacity: 0, zIndex: 0 });
      },
      invalidateOnRefresh: true,
    });
  });

  gsap.fromTo(
    lastImage,
    { scale: 1 },
    {
      scale: 3.1,
      ease: 'none',
      scrollTrigger: {
        trigger: listItems[listItems.length - 1],
        start: 'top 60%',
        end: 'bottom top',
        scrub: true,
      },
    }
  );
};

//project-sec
var panels = gsap.utils.toArray(".project");
panels.pop();

panels.forEach((panel, i) => {
  
  let innerpanel = panel.querySelector(".project-inner");
  
  let panelHeight = innerpanel.offsetHeight;
  console.log(panelHeight)
  
  let windowHeight = window.innerHeight;
  
  let difference = panelHeight - windowHeight;
  
  let fakeScrollRatio = difference > 0 ? (difference / (difference + windowHeight)) : 0;
  
  if (fakeScrollRatio) {
    panel.style.marginBottom = panelHeight * fakeScrollRatio + "px";
  }
  
  let tl = gsap.timeline({
    scrollTrigger:{
      trigger: panel,
      start: "bottom bottom",
      end: () => fakeScrollRatio ? `+=${innerpanel.offsetHeight}` : "bottom top",
      pinSpacing: false,
      pin: true,
      scrub: true
    }
  });
  
  if (fakeScrollRatio) {
    tl.to(innerpanel, {yPercent:-100, y: window.innerHeight, duration: 1 / (1 - fakeScrollRatio) - 1, ease: "none"});
  }
  tl.fromTo(panel, {scale:1, opacity:1}, {scale: 0.7, opacity: 0.5, duration: 0.9})
    .to(panel, {opacity:0, duration: 0.1});
});

initImgSection();

