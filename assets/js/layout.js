/* 🔱 MAHADEV ASTROLOGER - CENTRAL LAYOUT HANDLER */

function injectLayout() {
    const lang = localStorage.getItem('selectedLang') || 'hi';
    
    // Path Detection: Ye check karega ki page folder ke andar hai ya bahar
    const isSubFolder = window.location.pathname.includes('/pages/') || 
                        window.location.pathname.includes('/panchang/') ||
                        window.location.pathname.endsWith('.html') && !window.location.pathname.includes('index.html');
    
    // Agar folder ke andar hai to path '../' hoga, varna khali
    const pathPrefix = isSubFolder ? '../' : './';
    const rootPath = isSubFolder ? '../index.html' : 'index.html';
    const horoscopePath = isSubFolder ? '../horoscope.html' : 'horoscope.html';

    const headerEl = document.getElementById('header-placeholder');
    const footerEl = document.getElementById('footer-placeholder');

    if (headerEl) {
        headerEl.innerHTML = `
            <header class="main-header">
                <nav class="nav-container">
                    <div class="logo" style="font-family:'Cinzel'; color:#f5c542;">🔱 MAHADEV</div>
                    <ul class="nav-links">
                        <li><a href="${rootPath}" data-key="nav_home">Home</a></li>
                        <li><a href="${horoscopePath}" data-key="nav_horoscope">Horoscope</a></li>
                    </ul>
                    <div class="lang-box">
                        <button onclick="toggleLang()" id="langBtn" class="lang-toggle-btn">
                            ${lang === 'hi' ? 'English' : 'हिंदी'}
                        </button>
                    </div>
                </nav>
            </header>
        `;
    }

    if (footerEl) {
        footerEl.innerHTML = `
            <footer class="main-footer">
                <div class="footer-content">
                    <p data-key="footer_text">© 2026 Mahadev Astrologer - All Rights Reserved</p>
                </div>
            </footer>
        `;
    }

    // Header/Footer load hote hi translation engine chalao
    if (typeof translatePage === 'function') {
        translatePage();
    }
}

// 🔱 Language Switcher
function toggleLang() {
    const currentLang = localStorage.getItem('selectedLang') || 'hi';
    const newLang = (currentLang === 'hi') ? 'en' : 'hi';
    localStorage.setItem('selectedLang', newLang);
    location.reload();
}

// Auto-run when page loads
document.addEventListener('DOMContentLoaded', injectLayout);