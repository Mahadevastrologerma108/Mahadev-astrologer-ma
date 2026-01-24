document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const dropdown = document.getElementById("servicesDropdown");

  menuToggle.onclick = () => navMenu.classList.toggle("show");
  dropdown.onclick = () => dropdown.classList.toggle("active");
});