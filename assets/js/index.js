gsap.registerPlugin(ScrollTrigger);

const initStrengthSection = () => {
  const scenes = [...document.querySelectorAll('.strength-inner')];

  // 원 → 전체화면 애니메이션을 위한 초기 transform 설정
  gsap.set('.strength-inner.circle', {
    xPercent: -50,
    yPercent: -50,
  });

  const tl = gsap.timeline();

  // circle event
  tl.to('.strength-inner.circle', {
    width: innerWidth,
    height: innerHeight,
    borderRadius: 0,
    ease: 'none',
  });

  //fade in
  tl.to('.strength-inner.circle .strength-title', {
    opacity: 1,
    duration: 0.25,
    ease: 'power1.in',
  }, 0.25);

  // video event
  scenes.forEach((el, idx) => {
    if (idx !== 0) {
      tl.to(scenes[idx - 1], { opacity: 0 }, `scene${idx}`);
      tl.to(el, { opacity: 1 }, `scene${idx}+=0.5`);
    }
  });

  ScrollTrigger.create({
    trigger: '.strength-wrap',
    start: 'top top',
    end: `+=${2000 + (scenes.length - 1) * 2000}`,
    animation: tl,
    pin: true,
    scrub: 0.5,
    markers: true,
  });
};

initStrengthSection();
