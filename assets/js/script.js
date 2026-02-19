// 1. DATA CENTER
const AppConfig = {
    lang: 'hi',
    panchangData: {
        "2026-02-18": { tithi: { hi: "शुक्ल द्वितीया", en: "Shukla Dwitiya" }, nakshatra: { hi: "शतभिषा", en: "Shatabhisha" }, yoga: { hi: "सिद्ध", en: "Siddha" }, karana: { hi: "बालव", en: "Balava" }, sun: { rise: "06:58 AM", set: "06:12 PM" } },
        "2026-02-19": { tithi: { hi: "शुक्ल तृतीया", en: "Shukla Tritiya" }, nakshatra: { hi: "पूर्वा भाद्रपद", en: "Purva Bhadrapada" }, yoga: { hi: "साध्य", en: "Sadhya" }, karana: { hi: "कौलव", en: "Kaulava" }, sun: { rise: "06:57 AM", set: "06:13 PM" } },
        "2026-02-20": { tithi: { hi: "शुक्ल चतुर्थी", en: "Shukla Chaturthi" }, nakshatra: { hi: "उत्तरा भाद्रपद", en: "Uttara Bhadrapada" }, yoga: { hi: "शुभ", en: "Shubha" }, karana: { hi: "गर", en: "Gara" }, sun: { rise: "06:56 AM", set: "06:14 PM" } },
        "2026-02-21": { tithi: { hi: "शुक्ल पंचमी", en: "Shukla Panchami" }, nakshatra: { hi: "रेवती", en: "Revati" }, yoga: { hi: "शुक्ल", en: "Shukla" }, karana: { hi: "विष्टि", en: "Vishti" }, sun: { rise: "06:55 AM", set: "06:15 PM" } },
        "2026-02-22": { tithi: { hi: "शुक्ल षष्ठी", en: "Shukla Shashti" }, nakshatra: { hi: "अश्विनी", en: "Ashwini" }, yoga: { hi: "ब्रह्म", en: "Brahma" }, karana: { hi: "बव", en: "Bava" }, sun: { rise: "06:54 AM", set: "06:15 PM" } },
        "2026-02-23": { tithi: { hi: "शुक्ल सप्तमी", en: "Shukla Saptami" }, nakshatra: { hi: "भरणी", en: "Bharani" }, yoga: { hi: "ऐन्द्र", en: "Aindra" }, karana: { hi: "तैतिल", en: "Taitila" }, sun: { rise: "06:53 AM", set: "06:16 PM" } },
        "2026-02-24": { tithi: { hi: "शुक्ल अष्टमी", en: "Shukla Ashtami" }, nakshatra: { hi: "कृत्तिका", en: "Krittika" }, yoga: { hi: "वैधृति", en: "Vaidhriti" }, karana: { hi: "वणिज", en: "Vanija" }, sun: { rise: "06:52 AM", set: "06:17 PM" } },
        "2026-02-25": { tithi: { hi: "शुक्ल नवमी", en: "Shukla Navami" }, nakshatra: { hi: "रोहिणी", en: "Rohini" }, yoga: { hi: "विषकुम्भ", en: "Vishkumbha" }, karana: { hi: "बव", en: "Bava" }, sun: { rise: "06:51 AM", set: "06:17 PM" } },
        "2026-02-26": { tithi: { hi: "शुक्ल दशमी", en: "Shukla Dashami" }, nakshatra: { hi: "मृगशिरा", en: "Mrigashira" }, yoga: { hi: "प्रीति", en: "Priti" }, karana: { hi: "तैतिल", en: "Taitila" }, sun: { rise: "06:50 AM", set: "06:18 PM" } },
        "2026-02-27": { tithi: { hi: "शुक्ल एकादशी", en: "Shukla Ekadashi" }, nakshatra: { hi: "आर्द्रा", en: "Ardra" }, yoga: { hi: "आयुष्मान", en: "Ayushman" }, karana: { hi: "वणिज", en: "Vanija" }, sun: { rise: "06:49 AM", set: "06:19 PM" } },
        "2026-02-28": { tithi: { hi: "शुक्ल द्वादशी", en: "Shukla Dwadashi" }, nakshatra: { hi: "पुनर्वसु", en: "Punarvasu" }, yoga: { hi: "सौभाग्य", en: "Saubhagya" }, karana: { hi: "बव", en: "Bava" }, sun: { rise: "06:48 AM", set: "06:20 PM" } }
    }
};

// Year/Month Tracker
let currentViewDate = new Date(2026, 1, 1); 
let selectedDate = new Date(); 

// 2. UI UPDATE
function updateUI() {
    const l = AppConfig.lang;
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const dateKey = `${year}-${month}-${day}`;

    const data = AppConfig.panchangData[dateKey];
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

// 3. MONTH NAVIGATION (Bahar hona chahiye)
function changeMonth(step) {
    currentViewDate.setMonth(currentViewDate.getMonth() + step);
    renderCalendar();
}

// 4. CALENDAR GENERATION (Dynamic)
function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    const monthDisplay = document.getElementById('current-month-display');
    if(!grid) return;

    grid.innerHTML = '';
    const l = AppConfig.lang;
    const now = new Date();
    const year = currentViewDate.getFullYear();
    const month = currentViewDate.getMonth();

    const monthNames = l === 'hi' 
        ? ["जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"]
        : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    if(monthDisplay) monthDisplay.innerText = `${monthNames[month]} ${year}`;

    const dayLabels = l === 'hi' 
        ? ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"]
        : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    dayLabels.forEach(label => {
        const dLabel = document.createElement('div');
        dLabel.style.fontWeight = "bold"; dLabel.style.color = "#D4AF37";
        dLabel.innerText = label; grid.appendChild(dLabel);
    });

    const firstDay = new Date(year, month, 1).getDay();
    for (let i = 0; i < firstDay; i++) {
        grid.appendChild(document.createElement('div'));
    }

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'cal-day';
        dayDiv.innerText = i;

        // Today & Selected highlights
        const isToday = (i === now.getDate() && month === now.getMonth() && year === now.getFullYear());
        const isSelected = (i === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear());
        
        if(isToday) dayDiv.classList.add('today-highlight');
        if(isSelected) dayDiv.classList.add('selected-highlight');

        dayDiv.onclick = () => {
            document.querySelectorAll('.cal-day').forEach(d => d.classList.remove('selected-highlight'));
            dayDiv.classList.add('selected-highlight');
            selectedDate = new Date(year, month, i);
            updateUI();
        };
        grid.appendChild(dayDiv);
    }
}

// 5. LANGUAGE & INIT
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
