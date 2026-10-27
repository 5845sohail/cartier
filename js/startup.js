/** Black logo screen, upward curtain reveal, then the hero caption. */
(() => {
  const root = document.documentElement;
  const curtain = document.querySelector('.intro-loader');
  const logo = document.querySelector('.intro-logo');
  const hero = document.querySelector('.full-slider');
  const caption = document.querySelector('.hero-title');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const animations = [];

  // These timings follow the reference intro, in milliseconds from startup.
  const timing = {
    logoDelay: 400,
    logoFadeIn: 1000,
    logoFadeOut: 1000,
    revealDelay: 1800,
    revealDuration: 1200,
    captionDelay: 2800,
    captionDuration: 2000,
  };

  function finishIntro() {
    root.classList.remove('is-starting');
    animations.forEach((animation) => animation.cancel());
    curtain?.remove();
  }

  async function playIntro() {
    if (!curtain || !logo || !hero || !caption) {
      finishIntro();
      return;
    }

    window.scrollTo(0, 0);

    // Decode the eager-loaded logo before timing its fade; don't wait for video.
    try {
      await logo.decode();
    } catch {
      finishIntro();
      return;
    }

    if (reduceMotion.matches) {
      // Keep the branded opening, but replace large movement with a brief dissolve.
      logo.style.opacity = '1';
      const dissolve = curtain.animate([{ opacity: 1 }, { opacity: 0 }], {
        delay: 700,
        duration: 200,
        fill: 'both',
      });
      animations.push(dissolve);
      try {
        await dissolve.finished;
      } catch {
        // A preference change may dismiss the intro before the dissolve finishes.
      } finally {
        finishIntro();
      }
      return;
    }

    const totalLogoTime = timing.logoFadeIn + timing.logoFadeOut;
    animations.push(
      logo.animate(
        [
          { opacity: 0, offset: 0, easing: 'ease' },
          { opacity: 1, offset: timing.logoFadeIn / totalLogoTime, easing: 'ease' },
          { opacity: 0, offset: 1 },
        ],
        { delay: timing.logoDelay, duration: totalLogoTime, fill: 'both' },
      ),
    );

    const revealOptions = {
      delay: timing.revealDelay,
      duration: timing.revealDuration,
      easing: 'cubic-bezier(0.77, 0, 0.175, 1)',
      fill: 'both',
    };
    animations.push(
      curtain.animate(
        [{ transform: 'translateY(0)' }, { transform: 'translateY(-100%)' }],
        revealOptions,
      ),
    );
    animations.push(
      hero.animate(
        [{ transform: 'translateY(50%)' }, { transform: 'translateY(0)' }],
        revealOptions,
      ),
    );
    animations.push(
      caption.animate([{ opacity: 0 }, { opacity: 1 }], {
        delay: timing.captionDelay,
        duration: timing.captionDuration,
        easing: 'ease',
        fill: 'both',
      }),
    );

    // Let scrolling resume as soon as the curtain clears, while text fades in.
    const heroReveal = animations[2];
    heroReveal.finished
      .then(() => {
        root.classList.remove('is-starting');
      })
      .catch(() => {});

    try {
      await Promise.all(animations.map((animation) => animation.finished));
    } catch {
      // Changing the motion preference can cancel the intro midway through.
    } finally {
      finishIntro();
    }
  }

  reduceMotion.addEventListener('change', (event) => {
    if (event.matches) finishIntro();
  });

  // Runs once after the slider initializes; resizing won't replay the loader.
  window.Webflow.push(playIntro);
})();
