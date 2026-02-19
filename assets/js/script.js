const AppConfig = {
    lang: 'hi',
    getYearlyData: function(year) {
        const dataVarName = "Data" + year;
        // Check window object (Global)
        if (window[dataVarName]) return window[dataVarName];
        return {};
    }
};

let currentViewDate = new Date(2026, 1, 1); // Feb 2026 View
let selectedDate = new Date(2026, 1, 15); // Default to 15 Feb for testing

function updateUI() {
    const l = AppConfig.lang;
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const dateKey = `${month}-${day}`;
    
    const yearlyDB = AppConfig.getYearlyData(year);
    const data = yearlyDB[dateKey];

    // Top Date Display
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
                row.className = 'row'; // Make sure your CSS has .row or style it here
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

document.addEventListener('DOMContentLoaded', () => { 
    renderCalendar(); 
    updateUI(); 
});
