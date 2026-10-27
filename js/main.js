/** Page interactions that sit alongside the reference animation runtime. */
(() => {
  const sectionLinks = {
    Jewellery: 'collection',
    Watches: 'collection',
    'Art of living': 'categories',
    Maison: 'footer',
    News: 'footer',
    'SHOP NOW': 'collection',
    About: 'footer',
    'New models': 'collection',
    Contact: 'footer',
    Track: 'footer',
    Orders: 'footer',
    'Find a shop': 'footer',
    Careers: 'footer',
    Terms: 'footer',
  };

  function isVisible(element) {
    return element && window.getComputedStyle(element).display !== 'none';
  }

  function scrollToSection(sectionId) {
    // Desktop categories are pinned; phones use a separate stacked layout.
    const targetId =
      sectionId === 'categories' && window.matchMedia('(max-width: 767px)').matches
        ? 'mobile-categories'
        : sectionId;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.getElementById(targetId)?.scrollIntoView({
      behavior: reduceMotion ? 'instant' : 'smooth',
    });
  }

  function enableKeyboardClick(element, label) {
    if (!element) return;

    element.setAttribute('role', 'button');
    element.setAttribute('tabindex', '0');
    element.setAttribute('aria-label', label);
    element.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      element.click();
    });
  }

  function setupNavigation() {
    const menuToggle = document.querySelector('.menu-parent');
    const navigation = document.querySelector('.nav-links');

    enableKeyboardClick(menuToggle, 'Open navigation');
    enableKeyboardClick(document.querySelector('.close-parent'), 'Close watch features');

    document.querySelectorAll('.btn-parent').forEach((button) => {
      enableKeyboardClick(button, button.textContent.trim());
    });

    document.querySelectorAll('.btn-parent.pull, .btn-parent.dark').forEach((button) => {
      button.addEventListener('click', () => scrollToSection('collection'));
    });

    document.querySelectorAll('a[href="#"]').forEach((link) => {
      const label = link.textContent.trim();
      const sectionId = link.classList.contains('cta-hero') ? 'collection' : sectionLinks[label];
      if (!sectionId) return;

      link.href = `#${sectionId}`;
      link.addEventListener('click', (event) => {
        event.preventDefault();
        if (navigation?.contains(link) && isVisible(navigation)) menuToggle?.click();
        scrollToSection(sectionId);
      });
    });

    document.querySelectorAll('img.logo, img.footer-logo').forEach((logo) => {
      logo.alt = 'Cartier';
      enableKeyboardClick(logo, 'Back to top');
      logo.addEventListener('click', () => scrollToSection('home'));
    });

    document.querySelectorAll('img.watch, img.watch-scroll').forEach((image) => {
      image.alt = 'Cartier luxury watch';
    });

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;

      if (isVisible(document.querySelector('.side-panel-one'))) {
        document.querySelector('.close-parent')?.click();
      } else if (isVisible(navigation)) {
        menuToggle?.click();
      }
    });
  }

  function setupNewsletterPreview() {
    const form = document.getElementById('email-form');
    document.getElementById('email')?.setAttribute('aria-label', 'Email address');
    if (!form) return;

    // Capture submission before the bundled form handler. No email is sent or saved.
    form.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (!form.reportValidity()) return;

        const message = form.parentElement.querySelector('.w-form-done');
        if (!message) return;
        message.textContent = 'Preview only — newsletter signup is not connected.';
        message.setAttribute('role', 'status');
        message.style.display = 'block';
        form.reset();
      },
      true,
    );
  }

  setupNavigation();
  setupNewsletterPreview();
})();
