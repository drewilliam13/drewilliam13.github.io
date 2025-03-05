// Hamburger Menu
document.addEventListener("click", function (event) {
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  // Close menu if clicking outside of it
  if (
    navbarCollapse.classList.contains("show") &&
    !navbarToggler.contains(event.target) &&
    !navbarCollapse.contains(event.target)
  ) {
    navbarToggler.click(); // Closes menu
  }
});

// Close menu when clicking a menu item
document.querySelectorAll(".navbar-nav .nav-link").forEach((item) => {
  item.addEventListener("click", () => {
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");

    if (navbarCollapse.classList.contains("show")) {
      navbarToggler.click(); // Closes menu
    }
  });
});

// Testimonials (Manual Scroll Only)
document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".testimonials-container");
  const prevBtn = document.querySelector(".testimonial-prev");
  const nextBtn = document.querySelector(".testimonial-next");

  function updateArrows() {
    // Show/hide left arrow
    if (container.scrollLeft > 0) {
      prevBtn.style.opacity = "1";
      prevBtn.style.pointerEvents = "auto";
    } else {
      prevBtn.style.opacity = "0";
      prevBtn.style.pointerEvents = "none";
    }

    // Show/hide right arrow
    if (
      container.scrollLeft + container.clientWidth <
      container.scrollWidth - 1
    ) {
      nextBtn.style.opacity = "1";
      nextBtn.style.pointerEvents = "auto";
    } else {
      nextBtn.style.opacity = "0";
      nextBtn.style.pointerEvents = "none";
    }
  }

  prevBtn.addEventListener("click", () => {
    container.scrollBy({ left: -350, behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    container.scrollBy({ left: 350, behavior: "smooth" });
  });

  container.addEventListener("scroll", updateArrows);

  // Initial check when page loads
  updateArrows();
});

// Skill Icons
// Wait for the DOM to be loaded
document.addEventListener("DOMContentLoaded", function () {
  const skillIcons = document.querySelectorAll(".skill-icon"); // Select all skill icons

  // Loop through each skill icon
  skillIcons.forEach((icon) => {
    // Add event listener for mouse hover
    icon.addEventListener("mouseover", function () {
      const techName = icon.querySelector(".tech-name"); // Get the tech name inside the icon
      techName.style.display = "block"; // Show the tech name on hover
    });

    // Add event listener for mouse leave (when hover ends)
    icon.addEventListener("mouseout", function () {
      const techName = icon.querySelector(".tech-name");
      techName.style.display = "none"; // Hide the tech name when mouse leaves
    });

    // Add event listener for tap (mobile devices)
    icon.addEventListener("click", function () {
      const techName = icon.querySelector(".tech-name");
      techName.style.display =
        techName.style.display === "block" ? "none" : "block"; // Toggle the tech name on tap
    });
  });
});

// Contact Form Handling
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the form from submitting traditionally

    const form = e.target;
    const email = form.querySelector("#email");
    const isValidEmail = email.checkValidity(); // HTML5 validation

    // Check if the form is valid
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      if (!isValidEmail) {
        email.classList.add("is-invalid");
      }
      return; // Stop if the form is invalid
    }

    // Create FormData object for the form
    const formData = new FormData(form);

    // Initialize EmailJS with your Public Key
    emailjs.init({
      publicKey: "evO7PhDyoN5B_rsaT", // Replace with your actual Public Key
      blockHeadless: true, // Block headless browsers
      limitRate: {
        id: "app",
        throttle: 10000, // Limit to 1 request per 10 seconds
      },
    });

    // Send the form data using EmailJS
    emailjs.sendForm("service_juppchs", "template_dnqh1xi", formData).then(
      function (response) {
        // Success message
        document.getElementById("form-feedback").innerHTML =
          '<div class="alert alert-success">Message sent successfully! Check your inbox.</div>';
        form.reset(); // Reset the form
        form.classList.remove("was-validated"); // Remove validation state
      },
      function (error) {
        // Error message
        document.getElementById(
          "form-feedback"
        ).innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
      }
    );
  });
