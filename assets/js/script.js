// 1. DATA CENTER (Bhai, yahan data add karte rehna)
const AppConfig = {
    lang: 'hi',
    panchangData: {
        "2026-02-18": { tithi: { hi: "शुक्ल द्वितीया", en: "Shukla Dwitiya" }, nakshatra: { hi: "शतभिषा", en: "Shatabhisha" }, yoga: { hi: "सिद्ध", en: "Siddha" }, karana: { hi: "बालव", en: "Balava" }, sun: { rise: "06:58 AM", set: "06:12 PM" } },
        "2026-02-19": { tithi: { hi: "शुक्ल तृतीया", en: "Shukla Tritiya" }, nakshatra: { hi: "पूर्वा भाद्रपद", en: "Purva Bhadrapada" }, yoga: { hi: "साध्य", en: "Sadhya" }, karana: { hi: "कौलव", en: "Kaulava" }, sun: { rise: "06:57 AM", set: "06:13 PM" } },
        "2026-02-20": { tithi: { hi: "शुक्ल चतुर्थी", en: "Shukla Chaturthi" }, nakshatra: { hi: "उत्तरा भाद्रपद", en: "Uttara Bhadrapada" }, yoga: { hi: "शुभ", en: "Shubha" }, karana: { hi: "गर", en: "Gara" }, sun: { rise: "06:56 AM", set: "06:14 PM" } }
        // Aise hi baaki dates add hongi
    }
};

let selectedDate = new Date(); // Default: Aaj ki date

// 2. UI UPDATE FUNCTION
function updateUI() {
    const l = AppConfig.lang;
    const dateKey = selectedDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const data = AppConfig.panchangData[dateKey];

    // Date Header update
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const displayDate = selectedDate.toLocaleDateString(l === 'hi' ? 'hi-IN' : 'en-US', options);
    
    const dateEl = document.getElementById('date-display');
    if(dateEl) dateEl.innerText = displayDate;

    // Panchang Fields update
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

// Helper: Safety check ke saath text bharna
function fill(id, val) {
    const el = document.getElementById(id);
    if(el) el.innerText = val;
}

// 3. LANGUAGE SWITCHER
function switchLanguage() {
    AppConfig.lang = AppConfig.lang === 'hi' ? 'en' : 'hi';
    
    // Header/Nav/Static text update
    document.querySelectorAll('[data-en]').forEach(el => {
        el.innerText = el.getAttribute(`data-${AppConfig.lang}`);
    });

    // Button Text Update
    const btn = document.getElementById('langBtn');
    if(btn) btn.innerText = AppConfig.lang === 'hi' ? 'English' : 'हिंदी';

    updateUI();
}

// 4. INIT ON LOAD
document.addEventListener('DOMContentLoaded', () => {
    updateUI();
});
