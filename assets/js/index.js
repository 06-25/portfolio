history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({ ignoreMobileResize: true });

const BREAKPOINT_MOBILE = 768;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// -------------------------------------------------------
// main-sec — 텍스트 순환
// -------------------------------------------------------
const cycleItems = document.querySelectorAll('.main-cycle-item');
if (cycleItems.length) {
  let activeIdx = 0;

  gsap.set(cycleItems, { opacity: 0 });
  gsap.set(cycleItems[0], { opacity: 1 });

  if (!reducedMotion) {
    setInterval(() => {
      const current = cycleItems[activeIdx];
      const nextIdx = (activeIdx + 1) % cycleItems.length;
      const next    = cycleItems[nextIdx];

      gsap.killTweensOf([current, next]);

      gsap.timeline()
        .to(current, { opacity: 0, duration: 0.4, ease: 'power2.in' })
        .fromTo(next, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' });

      activeIdx = nextIdx;
    }, 5000);
  }
}

// -------------------------------------------------------
// header-sec
// -------------------------------------------------------
const showAnim = gsap.from('.header-sec', {
  top: '-8rem',
  paused: true,
  duration: reducedMotion ? 0 : 0.2,
}).progress(1);

ScrollTrigger.create({
  start: 'top top',
  end: 'max',
  onUpdate: (self) => {
    if (window.innerWidth <= BREAKPOINT_MOBILE) {
      showAnim.play();
      return;
    }
    self.direction === -1 ? showAnim.play() : showAnim.reverse();
  },
});

let resizeTimer;
let prevWidth = window.innerWidth;
window.addEventListener('resize', () => {
  const currentWidth = window.innerWidth;
  if (currentWidth === prevWidth) return;
  prevWidth = currentWidth;
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 200);
});

// -------------------------------------------------------
// mobile-nav
// -------------------------------------------------------
const burger        = document.querySelector('.burger');
const mobileNav     = document.querySelector('.mobile-nav');
const mobileOverlay = document.querySelector('.mobile-nav-overlay');
const mobileClose   = document.querySelector('.mobile-nav-close');
const mobileLinks   = document.querySelectorAll('.mobile-nav-list a');

const openMobileNav = () => {
  mobileNav.classList.add('is-open');
  mobileOverlay.classList.add('is-open');
  burger.classList.add('is-active');
  burger.setAttribute('aria-expanded', 'true');
  mobileNav.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';
  showAnim.play();
  mobileClose.focus();
};

const closeMobileNav = () => {
  mobileNav.classList.remove('is-open');
  mobileOverlay.classList.remove('is-open');
  burger.classList.remove('is-active');
  burger.setAttribute('aria-expanded', 'false');
  mobileNav.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  burger.focus();
};

burger.addEventListener('click', openMobileNav);
mobileClose.addEventListener('click', closeMobileNav);
mobileOverlay.addEventListener('click', closeMobileNav);
mobileLinks.forEach((link) => link.addEventListener('click', closeMobileNav));

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) closeMobileNav();
});

// -------------------------------------------------------
// strength-sec
// -------------------------------------------------------
document.querySelectorAll('.strength').forEach((item) => {
  gsap.from(item, {
    y: reducedMotion ? 0 : 40,
    opacity: 0,
    duration: reducedMotion ? 0.3 : 0.5,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: item,
      start: 'top 60%',
      toggleActions: 'play none none reverse',
    },
  });
});

// -------------------------------------------------------
// text-wrap
// -------------------------------------------------------
document.querySelectorAll('.text-wrap').forEach((wrap) => {
  const spans = wrap.querySelectorAll('p > span');
  if (!spans.length) return;

  gsap.from(spans, {
    y: reducedMotion ? 0 : 30,
    opacity: 0,
    duration: reducedMotion ? 0.3 : 0.8,
    ease: 'power3.out',
    stagger: reducedMotion ? 0 : 0.12,
    scrollTrigger: {
      trigger: wrap,
      start: 'top 45%',
      toggleActions: 'play none none reverse',
    },
  });
});

// -------------------------------------------------------
// skills-sec — prefers-reduced-motion 시 수평 이동 스킵
// -------------------------------------------------------
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

if (!reducedMotion) {
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
}

// -------------------------------------------------------
// project-sec
// -------------------------------------------------------
if (window.innerWidth > BREAKPOINT_MOBILE) {
  const panels = gsap.utils.toArray('.project');
  panels.pop();

  panels.forEach((panel) => {
    const innerpanel = panel.querySelector('.project-inner');
    if (!innerpanel) return;

    const panelHeight = innerpanel.offsetHeight;
    const windowHeight = window.innerHeight;
    const difference = panelHeight - windowHeight;
    const fakeScrollRatio = difference > 0 ? (difference / (difference + windowHeight)) : 0;

    if (fakeScrollRatio) {
      panel.style.marginBottom = panelHeight * fakeScrollRatio + 'px';
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: panel,
        start: 'bottom bottom',
        end: () => fakeScrollRatio ? `+=${innerpanel.offsetHeight}` : 'bottom top',
        pinSpacing: false,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    if (fakeScrollRatio) {
      tl.to(innerpanel, {
        yPercent: -100,
        y: window.innerHeight,
        duration: 1 / (1 - fakeScrollRatio) - 1,
        ease: 'none',
      });
    }

    tl.fromTo(
      panel,
      { scale: 1, opacity: 1 },
      { scale: reducedMotion ? 1 : 0.7, opacity: 0.5, duration: 0.9 }
    ).to(panel, { opacity: 0, duration: 0.1 });
  });
}
