// --------------------------------------------------------
//  INTERACTIVE JS: MENU TOGGLE, FORM VALIDATION, SCROLL BAR
// --------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {

  const menuButton = document.getElementById("menu-button");
  const navLinks = document.getElementById("nav-links");
  const contactForm = document.getElementById("contact-form");

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("error-name");
  const emailError = document.getElementById("error-email");
  const messageError = document.getElementById("error-message");
  const formMessage = document.getElementById("form-message");

  const yearSpan = document.getElementById("year");
  const progressBar = document.getElementById("scroll-progress");

  /* -----------------------------------------------
     AUTO YEAR UPDATE
  ------------------------------------------------- */
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* -----------------------------------------------
     MOBILE MENU TOGGLE
  ------------------------------------------------- */
  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuButton.setAttribute("aria-expanded", isOpen);
      menuButton.textContent = isOpen ? "✕" : "☰";

      if (isOpen) {
        const firstLink = navLinks.querySelector("a");
        if (firstLink) firstLink.focus();
      }
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded", false);
        menuButton.textContent = "☰";
      });
    });
  }

  /* -----------------------------------------------
     SMOOTH SCROLL
  ------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  /* -----------------------------------------------
     FORM VALIDATION
  ------------------------------------------------- */
  function showError(element, msg) {
    element.textContent = msg;
  }

  function clearErrors() {
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    formMessage.textContent = "";
  }

  function validEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      clearErrors();

      let valid = true;

      if (!nameInput.value.trim()) {
        showError(nameError, "Name is required.");
        valid = false;
      }

      if (!emailInput.value.trim()) {
        showError(emailError, "Email is required.");
        valid = false;
      } else if (!validEmail(emailInput.value.trim())) {
        showError(emailError, "Please enter a valid email.");
        valid = false;
      }

      if (!messageInput.value.trim()) {
        showError(messageError, "Message is required.");
        valid = false;
      }

      if (!valid) return;

      formMessage.style.color = "#b03060";
      formMessage.textContent = "Thank you! Your message has been submitted.";

      contactForm.reset();
    });
  }

  /* -----------------------------------------------
     SCROLL PROGRESS BAR
  ------------------------------------------------- */
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const percent = height > 0 ? (scrollTop / height) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = percent + "%";
    }
  }

  window.addEventListener("scroll", updateScrollProgress);
  window.addEventListener("resize", updateScrollProgress);
  updateScrollProgress();

  /* -----------------------------------------------
     VIDEO PLAY/PAUSE BUTTON
  ------------------------------------------------- */
  const video = document.getElementById("video-background");
  const videoBtn = document.getElementById("video-toggle");

  if (video && videoBtn) {
    videoBtn.addEventListener("click", () => {
      if (video.paused) {
        video.play();
        videoBtn.textContent = "⏸";
      } else {
        video.pause();
        videoBtn.textContent = "▶";
      }
    });
  }

});
