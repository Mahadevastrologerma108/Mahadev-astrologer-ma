/**
 * MAHADEV ASTROLOGER - MASTER SCRIPT (V2.0)
 * Logic: "No-Touch" Engine - Data files se automatic fetching
 */

const AppConfig = {
    lang: 'hi',
    // Dynamic Data Fetcher: Window object mein se variable dhoondta hai
    getYearlyData: function(year) {
        const dataVarName = "Data" + year; // Jaise Data2026, Data2027...
        return window[dataVarName] ? window[dataVarName] : {};
    }
};

let currentViewDate = new Date(2026, 1, 1); // Calendar View (Feb 2026)
let selectedDate = new Date(); // Aaj ki selected date

// 1. TOP UI UPDATE (Panchang Details)
function updateUI() {
    const l = AppConfig.lang;
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    
    // Automatic selection from DataYYYY
    const yearlyDB = AppConfig.getYearlyData(year);
    const dateKey = `${month}-${day}`;
    const data = yearlyDB[dateKey];

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date-display').innerText = selectedDate.toLocaleDateString(l === 'hi' ? 'hi-IN' : 'en-US', options);

    if(data) {
        fill('tithi', data.tithi ? data.tithi[l] : "--");
        fill('sunrise', data.sun ? data.sun.rise : "--");
        fill('sunset', data.sun ? data.sun.set : "--");
        // Aap yahan Nakshatra, Yoga etc. bhi add kar sakte hain logic same rahega
    } else {
        const msg = l === 'hi' ? "डेटा उपलब्ध नहीं" : "No Data Available";
        ['tithi', 'sunrise', 'sunset'].forEach(id => fill(id, msg));
    }
}

function fill(id, val) {
    const el = document.getElementById(id);
    if(el) el.innerText = val;
}

// 2. BOTTOM UI UPDATE (Monthly Festivals List)
function renderEventList() {
    const container = document.getElementById('event-list-container');
    if(!container) return;
    container.innerHTML = '';
    const l = AppConfig.lang;
    const vMonth = String(currentViewDate.getMonth() + 1).padStart(2, '0');
    const vYear = currentViewDate.getFullYear();
    const yearlyDB = AppConfig.getYearlyData(vYear);

    // Sort dates and show events for current visible month
    Object.keys(yearlyDB).sort().forEach(key => {
        if(key.startsWith(vMonth)) {
            const data = yearlyDB[key];
            if(data.event) {
                const day = key.split('-')[1];
                const row = document.createElement('div');
                row.className = 'row';
                row.innerHTML = `<span class="gold-text">${day} ${l==='hi'?'तारीख':'Date'}</span> <span>${data.event[l]}</span>`;
                container.appendChild(row);
            }
        }
    });

    if(container.innerHTML === '') {
        container.innerHTML = `<p style="text-align:center; opacity:0.5; padding:10px;">${l==='hi'?'कोई त्योहार नहीं':'No festivals'}</p>`;
    }
}

// 3. MIDDLE UI UPDATE (Calendar Grid)
function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    const monthDisplay = document.getElementById('current-month-display');
    if(!grid) return;
    grid.innerHTML = '';
    
    const l = AppConfig.lang;
    const year = currentViewDate.getFullYear();
    const month = currentViewDate.getMonth();

    const monthNames = l === 'hi' 
        ? ["जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"]
        : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    monthDisplay.innerText = `${monthNames[month]} ${year}`;

    const dayLabels = l === 'hi' ? ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"] : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    dayLabels.forEach(label => {
        const dLabel = document.createElement('div');
        dLabel.className = 'day-name'; dLabel.innerText = label;
        grid.appendChild(dLabel);
    });

    const firstDay = new Date(year, month, 1).getDay();
    for (let i = 0; i < firstDay; i++) grid.appendChild(document.createElement('div'));

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'cal-day';
        dayDiv.innerText = i;
        
        // Highlight logic
        if(i === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear()) {
            dayDiv.classList.add('selected-highlight');
        }

        dayDiv.onclick = () => {
            selectedDate = new Date(year, month, i);
            updateUI();
            renderCalendar();
        };
        grid.appendChild(dayDiv);
    }
    renderEventList(); 
}

// 4. CONTROLS (Language & Navigation)
function changeMonth(step) {
    currentViewDate.setMonth(currentViewDate.getMonth() + step);
    renderCalendar();
}

function switchLanguage() {
    AppConfig.lang = AppConfig.lang === 'hi' ? 'en' : 'hi';
    // Update static text with data-attributes
    document.querySelectorAll('[data-en]').forEach(el => {
        el.innerText = el.getAttribute(`data-${AppConfig.lang}`);
    });
    const btn = document.getElementById('langBtn');
    if(btn) btn.innerText = AppConfig.lang === 'hi' ? 'English' : 'हिंदी';
    
    updateUI();
    renderCalendar(); 
}

// Initialization
document.addEventListener('DOMContentLoaded', () => { 
    renderCalendar(); 
    updateUI(); 
});
