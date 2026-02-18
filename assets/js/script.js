// assets/js/script.js

// 1. Language Toggle Logic (Panchang UI ke liye)
function switchLanguage() {
    AppConfig.currentLanguage = (AppConfig.currentLanguage === 'en') ? 'hi' : 'en';
    
    // Pure page ke static text badlo (Jo data-en/data-hi mein hain)
    document.querySelectorAll('[data-en]').forEach(el => {
        el.innerText = el.getAttribute(`data-${AppConfig.currentLanguage}`);
    });

    // Button text update
    const btn = document.getElementById('toggleLang');
    if(btn) btn.innerText = AppConfig.currentLanguage === 'en' ? 'Switch to Hindi' : 'हिंदी में बदलें';

    // Refresh Dynamic Data
    renderCalendar();
    fetchPanchangData(selectedDate); // Selected date ka data reload karo nayi language mein
}

// 2. Data Fetching Logic (Condition 7 & 8: JSON link)
async function fetchPanchangData(date) {
    const dateKey = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const lang = AppConfig.currentLanguage;

    try {
        // AppConfig.dataFiles.panchang se file uthao
        const response = await fetch(AppConfig.dataFiles.panchang);
        if (!response.ok) throw new Error("Data file load nahi hui");
        
        const allData = await response.json();
        const dayData = allData[dateKey];

        if (dayData) {
            // Panchang Fields Update (Bilingual)
            document.getElementById('tithi-val').innerText = dayData.tithi[lang];
            document.getElementById('nakshatra-val').innerText = dayData.nakshatra[lang];
            document.getElementById('yoga-val').innerText = dayData.yoga[lang];
            document.getElementById('karana-val').innerText = dayData.karana[lang];
            
            // Sunrise/Sunset (Same for both)
            document.getElementById('sunrise-val').innerText = dayData.sun.rise;
            document.getElementById('sunset-val').innerText = dayData.sun.set;
        } else {
            // Agar data na mile
            document.getElementById('tithi-val').innerText = (lang === 'en' ? "N/A" : "उपलब्ध नहीं");
        }
    } catch (error) {
        console.error("Error loading Panchang:", error);
    }
}

// 3. Initial Load
document.addEventListener('DOMContentLoaded', () => {
    // Calendar aur Aaj ka data load karo
    renderCalendar();
    fetchPanchangData(new Date()); 
});
