/* 🔱 MAHADEV ASTROLOGER - CENTRAL HOROSCOPE HANDLER */

/**
 * 1. 🔍 MAGIC RASHI FINDER
 * Ye function horoscope.html par rashi dhoondhne aur redirect karne ke liye hai.
 */
function handleMagicFind(val) {
    if (!val) return;

    const resultBox = document.getElementById('magicResult');
    if (!resultBox) return; 
    
    const rashiMap = {
        aries: { name: "मेष (Aries)", icon: "♈" },
        taurus: { name: "वृषभ (Taurus)", icon: "♉" },
        gemini: { name: "मिथुन (Gemini)", icon: "♊" },
        cancer: { name: "कर्क (Cancer)", icon: "♋" },
        leo: { name: "सिंह (Leo)", icon: "♌" },
        virgo: { name: "कन्या (Virgo)", icon: "♍" },
        libra: { name: "तुला (Libra)", icon: "♎" },
        scorpio: { name: "वृश्चिक (Scorpio)", icon: "♏" },
        sagittarius: { name: "धनु (Sagittarius)", icon: "♐" },
        capricorn: { name: "मकर (Capricorn)", icon: "♑" },
        aquarius: { name: "कुंभ (Aquarius)", icon: "♒" },
        pisces: { name: "मीन (Pisces)", icon: "♓" }
    };

    const info = rashiMap[val];

    // Result Card Display
    resultBox.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 10px;">${info.icon}</div>
        <p style="color: #bbb; margin: 0;">आपकी संभावित राशि:</p>
        <h4 style="color: #f5c542; font-size: 1.5rem; margin: 5px 0 15px 0;">${info.name}</h4>
        <a href="${val}.html" class="redirect-btn">आज का राशिफल पढ़ें →</a>
    `;

    resultBox.style.display = 'block';

    // Dropdown Sync (Ek select ho to dusra reset)
    const nameF = document.getElementById('nameFinder');
    const monthF = document.getElementById('monthFinder');
    if (document.activeElement === nameF) monthF.value = '';
    else if (document.activeElement === monthF) nameF.value = '';
}

/**
 * 2. 📝 DATA LOADER
 * Ye function aries.html, taurus.html etc. par data load karne ke liye hai.
 */
function loadHoroscope(rashiKey) {
    const lang = localStorage.getItem('selectedLang') || 'hi'; 
    const data = window.dailyHoroscope ? window.dailyHoroscope[rashiKey] : null;

    if (!data) {
        console.warn("🔱 Mahadev: Data not found for rashi:", rashiKey);
        return;
    }

    // A. Main Content Fields
    const fields = {
        'h-career': data.career[lang],
        'h-love': data.love[lang],
        'h-health': data.health[lang],
        'h-tip': data.tip[lang],
        'h-color': data.luckyColor[lang],
        'h-number': data.luckyNumber,
        'h-time': data.luckyTime
    };

    // Har ID ko check karke text fill karna
    Object.entries(fields).forEach(([id, val]) => {
        const el = document.getElementById(id);
        if (el) el.innerText = val || "--";
    });

    // B. Title Update
    const rashiTitle = document.getElementById('rashi-title');
    if (rashiTitle) {
        rashiTitle.innerText = rashiKey.toUpperCase() + (lang === 'hi' ? " राशिफल" : " Horoscope");
    }

    // C. Current Date Update
    const dateEl = document.getElementById('todayDate');
    if (dateEl) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateEl.innerText = new Date().toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-US', options);
    }
}
