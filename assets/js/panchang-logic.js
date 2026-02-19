/**
 * MAHADEV ASTROLOGER - MASTER SCRIPT (FIREBASE VERSION)
 */

const AppConfig = {
    lang: 'hi',
    // Ye function ab window se ya Firebase se data nikalne mein madad karega
    getYearlyData: function(year) {
        const dataVarName = "Data" + year;
        return window[dataVarName] || {};
    }
};

let currentViewDate = new Date(2026, 1, 1); // Default Feb 2026
let selectedDate = new Date(); // Aaj ki date

// 1. TOP UI: Panchang Details
async function updateUI() {
    const l = AppConfig.lang;
    const year = selectedDate.getFullYear();
    
    // Check if we need to fetch data for this year
    await loadYearlyData(year);

    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const dateKey = `${month}-${day}`;
    
    const yearlyDB = AppConfig.getYearlyData(year);
    const data = yearlyDB[dateKey];

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date-display').innerText = selectedDate.toLocaleDateString(l === 'hi' ? 'hi-IN' : 'en-US', options);

    if(data) {
        fill('tithi', data.tithi ? data.tithi[l] : "--");
        fill('sunrise', data.sun ? data.sun.rise : "--");
        fill('sunset', data.sun ? data.sun.set : "--");
    } else {
        const msg = l === 'hi' ? "डेटा उपलब्ध नहीं" : "No Data Available";
        ['tithi', 'sunrise', 'sunset'].forEach(id => fill(id, msg));
    }
}

// 2. BOTTOM UI: Monthly Festivals
function renderEventList() {
    const container = document.getElementById('event-list-container');
    if(!container) return;
    container.innerHTML = '';
    const l = AppConfig.lang;
    const vMonth = String(currentViewDate.getMonth() + 1).padStart(2, '0');
    const yearlyDB = AppConfig.getYearlyData(currentViewDate.getFullYear());

    Object.keys(yearlyDB).sort().forEach(key => {
        if(key.startsWith(vMonth)) {
            const data = yearlyDB[key];
            if(data.event) {
                const day = key.split('-')[1];
                const row = document.createElement('div');
                row.style.display = "flex";
                row.style.justifyContent = "space-between";
                row.style.padding = "10px 0";
                row.style.borderBottom = "1px solid rgba(212, 175, 55, 0.3)";
                row.innerHTML = `<span class="gold-text">${day} ${l==='hi'?'तारीख':'Date'}</span> <span>${data.event[l]}</span>`;
                container.appendChild(row);
            }
        }
    });

    if(container.innerHTML === '') {
        container.innerHTML = `<p style="text-align:center; opacity:0.5; padding:20px;">${l==='hi'?'इस महीने कोई त्योहार नहीं है':'No festivals this month'}</p>`;
    }
}

// 3. MIDDLE UI: Calendar
async function renderCalendar() {
    const year = currentViewDate.getFullYear();
    const month = currentViewDate.getMonth();
    
    // Important: Wait for Firebase data before drawing calendar
    await loadYearlyData(year);

    const grid = document.getElementById('calendar-grid');
    const monthDisplay = document.getElementById('current-month-display');
    if(!grid) return;
    grid.innerHTML = '';
    
    const l = AppConfig.lang;
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

// Controls
function changeMonth(step) {
    currentViewDate.setMonth(currentViewDate.getMonth() + step);
    renderCalendar();
}

function fill(id, val) {
    const el = document.getElementById(id);
    if(el) el.innerText = val;
}

function switchLanguage() {
    AppConfig.lang = AppConfig.lang === 'hi' ? 'en' : 'hi';
    document.querySelectorAll('[data-en]').forEach(el => {
        el.innerText = el.getAttribute(`data-${AppConfig.lang}`);
    });
    const btn = document.getElementById('langBtn');
    if(btn) btn.innerText = AppConfig.lang === 'hi' ? 'English' : 'हिंदी';
    updateUI();
    renderCalendar(); 
}

// Bootstrap the App
document.addEventListener('DOMContentLoaded', () => { 
    renderCalendar(); 
    updateUI(); 
});
