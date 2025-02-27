class HouseAnimation {
  constructor() {
    this.triggers = {
      foundation: 0.1,
      walls: 0.3,
      roof: 0.5,
      window: 0.7,
      door: 0.9,
    };
    this.lastScroll = 0; // Pour tracker la direction du scroll
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
        } else {
          entry.target.classList.remove("animated");
        }
        // Retir� unobserve pour permettre l'animation continue
      });
    }, options);

    document.querySelectorAll(".animate-on-scroll").forEach((element) => {
      observer.observe(element);
    });
  }
}

export default HouseAnimation;
