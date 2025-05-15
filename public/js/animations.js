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

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#devis form");
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
    const phone = document.querySelector("#phone")
      ? document.querySelector("#phone").value.trim()
      : "";
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

  function validateEmail(email) {
    const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return re.test(email);
  }

  function validatePhone(phone) {
    const phoneRegex =
      /^(\+33\s?[1-9](?:[\s.-]?\d{2}){4}|0[1-9](?:[\s.-]?\d{2}){4})$/;
    return phoneRegex.test(phone);
  }
  console.log(validatePhone("0612345678")); // Doit afficher true
  console.log(validatePhone("+33 6 12 34 56 78")); // Doit afficher true
  console.log(validatePhone("06-12-34-56-78")); // Doit afficher true
  console.log(validatePhone("06.12.34.56.78")); // Doit afficher true
  console.log(validatePhone("0712345678")); // Doit afficher true
  console.log(validatePhone("0123456789")); // Doit afficher false
  console.log(validatePhone("+44 6 12 34 56 78")); // Doit afficher false
});
