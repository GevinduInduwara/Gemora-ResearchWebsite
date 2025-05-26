// Modern animation for Documents section cards with staggered effect and hover lift
// Adds fade/slide-in effect using Intersection Observer and staggered timing

document.addEventListener('DOMContentLoaded', function() {
  const docCards = document.querySelectorAll('.doc-modern-card');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Staggered animation based on card index
          const index = Array.from(docCards).indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 120);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });
    docCards.forEach(card => observer.observe(card));
  } else {
    docCards.forEach(card => card.classList.add('visible'));
  }
});
