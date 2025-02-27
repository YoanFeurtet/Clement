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
    this.initHouseAnimation();
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

  initHouseAnimation() {
    window.addEventListener("scroll", () => {
      requestAnimationFrame(() => this.updateHouseAnimation());
    });
    this.updateHouseAnimation();
  }

  updateHouseAnimation() {
    const scrollPercent =
      window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight);

    Object.entries(this.triggers).forEach(([element, trigger]) => {
      if (element === "window") {
        const windowLeft = document.querySelector(".window-left");
        const windowRight = document.querySelector(".window-right");

        if (scrollPercent >= trigger) {
          windowLeft?.classList.add("visible");
          windowRight?.classList.add("visible");
        } else {
          windowLeft?.classList.remove("visible");
          windowRight?.classList.remove("visible");
        }
      } else {
        const elementNode = document.querySelector(`.${element}`);
        if (scrollPercent >= trigger) {
          elementNode?.classList.add("visible");
        } else {
          elementNode?.classList.remove("visible");
        }
      }
    });

    this.lastScroll = scrollPercent;
  }
}

export default HouseAnimation;
