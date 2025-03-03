class HouseAnimation {
  constructor() {
    this.initScrollAnimations();
  }

  initScrollAnimations() {
    const options = {
      threshold: 0.1,
      rootMargin: "50px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
        }
      });
    }, options);

    document.querySelectorAll(".animate-on-scroll").forEach((element) => {
      observer.observe(element);
    });

    // Observer spécifique pour la section devis
    const devisObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
          }
        });
      },
      { threshold: 0.2 },
    );

    const devisSection = document.querySelector("#devis");
    if (devisSection) {
      devisObserver.observe(devisSection);
    }
  }
}

export default HouseAnimation;
