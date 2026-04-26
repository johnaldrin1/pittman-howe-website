document.addEventListener('DOMContentLoaded', () => {
  const header   = document.querySelector('.site-header');
  const toggle   = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Scroll state
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('is-scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  // Mobile menu open/close
  function closeMenu() {
    if (!navLinks || !toggle) return;
    navLinks.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
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
