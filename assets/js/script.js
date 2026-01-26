/* ===============================
   MOBILE MENU TOGGLE
================================ */

const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });
}

/* ===============================
   DROPDOWN (MOBILE SAFE)
================================ */

document.querySelectorAll('.dropdown > a').forEach(link => {
  link.addEventListener('click', function (e) {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const dropdownMenu = this.nextElementSibling;
      if (dropdownMenu) {
        dropdownMenu.style.display =
          dropdownMenu.style.display === 'block' ? 'none' : 'block';
      }
    }
  });
});

/* ===============================
   SMOOTH SCROLL (OPTIONAL)
================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ===============================
   DEBUG CONFIRMATION
================================ */

console.log("Mahadev Astrologer MA – Stable JS loaded");