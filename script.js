
const throttle = (fn, wait = 120) => {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= wait) { last = now; fn(...args); }
  };
};
document.addEventListener("DOMContentLoaded", () => {

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primary-nav");

  const setNav = (open) => {
    if (!nav) return;
    nav.classList.toggle("open", open);
    navToggle?.setAttribute("aria-expanded", String(open));
  };
  navToggle?.addEventListener("click", () => {
    const isOpen = nav?.classList.contains("open");
    setNav(!isOpen);
  });
  nav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setNav(false)));


  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href")?.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const headerH = document.querySelector(".menu-container")?.offsetHeight ?? 0;
      const top = target.getBoundingClientRect().top + window.scrollY - (headerH + 12);
      window.scrollTo({ top, behavior: "smooth" });
      target.focus({ preventScroll: true });
    });
  });

 
  const reveals = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        io.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12 });
  reveals.forEach(el => io.observe(el));


  const sections = document.querySelectorAll("main[id], section[id]");
  const navItems = document.querySelectorAll(".primary-nav .nav-item");
  const spy = throttle(() => {
    const y = window.scrollY;
    const headerH = document.querySelector(".menu-container")?.offsetHeight ?? 0;
    let current = "";
    sections.forEach(sec => {
      const top = sec.offsetTop - (headerH + 28);
      const h = sec.offsetHeight;
      if (y >= top && y < top + h) current = sec.id;
    });
    navItems.forEach(li => li.classList.remove("active"));
    if (current) {
      document.querySelector(`.primary-nav a[href="#${current}"]`)?.parentElement?.classList.add("active");
    }
  }, 150);
  window.addEventListener("scroll", spy);
  spy();


  const slides = Array.from(document.querySelectorAll(".slide"));
  const wrapper = document.querySelector(".slides-wrapper");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const dotsWrap = document.querySelector(".dots");

  if (slides.length && wrapper && prevBtn && nextBtn && dotsWrap) {
    let current = 0;
    let timer = null;
    const AUTOPLAY = 6000;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    
    slides.forEach((_, i) => {
      const b = document.createElement("button");
      b.className = "dot";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-controls", `slide-${i+1}`);
      b.setAttribute("aria-selected", i === 0 ? "true" : "false");
      b.addEventListener("click", () => go(i, true));
      dotsWrap.appendChild(b);
    });

  
    slides.forEach((s, i) => s.id = `slide-${i+1}`);

    const setAria = () => {
      slides.forEach((s, i) => s.setAttribute("aria-hidden", String(i !== current)));
      dotsWrap.querySelectorAll(".dot").forEach((d, i) => d.setAttribute("aria-selected", String(i === current)));
    };

    const go = (idx, user = false) => {
      current = (idx + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle("active", i === current));
      setAria();
      if (user) restart();
    };

    const next = () => go(current + 1);
    const prev = () => go(current - 1);

    nextBtn.addEventListener("click", () => next());
    prevBtn.addEventListener("click", () => prev());

   
    wrapper.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    });

  
    let startX = 0;
    wrapper.addEventListener("touchstart", e => { startX = e.touches[0].clientX; }, { passive: true });
    wrapper.addEventListener("touchend", e => {
      const dx = e.changedTouches[0].clientX - startX;
      if (dx > 40) prev();
      if (dx < -40) next();
    });

    const start = () => { if (!reduced) { stop(); timer = setInterval(next, AUTOPLAY); } };
    const stop = () => { if (timer) clearInterval(timer); timer = null; };
    const restart = () => { stop(); start(); };

    wrapper.addEventListener("mouseenter", stop);
    wrapper.addEventListener("mouseleave", start);
    wrapper.addEventListener("focusin", stop);
    wrapper.addEventListener("focusout", start);

    go(0);
    start();
  }
});
