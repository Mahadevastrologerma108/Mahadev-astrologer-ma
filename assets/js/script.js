function toggleSidebar() {
  const sidebar = document.getElementById("mobileSidebar");
  sidebar.style.width = sidebar.style.width === "250px" ? "0" : "250px";
}

window.addEventListener("scroll", () => {
  const nav = document.querySelector(".royal-nav");
  if (!nav) return;

  if (window.scrollY > 40) {
    nav.style.background = "#05000a";
    nav.style.boxShadow = "0 5px 20px rgba(0,0,0,0.5)";
  } else {
    nav.style.background = "#090116";
    nav.style.boxShadow = "none";
  }
});