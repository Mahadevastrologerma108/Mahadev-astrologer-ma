// 1. DATA CENTER - Yahan sara Panchang aur Festivals ka data rahega
const AppConfig = {
    lang: 'hi',
    panchangData: {
        // FEBRUARY 2026
        "2026-02-15": { tithi: { hi: "फाल्गुन कृष्ण त्रयोदशी", en: "Phalguna Krishna Trayodashi" }, event: { hi: "महाशिवरात्रि", en: "Maha Shivratri" }, sun: { rise: "07:01 AM", set: "06:10 PM" } },
        "2026-02-18": { tithi: { hi: "शुक्ल द्वितीया", en: "Shukla Dwitiya" }, sun: { rise: "06:58 AM", set: "06:12 PM" } },
        "2026-02-19": { tithi: { hi: "शुक्ल तृतीया", en: "Shukla Tritiya" }, sun: { rise: "06:57 AM", set: "06:13 PM" } },
        "2026-02-20": { tithi: { hi: "शुक्ल चतुर्थी", en: "Shukla Chaturthi" }, sun: { rise: "06:56 AM", set: "06:14 PM" } },
        "2026-02-28": { tithi: { hi: "शुक्ल द्वादशी", en: "Shukla Dwadashi" }, sun: { rise: "06:48 AM", set: "06:20 PM" } },

        // MARCH 2026
        "2026-03-03": { tithi: { hi: "फाल्गुन शुक्ल पूर्णिमा", en: "Phalguna Shukla Purnima" }, event: { hi: "होली (धुलेंडी)", en: "Holi" }, sun: { rise: "06:45 AM", set: "06:22 PM" } },
        "2026-03-19": { tithi: { hi: "चैत्र शुक्ल प्रतिपदा", en: "Chaitra Shukla Pratipada" }, event: { hi: "चैत्र नवरात्रि / गुड़ी पड़वा", en: "Chaitra Navratri" }, sun: { rise: "06:27 AM", set: "06:31 PM" } },
        "2026-03-27": { tithi: { hi: "चैत्र शुक्ल नवमी", en: "Chaitra Shukla Navami" }, event: { hi: "राम नवमी", en: "Rama Navami" }, sun: { rise: "06:18 AM", set: "06:36 PM" } }
    }
};

let currentViewDate = new Date(2026, 1, 1); // Calendar kis month pe dikhega (Feb 2026)
let selectedDate = new Date(); // Konsi date select hui hai

// 2. UI UPDATE (Top Section)
function updateUI() {
    const l = AppConfig.lang;
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const dateKey = `${year}-${month}-${day}`;
    const data = AppConfig.panchangData[dateKey];

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date-display').innerText = selectedDate.toLocaleDateString(l === 'hi' ? 'hi-IN' : 'en-US', options);

    if(data) {
        fill('tithi', data.tithi[l]);
        fill('sunrise', data.sun.rise);
        fill('sunset', data.sun.set);
    } else {
        const msg = l === 'hi' ? "डेटा उपलब्ध नहीं" : "No Data Available";
        ['tithi', 'sunrise', 'sunset'].forEach(id => fill(id, msg));
    }
}

function fill(id, val) {
    const el = document.getElementById(id);
    if(el) el.innerText = val;
}

// 3. MONTHLY EVENT LIST (Bottom Section)
function renderEventList() {
    const container = document.getElementById('event-list-container');
    if(!container) return;
    container.innerHTML = '';
    const l = AppConfig.lang;
    const vMonth = currentViewDate.getMonth() + 1;
    const vYear = currentViewDate.getFullYear();

    Object.keys(AppConfig.panchangData).sort().forEach(dateKey => {
        const [y, m, d] = dateKey.split('-');
        if(parseInt(y) === vYear && parseInt(m) === vMonth) {
            const data = AppConfig.panchangData[dateKey];
            if(data.event) {
                const row = document.createElement('div');
                row.className = 'row';
                row.innerHTML = `<span class="gold-text">${d} ${l==='hi'?'तारीख':'Date'}</span> <span>${data.event[l]}</span>`;
                container.appendChild(row);
            }
        }
    });
    if(container.innerHTML === '') {
        container.innerHTML = `<p style="text-align:center; opacity:0.5; padding:10px;">${l==='hi'?'इस महीने कोई त्योहार नहीं है':'No festivals this month'}</p>`;
    }
}

// 4. CALENDAR GENERATION (Middle Section)
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

// 5. NAVIGATION & LANGUAGE
function changeMonth(step) {
    currentViewDate.setMonth(currentViewDate.getMonth() + step);
    renderCalendar();
}

function switchLanguage() {
    AppConfig.lang = AppConfig.lang === 'hi' ? 'en' : 'hi';
    document.querySelectorAll('[data-en]').forEach(el => el.innerText = el.getAttribute(`data-${AppConfig.lang}`));
    const btn = document.getElementById('langBtn');
    if(btn) btn.innerText = AppConfig.lang === 'hi' ? 'English' : 'हिंदी';
    updateUI();
    renderCalendar(); 
}

document.addEventListener('DOMContentLoaded', () => { renderCalendar(); updateUI(); });
