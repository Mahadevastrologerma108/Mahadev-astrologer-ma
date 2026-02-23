/* 🔱 MAHADEV ASTROLOGER - CENTRAL LAYOUT HANDLER */

// 1. Header aur Footer ka Maal
const commonLayout = {
    header: (lang) => `
        <header class="main-header">
            <nav class="nav-container">
                <div class="logo">🔱 Mahadev Astro</div>
                <ul class="nav-links">
                    <li><a href="../index.html" data-key="nav_home">Home</a></li>
                    <li><a href="../horoscope.html" data-key="nav_horoscope">Horoscope</a></li>
                    <li><a href="../panchang/panchang.html" data-key="nav_panchang">Panchang</a></li>
                </ul>
                <button onclick="toggleLang()" class="lang-btn" id="langBtn">
                    ${lang === 'hi' ? 'English' : 'हिंदी'}
                </button>
            </nav>
        </header>
    `,
    footer: (lang) => `
        <footer class="main-footer">
            <p data-key="footer_text">© 2026 Mahadev Astrologer - Divine Guidance</p>
            <div class="footer-links">
                <a href="../pages/privacy.html">Privacy</a> | 
                <a href="../pages/terms.html">Terms</a>
            </div>
        </footer>
    `
};

// 2. Auto-Inject Function
function injectLayout() {
    const lang = localStorage.getItem('selectedLang') || 'hi';
    
    const headerEl = document.getElementById('header-placeholder');
    const footerEl = document.getElementById('footer-placeholder');

    if (headerEl) headerEl.innerHTML = commonLayout.header(lang);
    if (footerEl) footerEl.innerHTML = commonLayout.footer(lang);

    // Injection ke baad translation run karo (Ghajini-Proof)
    if (typeof translatePage === 'function') {
        translatePage();
    }
}

// 3. Language Switcher (The Magic Button)
function toggleLang() {
    const currentLang = localStorage.getItem('selectedLang') || 'hi';
    const newLang = currentLang === 'hi' ? 'en' : 'hi';
    localStorage.setItem('selectedLang', newLang);
    location.reload(); // Poora page reload taaki naya content aaye
}

// Page load hote hi chal jao
document.addEventListener('DOMContentLoaded', injectLayout);