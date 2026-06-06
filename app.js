(() => {
  const intro = document.getElementById("introScreen");
  const reveals = document.querySelectorAll(".reveal");

  document.addEventListener("DOMContentLoaded", () => {
    document.title = document.title || "Verdoc — Verified Doctors";
    const ensureFavicon = (href, type) => {
      let link = document.querySelector(`link[rel="icon"][href="${href}"]`);
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        link.href = href;
        if (type) link.type = type;
        document.head.appendChild(link);
      }
    };
    ensureFavicon("favicon.ico", "image/x-icon");
    ensureFavicon("favicon.png", "image/png");
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("in-view");
      });
    },
    { threshold: 0.12 }
  );
  reveals.forEach((el) => io.observe(el));

  if (intro) {
    setTimeout(() => intro.classList.add("hidden"), 2300);
    setTimeout(() => intro.remove(), 2900);
  }
})();
