/**
 * Project: Mahadev Astrologer - Individual Panchang Page
 * Purpose: Complete logic for Tithi, Nakshatra, and Calendar
 * Path: assets/js/script.js
 */

// 1. App Configuration
const AppConfig = {
    currentLanguage: 'hi', // Default language
    goldTheme: {
        gradient: "linear-gradient(145deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)"
    }
};

// 2. Hardcoded Data (Taaki 404 Error kabhi na aaye)
// Jab tumhare paas 1000+ dino ka data ho jaye, tab ise JSON file mein daalna
const panchangData = {
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
    // Bhai, yahan aur dates add karte jao...
};

let selectedDate = new Date();
let currentViewDate = new Date();

// 3. Main Functions
function updatePanchangUI(date) {
    const dateKey = date.toISOString().split('T')[0];
    const lang = AppConfig.currentLanguage;
    const dayData = panchangData[dateKey];

    // UI Elements update
    const tithiEl = document.getElementById('tithi-val');
    const nakshatraEl = document.getElementById('nakshatra-val');
    const yogaEl = document.getElementById('yoga-val');
    const karanaEl = document.getElementById('karana-val');
    const sunriseEl = document.getElementById('sunrise-val');
    const sunsetEl = document.getElementById('sunset-val');

    if (dayData) {
        if(tithiEl) tithiEl.innerText = dayData.tithi[lang];
        if(nakshatraEl) nakshatraEl.innerText = dayData.nakshatra[lang];
        if(yogaEl) yogaEl.innerText = dayData.yoga[lang];
        if(karanaEl) karanaEl.innerText = dayData.karana[lang];
        if(sunriseEl) sunriseEl.innerText = dayData.sun.rise;
        if(sunsetEl) sunsetEl.innerText = dayData.sun.set;
    } else {
        // Fallback agar data nahi hai
        const msg = lang === 'hi' ? "उपलब्ध नहीं" : "Not Available";
        if(tithiEl) tithiEl.innerText = msg;
        // ...baaki fields mein bhi msg daal sakte ho
    }

    // Display selected date in header
    const dateDisplay = document.getElementById('selected-date-display');
    if(dateDisplay) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateDisplay.innerText = date.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-US', options);
    }
}

// 4. Language Switcher
function switchLanguage() {
    AppConfig.currentLanguage = (AppConfig.currentLanguage === 'en') ? 'hi' : 'en';
    
    // Update Static Texts
    document.querySelectorAll('[data-en]').forEach(el => {
        el.innerText = el.getAttribute(`data-${AppConfig.currentLanguage}`);
    });

    // Update Button
    const btn = document.getElementById('toggleLang');
    if(btn) btn.innerText = AppConfig.currentLanguage === 'en' ? 'Switch to Hindi' : 'हिंदी में बदलें';

    // Refresh UI
    renderCalendar();
    updatePanchangUI(selectedDate);
}

// 5. Gold Calendar Logic
function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    const monthYearDisplay = document.getElementById('month-year-display');
    if (!grid || !monthYearDisplay) return;

    grid.innerHTML = '';
    const month = currentViewDate.getMonth();
    const year = currentViewDate.getFullYear();

    const monthNames = AppConfig.currentLanguage === 'en' 
        ? ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        : ["जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"];

    monthYearDisplay.innerText = `${monthNames[month]} ${year}`;

    // Days Header
    const days = AppConfig.currentLanguage === 'en' ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] : ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'];
    days.forEach(day => {
        const dDiv = document.createElement('div');
        dDiv.className = 'calendar-day-header'; // Apni CSS ke hisaab se
        dDiv.innerText = day;
        grid.appendChild(dDiv);
    });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Empty slots
    for (let i = 0; i < firstDay; i++) grid.appendChild(document.createElement('div'));

    // Actual Days
    for (let i = 1; i <= daysInMonth; i++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-date';
        dayEl.innerText = i;

        // Highlight selected
        if (i === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear()) {
            dayEl.style.background = AppConfig.goldTheme.gradient;
            dayEl.style.color = "#000";
            dayEl.style.fontWeight = "bold";
        }

        dayEl.onclick = () => {
            selectedDate = new Date(year, month, i);
            renderCalendar();
            updatePanchangUI(selectedDate);
        };
        grid.appendChild(dayEl);
    }
}

// Month Nav
function prevMonth() { currentViewDate.setMonth(currentViewDate.getMonth() - 1); renderCalendar(); }
function nextMonth() { currentViewDate.setMonth(currentViewDate.getMonth() + 1); renderCalendar(); }

// 6. Init on Load
document.addEventListener('DOMContentLoaded', () => {
    renderCalendar();
    updatePanchangUI(selectedDate);
});