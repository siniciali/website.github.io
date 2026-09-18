// reveal on scroll
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// keep the walk strip pinned to the real height of the header
(function () {
  const nav = document.querySelector(".site-nav");
  if (!nav) return;
  const setNavHeight = () =>
    document.documentElement.style.setProperty(
      "--nav-h",
      nav.offsetHeight + "px",
    );
  setNavHeight();
  window.addEventListener("resize", setNavHeight);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(setNavHeight);
  }
})();

// the bear walks the length of the page as you scroll
(function () {
  const bear = document.getElementById("walkBear");
  const fill = document.getElementById("walkFill");
  if (!bear || !fill) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let ticking = false;

  function update() {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    fill.style.width = pct * 100 + "%";
    const travel = window.innerWidth - bear.offsetWidth;
    bear.style.transform = "translateX(" + pct * travel + "px)";
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      reduce ? update() : requestAnimationFrame(update);
    }
  }

  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", update);
})();

// mobile navigation
(function () {
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  if (!navToggle || !navLinks) return;
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }),
  );
})();
