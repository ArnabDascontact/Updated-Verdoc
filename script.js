
(function () {
  const body = document.body;

  // Stable favicon / title in case the browser caches the old file.
  const iconSources = [
    'assets/favicon.ico',
    'assets/favicon.png',
    'assets/logo64.png',
  ];
  let icon = document.querySelector("link[rel='icon']");
  if (!icon) {
    icon = document.createElement('link');
    icon.rel = 'icon';
    document.head.appendChild(icon);
  }
  icon.type = 'image/x-icon';
  icon.href = iconSources[0];

  const apple = document.querySelector("link[rel='apple-touch-icon']") || document.createElement('link');
  apple.rel = 'apple-touch-icon';
  apple.href = 'assets/apple-touch-icon.png';
  if (!apple.parentNode) document.head.appendChild(apple);

  const els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('in');
      });
    }, { threshold: 0.16 });
    els.forEach((el) => io.observe(el));
  } else {
    els.forEach((el) => el.classList.add('in'));
  }

  // Intro animation on home page only.
  const intro = document.querySelector('[data-intro]');
  if (intro) {
    let step = 0;
    const stepEl = intro.querySelector('[data-step]');
    const steps = [
      'Verified access for modern healthcare outreach.',
      '<span class="white">Ver</span><span class="accent">ified</span> <span class="white">Doc</span><span class="accent">tors</span>',
      'Recruitment, outreach, and survey participation across the USA and Europe.',
    ];
    const setStep = (i) => { if (stepEl) stepEl.innerHTML = steps[i]; };

    setStep(step);
    const t1 = setTimeout(() => { step = 1; setStep(step); }, 900);
    const t2 = setTimeout(() => { step = 2; setStep(step); }, 2000);
    const t3 = setTimeout(() => { intro.classList.add('hide'); }, 3600);

    // Remove the intro to reveal content and avoid a blank white page feeling.
    setTimeout(() => { intro.remove(); }, 4100);

    window.addEventListener('beforeunload', () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
    });
  }
})();
