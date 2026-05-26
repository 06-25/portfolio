gsap.registerPlugin(ScrollTrigger);

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
  mobileNav.setAttribute('aria-hidden', 'false');
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
  gsap.timeline({
    scrollTrigger: {
      trigger: wrap,
      start: '0% 50%',
      end: '100% 40%',
      scrub: 0.6,
    },
  })
  .from(wrap.querySelectorAll('span'), {
    y: 30,
    opacity: 0,
    stagger: {
      each: 0.6,
      ease: 'power3.inOut',
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

  listItems.forEach((li, index) => {
    ScrollTrigger.create({
      trigger: li,
      start: 'top center',
      end: 'bottom top',
      onEnter: () => {
        gsap.set(images[index], { zIndex: 1 });
        gsap.to(images[index], { opacity: 1, duration: 0.6, ease: 'power2.inOut' });
      },
      onLeaveBack: () => {
        if (index === 0) return;
        gsap.to(images[index], {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => gsap.set(images[index], { zIndex: 0 }),
        });
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
        end: 'bottom 80%',
        scrub: 1.5,
      },
    }
  );
};

//project-sec
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

  tl.fromTo(panel, { scale: 1, opacity: 1 }, { scale: 0.7, opacity: 0.5, duration: 0.9 })
    .to(panel, { opacity: 0, duration: 0.1 });
});


