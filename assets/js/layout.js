/* 🔱 MAHADEV ASTROLOGER - CENTRAL LAYOUT HANDLER (FIXED) */

function injectLayout() {
    const lang = localStorage.getItem('selectedLang') || 'hi';
    
    // Path Detection
    const isSubFolder = window.location.pathname.includes('/pages/') || 
                        window.location.pathname.includes('/panchang/') ||
                        (window.location.pathname.endsWith('.html') && !window.location.pathname.includes('index.html'));
    
    const rootPath = isSubFolder ? '../index.html' : 'index.html';
    const horoscopePath = isSubFolder ? '../horoscope.html' : 'horoscope.html';

    const headerEl = document.getElementById('header-placeholder');
    const footerEl = document.getElementById('footer-placeholder');

    if (headerEl) {
        headerEl.innerHTML = `
            <header class="main-header">
                <nav class="nav-container">
                    <div class="logo" style="font-family:'Cinzel'; color:#f5c542; font-size:1.5rem;">🔱 MAHADEV</div>
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
        footerEl.innerHTML = `<footer class="main-footer" style="text-align:center; padding:20px; border-top:1px solid #222;">
            <p data-key="footer_text">© 2026 Mahadev Astrologer</p>
        </footer>`;
    }

    // 🔱 FIXED: Thoda wait taaki dictionary load ho jaye
    setTimeout(translatePage, 100);
}

// 🔱 Global Translation Engine
function translatePage() {
    const lang = localStorage.getItem('selectedLang') || 'hi';
    
    // 🔱 CORRECTED: window.translations (S के साथ) चेक करें
    const source = window.translations; 

    if (!source) {
        console.log("⏳ Waiting for translations.js to load...");
        setTimeout(translatePage, 100); 
        return;
    }

    const data = source[lang];
    if (!data) return;

    // 1. साधारण टेक्स्ट बदलें
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (data[key]) el.innerHTML = data[key];
    });

    // 2. इनपुट प्लेसहोल्डर्स बदलें (IMPORTANT)
    document.querySelectorAll('[data-placeholder-key]').forEach(el => {
        const key = el.getAttribute('data-placeholder-key');
        if (data[key]) el.setAttribute('placeholder', data[key]);
    });

    console.log("✅ Mahadev Astrologer: " + lang.toUpperCase() + " Applied!");
}

// Language Switcher
function toggleLang() {
    const currentLang = localStorage.getItem('selectedLang') || 'hi';
    const newLang = (currentLang === 'hi') ? 'en' : 'hi';
    localStorage.setItem('selectedLang', newLang);
    location.reload();
}

document.addEventListener('DOMContentLoaded', injectLayout);
