// Importer la classe d'animation
import HouseAnimation from "./animations.js";

// Attendre que le DOM soit charg�
document.addEventListener("DOMContentLoaded", () => {
  // Initialiser l'animation de la maison
  const houseAnimation = new HouseAnimation();

  // Gestion du menu burger
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle?.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navLinks?.classList.toggle("active");
  });

  // Fermer le menu quand on clique sur un lien
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle?.classList.remove("active");
      navLinks?.classList.remove("active");
    });
  });

  // Scroll smooth pour les liens
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // G�rer le menu actif
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute("id");
      const menuLink = document.querySelector(`a[href="#${sectionId}"]`);

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        menuLink?.classList.add("active");
      } else {
        menuLink?.classList.remove("active");
      }
    });
  });
});
