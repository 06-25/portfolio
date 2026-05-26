gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({ ignoreMobileResize: true });

//header-sec
const showAnim = gsap.from('.header-sec', {
  top: '-8rem',
  paused: true,
  duration: 0.2
}).progress(1);

ScrollTrigger.create({
  start: "top top",
  end: "max",
  onUpdate: (self) => {
    if (window.innerWidth <= 768) {
      showAnim.play();
      return;
    }
    self.direction === -1 ? showAnim.play() : showAnim.reverse();
  }
});

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 200);
});

//mobile-nav
const burger        = document.querySelector('.burger');
const mobileNav     = document.querySelector('.mobile-nav');
const mobileOverlay = document.querySelector('.mobile-nav__overlay');
const mobileClose   = document.querySelector('.mobile-nav__close');
const mobileLinks   = document.querySelectorAll('.mobile-nav__list a');

const openMobileNav = () => {
  mobileNav.classList.add('is-open');
  mobileOverlay.classList.add('is-open');
  burger.classList.add('is-active');
  burger.setAttribute('aria-expanded', 'true');
  mobileNav.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';
  showAnim.play();
};

const closeMobileNav = () => {
  mobileNav.classList.remove('is-open');
  mobileOverlay.classList.remove('is-open');
  burger.classList.remove('is-active');
  burger.setAttribute('aria-expanded', 'false');
  mobileNav.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

burger.addEventListener('click', openMobileNav);
mobileClose.addEventListener('click', closeMobileNav);
mobileOverlay.addEventListener('click', closeMobileNav);
mobileLinks.forEach((link) => link.addEventListener('click', closeMobileNav));

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMobileNav();
});

//strength-sec
document.querySelectorAll('.strength').forEach((item) => {
  gsap.from(item, {
    y: 40,
    opacity: 0,
    duration: 0.5,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: item,
      start: 'top 60%',
      toggleActions: 'play none none reverse',
    },
  });
});

//text-wrap
document.querySelectorAll('.text-wrap').forEach((wrap) => {
  const spans = wrap.querySelectorAll('p > span');
  if (!spans.length) return;

  gsap.from(spans, {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.12,
    scrollTrigger: {
      trigger: wrap,
      start: 'top 75%',
      toggleActions: 'play none none none',
    },
  });
});

//skills-sec
const setMoveHorizontalText = (array) => {
  const tl = gsap.timeline();
  tl.addLabel('text', 0);
  array.forEach((el, idx) => {
    tl.to(
      el,
      {
        x: () => (idx % 2 === 0 ? '-10rem' : '10rem'),
        repeatRefresh: true,
      },
      `text+=${idx * 0.05}`
    );
  });
  return tl;
};

//skills-wrap
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
    invalidateOnRefresh: true,
  });
});

//project-sec — 데스크탑 전용 핀 애니메이션
const mm = gsap.matchMedia();

mm.add('(min-width: 769px)', () => {
  const panels = gsap.utils.toArray('.project');
  panels.pop();

  panels.forEach((panel) => {
    const innerpanel = panel.querySelector('.project-inner');
    if (!innerpanel) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: panel,
        start: 'bottom bottom',
        end: 'bottom top',
        pinSpacing: false,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    tl.fromTo(panel, { scale: 1, opacity: 1 }, { scale: 0.7, opacity: 0.5, duration: 0.9 })
      .to(panel, { opacity: 0, duration: 0.1 });
  });
});
