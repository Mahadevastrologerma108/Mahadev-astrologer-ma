// ================================
// Royal Navbar Scroll Effect
// ================================
window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");
    if (!nav) return;

    if (window.scrollY > 50) {
        nav.style.background = "#05000a";
        nav.style.boxShadow = "0 5px 20px rgba(0,0,0,0.6)";
    } else {
        nav.style.background = "#090116";
        nav.style.boxShadow = "none";
    }
});

// ================================
// Mobile Sidebar Toggle
// ================================
function toggleSidebar() {
    const sidebar = document.getElementById("mobileSidebar");
    if (!sidebar) return;

    sidebar.style.width =
        sidebar.style.width === "250px" ? "0" : "250px";
}

// ================================
// Smooth Scroll (Homepage only)
// ================================
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// ================================
// Booking Links (WhatsApp / Telegram / Email)
// ================================
function openBooking() {

    const message =
`🙏 Namaste Mahadev Astrologer MA

📞 CALL: Only Hindi
💬 Chat: Hindi / English / Hinglish
📄 PDF Report: INCLUDED (No Extra Charges)

⚠️ Payment Mandatory 😄
(No mercy after booking 😂)`;

    const encodedMsg = encodeURIComponent(message);

    // CHANGE NUMBER & USERNAME ONLY
    const whatsapp = "https://wa.me/91XXXXXXXXXX?text=" + encodedMsg;
    const telegram = "https://t.me/USERNAME?text=" + encodedMsg;
    const email    = "mailto:youremail@gmail.com?subject=Astrology Booking&body=" + encodedMsg;

    if (document.getElementById("waLink"))
        document.getElementById("waLink").href = whatsapp;

    if (document.getElementById("tgLink"))
        document.getElementById("tgLink").href = telegram;

    if (document.getElementById("mailLink"))
        document.getElementById("mailLink").href = email;
}

// ================================
console.log("🔥 Mahadev Astrologer MA – Script Loaded Successfully");