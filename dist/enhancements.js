(() => {
  const makeButton = (element, label) => {
    if (!element) return;
    element.setAttribute('role', 'button');
    element.setAttribute('tabindex', '0');
    if (label) element.setAttribute('aria-label', label);
    element.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        element.click();
      }
    });
  };
  const menu = document.querySelector('.menu-parent');
  makeButton(menu, 'Open navigation');
  makeButton(document.querySelector('.close-parent'), 'Close watch features');
  document.querySelectorAll('.btn-parent').forEach(el => makeButton(el, el.textContent.trim()));
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  document.querySelectorAll('.btn-parent.pull, .btn-parent.dark').forEach(el => el.addEventListener('click', () => scrollTo('collection')));
  const links = { 'Jewellery':'collection', 'Watches':'collection', 'Art of living':'categories', 'Maison':'footer', 'News':'footer', 'SHOP NOW':'collection', 'About':'footer', 'New models':'collection', 'Contact':'footer', 'Track':'footer', 'Orders':'footer', 'Find a shop':'footer', 'Careers':'footer', 'Terms':'footer' };
  document.querySelectorAll('a[href="#"]').forEach(link => {
    const label = link.textContent.trim();
    let id = link.classList.contains('cta-hero') ? 'collection' : links[label];
    if (!id) return;
    if (id === 'categories' && matchMedia('(max-width: 767px)').matches) id = 'mobile-categories';
    link.href = '#' + id;
    link.addEventListener('click', event => {
      event.preventDefault();
      const nav = document.querySelector('.nav-links');
      if (nav?.contains(link) && getComputedStyle(nav).display !== 'none') menu?.click();
      scrollTo(id);
    });
  });
  document.querySelectorAll('img.logo, img.footer-logo').forEach(img => {
    img.alt = 'Cartier';
    makeButton(img, 'Back to top');
    img.addEventListener('click', () => scrollTo('home'));
  });
  document.querySelectorAll('img.watch, img.watch-scroll').forEach(img => img.alt = 'Cartier luxury watch');
  const email = document.getElementById('email');
  email?.setAttribute('aria-label', 'Email address');
  const form = document.getElementById('email-form');
  form?.addEventListener('submit', event => {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (!form.reportValidity()) return;
    const status = form.parentElement.querySelector('.w-form-done');
    status.textContent = 'Preview only — newsletter signup is not connected.';
    status.setAttribute('role', 'status');
    status.style.display = 'block';
    form.reset();
  }, true);
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const panel = document.querySelector('.side-panel-one');
    if (panel && getComputedStyle(panel).display !== 'none') document.querySelector('.close-parent')?.click();
    else if (getComputedStyle(document.querySelector('.nav-links')).display !== 'none') menu?.click();
  });
})();
