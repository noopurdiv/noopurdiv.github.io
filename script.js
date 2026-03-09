/* ========================================================================
   NOOPUR DIVEKAR — Portfolio v2 JavaScript
   Nav, scroll reveals, carousels, expandable experience, skills/project filters
   ======================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVIGATION =====
  const nav = document.getElementById('navbar');
  const navLinks = document.getElementById('navLinks');
  const navToggle = document.getElementById('navToggle');
  const navOverlay = document.getElementById('navOverlay');
  const links = document.querySelectorAll('.nav__link');

  const handleNavScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  const toggleMenu = () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open');
    navOverlay.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  navToggle.addEventListener('click', toggleMenu);
  navOverlay.addEventListener('click', toggleMenu);

  links.forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) toggleMenu();
    });
  });

  // Active link highlighting
  const sections = document.querySelectorAll('section[id]');
  const highlightNav = () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav__link[href="#${id}"]`);
      if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });

  // ===== SCROLL REVEAL =====
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  revealElements.forEach(el => revealObserver.observe(el));

  // ===== CAROUSELS =====
  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const slides = carousel.querySelector('.project-card__slides');
    const slideItems = slides.querySelectorAll('.project-card__slide');
    const prevBtn = carousel.querySelector('.project-card__nav--prev');
    const nextBtn = carousel.querySelector('.project-card__nav--next');
    const dots = carousel.querySelectorAll('.project-card__dot');
    const total = slideItems.length;
    let current = 0;

    if (total <= 1) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      return;
    }

    const goTo = (i) => {
      current = ((i % total) + total) % total;
      slides.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, j) => d.classList.toggle('active', j === current));
    };

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
    dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
  });

  // ===== SKILLS FILTER =====
  const skillFilterBtns = document.querySelectorAll('.skills__filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  skillFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      skillFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      skillCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ===== PROJECT FILTER =====
  const projFilterBtns = document.querySelectorAll('.projects__filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  projFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.projectFilter;
      projFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach(card => {
        const categories = card.dataset.projectCategories || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ===== HERO PARALLAX =====
  const heroImage = document.querySelector('.hero__photo-inline');
  if (heroImage) {
    window.addEventListener('scroll', () => {
      if (window.scrollY < window.innerHeight) {
        // subtle effect only
      }
    }, { passive: true });
  }

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
