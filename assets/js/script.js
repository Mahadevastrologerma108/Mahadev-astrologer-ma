// ==========================================
// MAHADEV ASTROLOGER - PANCHANG SCRIPT (REPLACE)
// ==========================================

const AppConfig = {
    currentLanguage: 'hi',
    // Data ko yahi rakh rahe hain taaki 404 Error na aaye
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

// 1. UI Update Karne Wala Function
function updatePanchangUI(date) {
    const dateKey = date.toISOString().split('T')[0];
    const lang = AppConfig.currentLanguage;
    const data = AppConfig.panchangData[dateKey];

    // Aaj ki date header mein
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateTitle = date.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-US', options);
    
    const dateEl = document.getElementById('selected-date-display');
    if(dateEl) dateEl.innerText = dateTitle;

    if (data) {
        // Values Fill Karna (IDs check karein panchang.html mein)
        setElementText('tithi-val', data.tithi[lang]);
        setElementText('nakshatra-val', data.nakshatra[lang]);
        setElementText('yoga-val', data.yoga[lang]);
        setElementText('karana-val', data.karana[lang]);
        setElementText('sunrise-val', data.sun.rise);
        setElementText('sunset-val', data.sun.set);
    } else {
        const noData = lang === 'hi' ? "डेटा उपलब्ध नहीं" : "Data Not Available";
        ['tithi-val', 'nakshatra-val', 'yoga-val', 'karana-val'].forEach(id => setElementText(id, noData));
    }
}

// Helper function
function setElementText(id, text) {
    const el = document.getElementById(id);
    if(el) el.innerText = text;
}

// 2. Language Switcher
function switchLanguage() {
    AppConfig.currentLanguage = (AppConfig.currentLanguage === 'en') ? 'hi' : 'en';
    
    // Static text update (Jo HTML mein data-en/data-hi se hain)
    document.querySelectorAll('[data-en]').forEach(el => {
        el.innerText = el.getAttribute(`data-${AppConfig.currentLanguage}`);
    });

    // Button Text Update
    const btn = document.getElementById('toggleLang');
    if(btn) btn.innerText = AppConfig.currentLanguage === 'en' ? 'Switch to Hindi' : 'हिंदी में बदलें';

    updatePanchangUI(selectedDate);
}

// 3. Calendar Logic (Simplify kiya hai taaki crash na ho)
function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    if(!grid) return;
    
    grid.innerHTML = '';
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-date';
        dayDiv.innerText = i;
        
        // Highlight logic
        if(i === today.getDate()) {
            dayDiv.classList.add('active-date'); // CSS mein gold color dena
        }

        dayDiv.onclick = () => {
            selectedDate = new Date(today.getFullYear(), today.getMonth(), i);
            updatePanchangUI(selectedDate);
        };
        grid.appendChild(dayDiv);
    }
}

// 4. Initial Load
document.addEventListener('DOMContentLoaded', () => {
    renderCalendar();
    updatePanchangUI(selectedDate);
});