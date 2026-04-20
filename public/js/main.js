/* BioSynth — Website JS
   Mantido minimo: scroll-reveal, menu mobile, active-link.
   Sem frameworks, sem dependencias.
*/

(function () {
  'use strict';

  // ---------------- Scroll reveal ----------------
  const revealEls = document.querySelectorAll('.bio-fade-up');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // ---------------- Menu mobile ----------------
  const nav = document.getElementById('bioNav');
  const toggle = document.getElementById('bioNavToggle');

  if (nav && toggle) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    });

    nav.querySelectorAll('.bio-nav__link').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menu');
      });
    });
  }

  // ---------------- Smooth scroll para anchors ----------------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (ev) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      ev.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ---------------- Shadow na nav ao scrollar ----------------
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 8) {
        nav.style.borderBottomColor = 'var(--bio-border)';
        nav.style.boxShadow = '0 1px 2px rgba(15, 40, 24, 0.04)';
      } else {
        nav.style.boxShadow = 'none';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
