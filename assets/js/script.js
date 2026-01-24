const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const dropdown = document.getElementById("servicesDropdown");

/* Mobile menu toggle */
menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

/* Services dropdown */
dropdown.addEventListener("click", () => {
  dropdown.classList.toggle("active");
});