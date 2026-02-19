// 1. DATA CENTER
const AppConfig = {
    lang: 'hi',
    panchangData: {
        "2026-02-18": { tithi: { hi: "शुक्ल द्वितीया", en: "Shukla Dwitiya" }, nakshatra: { hi: "शतभिषा", en: "Shatabhisha" }, yoga: { hi: "सिद्ध", en: "Siddha" }, karana: { hi: "बालव", en: "Balava" }, sun: { rise: "06:58 AM", set: "06:12 PM" } },
        "2026-02-19": { tithi: { hi: "शुक्ल तृतीया", en: "Shukla Tritiya" }, nakshatra: { hi: "पूर्वा भाद्रपद", en: "Purva Bhadrapada" }, yoga: { hi: "साध्य", en: "Sadhya" }, karana: { hi: "कौलव", en: "Kaulava" }, sun: { rise: "06:57 AM", set: "06:13 PM" } },
        "2026-02-20": { tithi: { hi: "शुक्ल चतुर्थी", en: "Shukla Chaturthi" }, nakshatra: { hi: "उत्तरा भाद्रपद", en: "Uttara Bhadrapada" }, yoga: { hi: "शुभ", en: "Shubha" }, karana: { hi: "गर", en: "Gara" }, sun: { rise: "06:56 AM", set: "06:14 PM" } }
    }
};

let selectedDate = new Date(); 

// 2. UI UPDATE FUNCTION
function updateUI() {
    const l = AppConfig.lang;
    // Date formatting fix: Local date ko YYYY-MM-DD mein badalna
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const dateKey = `${year}-${month}-${day}`;

    const data = AppConfig.panchangData[dateKey];

    // Date Display Header
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const displayDate = selectedDate.toLocaleDateString(l === 'hi' ? 'hi-IN' : 'en-US', options);
    
    fill('date-display', displayDate);

    if(data) {
        fill('tithi', data.tithi[l]);
        fill('nakshatra', data.nakshatra[l]);
        fill('yoga', data.yoga[l]);
        fill('karana', data.karana[l]);
        fill('sunrise', data.sun.rise);
        fill('sunset', data.sun.set);
    } else {
        const msg = l === 'hi' ? "डेटा उपलब्ध नहीं" : "No Data Available";
        ['tithi', 'nakshatra', 'yoga', 'karana', 'sunrise', 'sunset'].forEach(id => fill(id, msg));
    }
}

function fill(id, val) {
    const el = document.getElementById(id);
    if(el) el.innerText = val;
}

// 3. CALENDAR GENERATION
function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    if(!grid) return;

    grid.innerHTML = '';
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'cal-day';
        dayDiv.innerText = i;

        // Highlight Today
        if(i === now.getDate() && month === now.getMonth()) dayDiv.classList.add('today-highlight');
        
        // Highlight Selected
        if(i === selectedDate.getDate()) dayDiv.classList.add('selected-highlight');

        dayDiv.onclick = () => {
            document.querySelectorAll('.cal-day').forEach(d => d.classList.remove('selected-highlight'));
            dayDiv.classList.add('selected-highlight');
            selectedDate = new Date(year, month, i);
            updateUI();
        };
        grid.appendChild(dayDiv);
    }
}

// 4. LANGUAGE SWITCHER
function switchLanguage() {
    AppConfig.lang = AppConfig.lang === 'hi' ? 'en' : 'hi';
    
    document.querySelectorAll('[data-en]').forEach(el => {
        el.innerText = el.getAttribute(`data-${AppConfig.lang}`);
    });

    const btn = document.getElementById('langBtn');
    if(btn) btn.innerText = AppConfig.lang === 'hi' ? 'English' : 'हिंदी';

    updateUI();
}

// 5. SINGLE INIT
document.addEventListener('DOMContentLoaded', () => {
    renderCalendar();
    updateUI();
});
