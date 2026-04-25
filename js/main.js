document.addEventListener('DOMContentLoaded', () => {
  const header      = document.querySelector('.site-header');
  const toggle      = document.querySelector('.nav-toggle');
  const navLinks    = document.querySelector('.nav-links');
  const hamburger   = toggle && toggle.querySelector('.icon-hamburger');
  const closeIcon   = toggle && toggle.querySelector('.icon-close');

  // Scroll state
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('is-scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  // Mobile menu open/close
  function openMenu() {
    if (!navLinks || !toggle) return;
    navLinks.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    if (hamburger) hamburger.hidden = true;
    if (closeIcon) closeIcon.hidden = false;
  }

  function closeMenu() {
    if (!navLinks || !toggle) return;
    navLinks.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    if (hamburger) hamburger.hidden = false;
    if (closeIcon) closeIcon.hidden = true;
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      navLinks && navLinks.classList.contains('is-open') ? closeMenu() : openMenu();
    });
  }

  // Close when a nav link is clicked
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (header && !header.contains(e.target)) {
      closeMenu();
    }
  });

  // Active link highlighting
  const currentPath = window.location.pathname;
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
      const href = link.getAttribute('href') || '';
      const hrefBase = href.replace('.html', '').replace(/\/$/, '');
      const pathBase = currentPath.replace('.html', '').replace(/\/$/, '');

      if (
        (hrefBase !== '' && pathBase.endsWith(hrefBase)) ||
        (hrefBase === '' && (currentPath === '/' || pathBase === '' || currentPath === '/index.html'))
      ) {
        link.classList.add('is-active');
      }
    });
  }
});
