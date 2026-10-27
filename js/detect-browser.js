// Run in the head so initial animation styles are active before the first paint.
(() => {
  const root = document.documentElement;
  root.classList.add('w-mod-js', 'is-starting');

  if (
    'ontouchstart' in window ||
    (window.DocumentTouch && document instanceof window.DocumentTouch)
  ) {
    root.classList.add('w-mod-touch');
  }
})();
