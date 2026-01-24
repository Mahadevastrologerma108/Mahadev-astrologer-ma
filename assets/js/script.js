document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const dropdown = document.getElementById("servicesDropdown");

  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });

  dropdown.addEventListener("click", () => {
    dropdown.classList.toggle("active");
  });
});