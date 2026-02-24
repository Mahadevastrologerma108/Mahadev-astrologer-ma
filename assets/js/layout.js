/* 🔱 MAHADEV ASTROLOGER - CENTRAL LAYOUT HANDLER */

function injectLayout() {
    const lang = localStorage.getItem('selectedLang') || 'hi';
    
    // Path Detection
    const isSubFolder = window.location.pathname.includes('/pages/') || 
                        window.location.pathname.includes('/panchang/') ||
                        window.location.pathname.endsWith('.html') && !window.location.pathname.includes('index.html');
    
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
        footerEl.innerHTML = `<footer class="main-footer"><p data-key="footer_text">© 2026 Mahadev Astrologer</p></footer>`;
    }

    // 🔱 FIXED LOGIC: Thoda delay taaki translation.js (Global) load ho jaye
    setTimeout(() => {
        translatePage();
    }, 100);
}

// 🔱 Global Translation Engine
function translatePage() {
    const lang = localStorage.getItem('selectedLang') || 'hi';
    
    // Yahan hum 'window.translation' (Global) check kar rahe hain
    const data = window.translation; 

    if (!data) {
        console.warn("⚠️ Mahadev: Global 'translation' object not found yet.");
        return;
    }

    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(el => {
        const key = el.getAttribute('data-key');
        if (data[lang] && data[lang][key]) {
            el.innerText = data[lang][key];
        }
    });
    console.log("✅ Mahadev: Page Translated to", lang);
}

// 🔱 Language Switcher
function toggleLang() {
    const currentLang = localStorage.getItem('selectedLang') || 'hi';
    const newLang = (currentLang === 'hi') ? 'en' : 'hi';
    localStorage.setItem('selectedLang', newLang);
    location.reload();
}

document.addEventListener('DOMContentLoaded', injectLayout);
