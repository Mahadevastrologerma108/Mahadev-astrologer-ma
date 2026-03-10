/**
 * MAHADEV ASTROLOGER M.A. - Final Calibrated Pro Engine
 * 1. CONFIGURATION: ग्रहों के स्थिरांक (Calibrated to match user's Panchang)
 * 2. UTILS: DMS और Rashi का शुद्ध लॉजिक।
 * 3. CORE: अहर्गण और स्पष्ट ग्रह गणना।
 * 4. UI: रिजल्ट डिस्प्ले।
 */

// ==========================================
// 1. CONFIGURATION (Edit values here)
// ==========================================
const PLANETARY_DATA = {
    // L0, n, और corr को आपके पंचांग डेटा के अनुसार कैलिब्रेट किया गया है
    Sun:     { L0: 280.460, n: 0.985647,  corr: 1.914 },
    Moon:    { L0: 218.316, n: 13.176396, corr: 6.289 },
    Mars:    { L0: 355.453, n: 0.524020,  corr: 1.200 }, 
    Jupiter: { L0: 34.404,  n: 0.083085,  corr: 3.500 }, 
    Saturn:  { L0: 49.944,  n: 0.033444,  corr: 2.100 }, 
    Venus:   { L0: 181.979, n: 1.602130,  corr: 0.400 }, 
    Mercury: { L0: 252.250, n: 4.092334,  corr: 1.500 }, 
    Rahu:    { L0: 125.044, n: -0.052953, corr: 0 },
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
// 2. UTILS (Normalize & Format)
// ==========================================
const AstroUtils = {
    // माइनस डिग्री को सही रेंज (0-360) में लाने के लिए
    normalize: (deg) => (deg % 360 + 360) % 360,
    
    toDMS: (decimalDegree) => {
        let normalized = AstroUtils.normalize(decimalDegree);
        let rashiIndex = Math.floor(normalized / 30);
        let rashiName = RASHI_NAMES[rashiIndex];
        
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
// 3. CORE ENGINE (Calculations)
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
        // Calibrated Ayanamsa to match high-precision Panchang
        const ayanamsa = 24.12 + (0.0001 * T); 
        let positions = {};

        for (let planet in PLANETARY_DATA) {
            let p = PLANETARY_DATA[planet];
            let meanPos = (p.L0 + p.n * (jd - 2451545.0)) % 360;
            let M = AstroUtils.normalize(meanPos);
            // Equation of center (Mand-phala)
            let truePos = (meanPos + p.corr * Math.sin(M * Math.PI / 180)) % 360;
            // Sidereal position (Nirayana)
            positions[planet] = (truePos - ayanamsa + 360) % 360;
        }
        positions['Ketu'] = (positions['Rahu'] + 180) % 360;
        return positions;
    }
};

// ==========================================
// 4. UI & EXECUTION
// ==========================================
function runCalculation() {
    const dateInput = document.getElementById('dob').value;
    const timeInput = document.getElementById('tob').value;
    const lonInput = parseFloat(document.getElementById('lon').value);

    if (!dateInput || !timeInput || isNaN(lonInput)) {
        alert("विवरण सही भरें!");
        return;
    }

    const jd = AstroEngine.getJulianDay(dateInput, timeInput, lonInput);
    const planets = AstroEngine.calculatePlanets(jd);
    
    // Moon for Yogini
    const nakNum = Math.floor((planets.Moon * 60) / 800) + 1;
    const yogini = YOGINI_CONFIG[(nakNum + 3) % 8 || 8];

    // UI Updates
    document.getElementById('out-moon').innerHTML = AstroUtils.toDMS(planets.Moon);
    document.getElementById('out-nak').innerText = nakNum;
    document.getElementById('out-yog').innerText = yogini.name;
    document.getElementById('out-freq').innerText = yogini.freq;
    document.getElementById('out-benefit').innerText = yogini.benefit;

    renderPlanetsGrid(planets);
    document.getElementById('output').style.display = 'block';
}

function renderPlanetsGrid(planets) {
    const grid = document.getElementById('planets-grid');
    if (!grid) return;
    grid.innerHTML = Object.entries(planets).map(([pName, pDeg]) => `
        <div style="padding: 8px; border-bottom: 1px solid #222; display: flex; justify-content: space-between; align-items:center;">
            <span style="color: #888;">${pName}</span> 
            <span style="color: #f5c542; font-weight: bold; font-size: 0.85rem;">
                ${AstroUtils.toDMS(pDeg)}
            </span>
        </div>
    `).join('');
}

// Start
document.getElementById('runBtn').addEventListener('click', runCalculation);
