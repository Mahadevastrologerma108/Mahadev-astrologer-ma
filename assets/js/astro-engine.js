/**
 * MAHADEV ASTROLOGER M.A. - Modular Pro Engine
 * 1. CONFIGURATION: ग्रहों और योगिनी का डेटा यहाँ बदलें।
 * 2. UTILS: गणितीय गणना (Maths) यहाँ है।
 * 3. CORE: अहर्गण और ग्रह स्पष्ट का इंजन।
 * 4. UI: स्क्रीन पर डेटा दिखाने का लॉजिक।
 */

// ==========================================
// 1. CONFIGURATION (Edit here to change data)
// ==========================================
const PLANETARY_DATA = {
    Sun:     { L0: 280.466, n: 0.98564736,  corr: 1.914 },
    Moon:    { L0: 218.316, n: 13.176396,   corr: 6.289 },
    Mars:    { L0: 355.453, n: 0.524020,    corr: 10.691 },
    Jupiter: { L0: 34.404,  n: 0.083085,    corr: 5.549 },
    Saturn:  { L0: 49.944,  n: 0.033444,    corr: 6.500 },
    Venus:   { L0: 181.979, n: 1.602130,    corr: 0.517 },
    Mercury: { L0: 252.250, n: 4.092334,    corr: 2.500 },
    Rahu:    { L0: 125.044, n: -0.052953,   corr: 0 },
};

const YOGINI_CONFIG = {
    1: { name: "Mangala",  freq: "528 Hz", benefit: "Love & DNA Repair" },
    2: { name: "Pingala",  freq: "639 Hz", benefit: "Relationships" },
    3: { name: "Dhanya",   freq: "852 Hz", benefit: "Intuition" },
    4: { name: "Bhramari", freq: "417 Hz", benefit: "Change" },
    5: { name: "Bhadrika", freq: "741 Hz", benefit: "Solutions" },
    6: { name: "Ulka",     freq: "396 Hz", benefit: "Fear Removal" },
    7: { name: "Siddha",   freq: "285 Hz", benefit: "Healing" },
    8: { name: "Sankata",  freq: "963 Hz", benefit: "Awakening" }
};

const RASHI_NAMES = ["Mesha", "Vrishabha", "Mithuna", "Karka", "Simha", "Kanya", "Tula", "Vrishchika", "Dhanu", "Makara", "Kumbha", "Meena"];

// ==========================================
// 2. UTILS (Helper functions)
// ==========================================
const AstroUtils = {
    normalize: (deg) => (deg % 360 + 360) % 360,
    
    toDMS: (decimalDegree) => {
        let normalized = AstroUtils.normalize(decimalDegree);
        let rashiName = RASHI_NAMES[Math.floor(normalized / 30)];
        
        let degInside = normalized % 30;
        let d = Math.floor(degInside);
        let m = Math.floor((degInside - d) * 60);
        let s = Math.round((((degInside - d) * 60) - m) * 60);
        
        if (s === 60) { s = 0; m++; }
        if (m === 60) { m = 0; d++; }

        return `${d}°${m}'${s}" <small style="color:#888;">(${rashiName})</small>`;
    }
};

// ==========================================
// 3. CORE ENGINE (Astrological Calculations)
// ==========================================
const AstroEngine = {
    getJulianDay: (d, t, lon) => {
        let [y, m, day] = d.split('-').map(Number);
        let [h, min] = t.split(':').map(Number);
        let decimalTime = h + (min / 60);
        if (m <= 2) { y--; m += 12; }
        let a = Math.floor(y / 100);
        let b = 2 - a + Math.floor(a / 4);
        let jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5;
        return jd + (decimalTime / 24) - (lon / 360);
    },

    calculatePlanets: (jd) => {
        const T = (jd - 2451545.0) / 36525;
        const ayanamsa = 23.85 + (1.397 * T); 
        let positions = {};

        for (let planet in PLANETARY_DATA) {
            let p = PLANETARY_DATA[planet];
            let meanPos = (p.L0 + p.n * (jd - 2451545.0)) % 360;
            let M = AstroUtils.normalize(meanPos);
            let truePos = (meanPos + p.corr * Math.sin(M * Math.PI / 180)) % 360;
            positions[planet] = (truePos - ayanamsa + 360) % 360;
        }
        positions['Ketu'] = (positions['Rahu'] + 180) % 360;
        return positions;
    }
};

// ==========================================
// 4. UI & EXECUTION (Final Output)
// ==========================================
function runCalculation() {
    // A. Grab Inputs
    const dateInput = document.getElementById('dob').value;
    const timeInput = document.getElementById('tob').value;
    const lonInput = parseFloat(document.getElementById('lon').value);

    if (!dateInput || !timeInput || isNaN(lonInput)) {
        alert("कृपया सभी विवरण सही से भरें!");
        return;
    }

    // B. Calculate Data
    const jd = AstroEngine.getJulianDay(dateInput, timeInput, lonInput);
    const planets = AstroEngine.calculatePlanets(jd);
    
    // C. Yogini Logic
    const moonDegree = planets.Moon;
    const nakNum = Math.floor((moonDegree * 60) / 800) + 1;
    const yogini = YOGINI_CONFIG[(nakNum + 3) % 8 || 8];

    // D. Render Results
    updateMainUI(moonDegree, nakNum, yogini);
    renderPlanetsGrid(planets);

    document.getElementById('output').style.display = 'block';
}

function updateMainUI(moonDeg, nak, yog) {
    document.getElementById('out-moon').innerHTML = AstroUtils.toDMS(moonDeg);
    document.getElementById('out-nak').innerText = nak;
    document.getElementById('out-yog').innerText = yog.name;
    document.getElementById('out-freq').innerText = yog.freq;
    document.getElementById('out-benefit').innerText = yog.benefit;
}

function renderPlanetsGrid(planets) {
    const grid = document.getElementById('planets-grid');
    if (!grid) return;
    
    grid.innerHTML = Object.entries(planets).map(([pName, pDeg]) => `
        <div class="planet-row" style="padding: 8px; border-bottom: 1px solid #222; display: flex; justify-content: space-between; align-items:center;">
            <span style="color: #888;">${pName}</span> 
            <span style="color: #f5c542; font-weight: bold; font-size: 0.9rem;">
                ${AstroUtils.toDMS(pDeg)}
            </span>
        </div>
    `).join('');
}

// 5. Initialize
document.getElementById('runBtn').addEventListener('click', runCalculation);
