// script.js - Main Logic
let currentDate = new Date(); // Month navigation ke liye
let selectedDate = new Date(); // User ki selected date

document.addEventListener('DOMContentLoaded', () => {
    // Initial Load
    renderCalendar();
    updateLanguageUI();
    fetchPanchangData(selectedDate); // Aaj ka data load karo
});

// --- Condition 4: Language Switch Logic ---
function switchLanguage() {
    AppConfig.currentLanguage = (AppConfig.currentLanguage === 'en') ? 'hi' : 'en';
    updateLanguageUI();
    renderCalendar(); // Calendar refresh (Month/Days names badalne ke liye)
    fetchPanchangData(selectedDate); // Data refresh (Tithi/Nakshatra badalne ke liye)
}

function updateLanguageUI() {
    // Pure page par jahan bhi data-en/hi hai, unhe update karo
    document.querySelectorAll('[data-en]').forEach(el => {
        el.innerText = el.getAttribute(`data-${AppConfig.currentLanguage}`);
    });
    
    // Switch button text update
    const btn = document.getElementById('toggleLang');
    if(btn) {
        btn.innerText = AppConfig.currentLanguage === 'en' ? 'Switch to Hindi' : 'हिंदी में बदलें';
    }
}

// --- Condition 5 & 6: Gold Calendar Logic ---
function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    const monthDisplay = document.getElementById('month-year-display');
    if (!grid || !monthDisplay) return;

    grid.innerHTML = '';
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const monthNames = AppConfig.currentLanguage === 'en' 
        ? ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        : ["जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"];

    monthDisplay.innerText = `${monthNames[month]} ${year}`;

    // Days Header
    const days = AppConfig.currentLanguage === 'en' ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] : ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'];
    days.forEach(day => {
        const dDiv = document.createElement('div');
        dDiv.className = 'gold-text';
        dDiv.style.fontWeight = 'bold';
        dDiv.innerText = day;
        grid.appendChild(dDiv);
    });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) grid.appendChild(document.createElement('div'));

    for (let i = 1; i <= daysInMonth; i++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-date';
        dayEl.innerText = i;
        
        // Active Date Indicator (Condition 6)
        if (i === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear()) {
            dayEl.classList.add('selected-active');
            dayEl.style.background = AppConfig.goldTheme.gradient;
        }

        dayEl.onclick = () => {
            selectedDate = new Date(year, month, i);
            renderCalendar();
            fetchPanchangData(selectedDate);
        };
        grid.appendChild(dayEl);
    }
}

// --- Condition 7 & 8: Dynamic Data Fetching ---
async function fetchPanchangData(date) {
    const dateKey = date.toISOString().split('T')[0]; // Format: 2026-02-18
    const lang = AppConfig.currentLanguage;
    
    // UI update
    document.getElementById('selected-date-display').innerText = date.toDateString();

    try {
        const response = await fetch(AppConfig.dataFiles.panchang);
        if (!response.ok) throw new Error("Data file not found");
        
        const allData = await response.json();
        const dayData = allData[dateKey];

        if (dayData) {
            document.getElementById('tithi-val').innerText = dayData.tithi[lang];
            document.getElementById('nakshatra-val').innerText = dayData.nakshatra[lang];
        } else {
            document.getElementById('tithi-val').innerText = lang === 'en' ? "Data Not Available" : "डेटा उपलब्ध नहीं है";
        }
    } catch (err) {
        console.error("Fetch Error:", err);
        document.getElementById('tithi-val').innerText = "---";
    }
}

// Month Navigation
function prevMonth() { currentDate.setMonth(currentDate.getMonth() - 1); renderCalendar(); }
function nextMonth() { currentDate.setMonth(currentDate.getMonth() + 1); renderCalendar(); }
