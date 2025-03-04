// Importer la classe d'animation
import HouseAnimation from "./animations.js";

// Attendre que le DOM soit chargé
document.addEventListener("DOMContentLoaded", () => {
  // Initialiser l'animation de la maison
  const houseAnimation = new HouseAnimation();

  // Gestion du menu burger
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    // Fermer le menu quand on clique sur un lien
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });
  }

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

  // Gérer le menu actif
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute("id");
      const menuLink = document.querySelector(`a[href="#${sectionId}"]`);

      if (menuLink) {
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          menuLink.classList.add("active");
        } else {
          menuLink.classList.remove("active");
        }
      }
    });
  });

  // Gestion du formulaire de devis
  const form = document.querySelector("#devis form");
  if (form) {
    const confirmationMessage = document.createElement("p");
    confirmationMessage.textContent = "Votre demande a bien été envoyée !";
    confirmationMessage.style.display = "none";
    confirmationMessage.style.color = "green";
    confirmationMessage.style.marginTop = "10px";
    form.appendChild(confirmationMessage);

    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Empêcher l'envoi classique du formulaire

      // Vérification des champs
      const name = document.querySelector("#name").value.trim();
      const email = document.querySelector("#email").value.trim();
      const phoneField = document.querySelector("#phone");
      const phone = phoneField ? phoneField.value.trim() : "";
      const message = document.querySelector("#message").value.trim();

      if (!name || !email || !message) {
        alert("Veuillez remplir tous les champs obligatoires.");
        return;
      }

      if (!validateEmail(email)) {
        alert("Veuillez entrer une adresse email valide.");
        return;
      }

      if (phone && !validatePhone(phone)) {
        alert("Veuillez entrer un numéro de téléphone valide.");
        return;
      }

      // Afficher la confirmation
      confirmationMessage.style.display = "block";

      // Réinitialiser le formulaire après quelques secondes
      setTimeout(() => {
        form.reset();
        confirmationMessage.style.display = "none";
      }, 3000);
    });
  }

  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }

  function validatePhone(phone) {
    const re = /^\+?[0-9\s.-]{10,20}$/;
    return re.test(phone);
  }
});
