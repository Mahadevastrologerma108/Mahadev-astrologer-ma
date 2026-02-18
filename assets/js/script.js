// ==========================================
// MAHADEV ASTROLOGER - PANCHANG SCRIPT (FINAL REPLACE)
// ==========================================

// 1. App Configuration & Data (Directly in JS to avoid 404)
const AppConfig = {
    currentLanguage: 'hi',
    panchangData: {
        "2026-02-18": {
            tithi: { en: "Shukla Dwitiya", hi: "शुक्ल द्वितीया" },
            nakshatra: { en: "Shatabhisha", hi: "शतभिषा" },
            yoga: { en: "Siddha", hi: "सिद्ध" },
            karana: { en: "Balava", hi: "बालव" },
            sun: { rise: "06:58 AM", set: "06:12 PM" }
        },
        "2026-02-19": {
            tithi: { en: "Shukla Tritiya", hi: "शुक्ल तृतीया" },
            nakshatra: { en: "Purva Bhadrapada", hi: "पूर्वा भाद्रपद" },
            yoga: { en: "Sadhya", hi: "साध्य" },
            karana: { en: "Kaulava", hi: "कौलव" },
            sun: { rise: "06:57 AM", set: "06:13 PM" }
        }
    }
};

let selectedDate = new Date();

// 2. UI Update Logic
function updatePanchangUI(date) {
    const dateKey = date.toISOString().split('T')[0];
    const lang = AppConfig.currentLanguage;
    const data = AppConfig.panchangData[dateKey];

    // Selected Date Display
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateTitle = date.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-US', options);
    
    const dateEl = document.getElementById('selected-date-display');
    if(dateEl) dateEl.innerText = dateTitle;

    // Panchang Details Fill Up
    if (data) {
        setVal('tithi-val', data.tithi[lang]);
        setVal('nakshatra-val', data.nakshatra[lang]);
        setVal('yoga-val', data.yoga[lang]);
        setVal('karana-val', data.karana[lang]);
        setVal('sunrise-val', data.sun.rise);
        setVal('sunset-val', data.sun.set);
    } else {
        const msg = lang === 'hi' ? "डेटा उपलब्ध नहीं" : "No Data";
        ['tithi-val', 'nakshatra-val', 'yoga-val', 'karana-val'].forEach(id => setVal(id, msg));
    }
}

function setVal(id, text) {
    const el = document.getElementById(id);
    if(el) el.innerText = text;
}

// 3. Language Switch Function
function switchLanguage() {
    // Toggle Language
    AppConfig.currentLanguage = (AppConfig.currentLanguage === 'en') ? 'hi' : 'en';
    
    // Update all elements with data-en / data-hi attributes
    document.querySelectorAll('[data-en]').forEach(el => {
        el.innerText = el.getAttribute(`data-${AppConfig.currentLanguage}`);
    });

    // Language Toggle Button Text Update
    const btn = document.getElementById('toggleLang');
    if(btn) {
        btn.innerText = AppConfig.currentLanguage === 'en' ? 'Switch to Hindi' : 'हिंदी में बदलें';
    }

    // Refresh the UI with new language
    updatePanchangUI(selectedDate);
}

// 4. Initial Load
document.addEventListener('DOMContentLoaded', () => {
    // Agar aaj ka data dikhana hai
    updatePanchangUI(selectedDate);
    
    // Bind the click event to your language button if not done in HTML
    const langBtn = document.getElementById('toggleLang');
    if(langBtn) {
        langBtn.addEventListener('click', switchLanguage);
    }
});
