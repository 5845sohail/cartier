/** Both the navigation dropdown and collection use the same draggable carousel. */
(() => {
  const carouselOptions = {
    perPage: 4,
    perMove: 1,
    focus: 'left',
    type: 'slide',
    gap: '2rem',
    arrows: true,
    pagination: true,
    speed: 800,
    dragAngleThreshold: 80,
    autoWidth: false,
    rewind: false,
    rewindSpeed: 800,
    waitForTransition: false,
    updateOnMove: true,
    trimSpace: true,
    breakpoints: {
      991: { perPage: 2, gap: '2rem' },
      767: { perPage: 2, gap: '1rem' },
      479: { perPage: 1.5, gap: '1rem' },
    },
  };

  document.querySelectorAll('.slider1').forEach((element) => {
    new Splide(element, carouselOptions).mount();
  });
})();
