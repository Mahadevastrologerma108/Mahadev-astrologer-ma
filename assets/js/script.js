document.addEventListener("DOMContentLoaded", () => {

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const dropdown = document.getElementById("servicesDropdown");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });
  }

  if (dropdown) {
    dropdown.addEventListener("click", (e) => {
      e.preventDefault();
      dropdown.classList.toggle("active");
    });
  }

});