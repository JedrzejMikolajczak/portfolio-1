document.addEventListener("DOMContentLoaded", function(){
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active', 'prev', 'next');
    if (i === index) {
      slide.classList.add('active');
    } else if (i === (index - 1 + slides.length) % slides.length) {
      slide.classList.add('prev');
    } else if (i === (index + 1) % slides.length) {
      slide.classList.add('next');
    }
  });
}

setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 6000);

showSlide(currentSlide);
const reveals = document.querySelectorAll(".reveal");const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));
})
document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll("section, .main-content, .about, .projects, .contact");
  const navLinks = document.querySelectorAll("ul li a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.parentElement.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.parentElement.classList.add("active");
      }
    });
  });
});



