document.addEventListener("DOMContentLoaded", function(){
    const scrollProjectsBtn = document.getElementById("project-btn")
    const targetProjects = document.querySelector(".projects")

    const scrollKontaktBtn = document.getElementById("kontakt-btn")
    const targetKontakt = document.querySelector(".contact")

    const scrollAboutBtn = document.getElementById("about-btn")
    const targetAbout = document.querySelector(".about")

    if(scrollProjectsBtn && targetProjects){
        scrollProjectsBtn.addEventListener('click', function(event){
            event.preventDefault();
            targetProjects.scrollIntoView({behavior: 'smooth'})
        })
    }
    if(scrollKontaktBtn && targetKontakt){
        scrollKontaktBtn.addEventListener('click', function(event){
            event.preventDefault();
            targetKontakt.scrollIntoView({behavior: 'smooth'})
        })
    }
    if(scrollAboutBtn && targetAbout){
        scrollAboutBtn.addEventListener('click', function(event){
            event.preventDefault();
            targetAbout.scrollIntoView({behavior: 'smooth'})
        })
    }
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
  
})

document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));
});


