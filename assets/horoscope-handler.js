function loadHoroscope(rashiKey) {
    const lang = localStorage.getItem('selectedLang') || 'hi'; 
    const data = window.dailyHoroscope ? window.dailyHoroscope[rashiKey] : null;

    if (data) {
        // Date setup
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const todayStr = new Date().toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-US', options);
        if(document.getElementById('todayDate')) document.getElementById('todayDate').innerText = todayStr;

        // Content
        const fields = {
            'h-career': data.career[lang],
            'h-love': data.love[lang],
            'h-health': data.health[lang],
            'h-tip': data.tip[lang],
            'h-color': data.luckyColor[lang],
            'h-number': data.luckyNumber,
            'h-time': data.luckyTime
        };

        Object.entries(fields).forEach(([id, val]) => {
            const el = document.getElementById(id);
            if(el) el.innerText = val || "--";
        });

        // Title
        const rashiTitle = document.getElementById('rashi-title');
        if(rashiTitle) rashiTitle.innerText = rashiKey.toUpperCase() + (lang === 'hi' ? " राशिफल" : " Horoscope");
    }
}
