/**
 * MAHADEV ASTROLOGER M.A. - PRO ENGINE (Fixes Sun & Accuracy)
 */

const AstroEngine = {
    // 1. अहर्गण (Julian Day Calculation)
    getJD: (d, t, lon) => {
        let [y, m, day] = d.split('-').map(Number);
        let [h, min] = t.split(':').map(Number);
        let decimalTime = h + (min / 60);
        if (m <= 2) { y--; m += 12; }
        let a = Math.floor(y / 100);
        let b = 2 - a + Math.floor(a / 4);
        let jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5;
        return jd + (decimalTime / 24) - (lon / 360);
    },

    // 2. DMS + Rashi Fix (Negative Value Check Included)
    formatDMS: (decimalDegree) => {
        // सबसे जरूरी: माइनस वैल्यू को 0-360 की रेंज में लाना
        let normalized = (decimalDegree % 360 + 360) % 360;
        
        const rashis = ["Mesha", "Vrishabha", "Mithuna", "Karka", "Simha", "Kanya", "Tula", "Vrishchika", "Dhanu", "Makara", "Kumbha", "Meena"];
        let rashiIndex = Math.floor(normalized / 30);
        let rashiName = rashis[rashiIndex];
        
        let degInside = normalized % 30;
        let d = Math.floor(degInside);
        let m = Math.floor((degInside - d) * 60);
        let s = Math.round((((degInside - d) * 60) - m) * 60);
        
        if (s === 60) { s = 0; m++; }
        if (m === 60) { m = 0; d++; }

        return `${d}°${m}'${s}" <small style="color:#888;">(${rashiName})</small>`;
    },

    // 3. 9 Planets Engine (High Precision Constants)
    getPlanets: (jd) => {
        const T = (jd - 2451545.0) / 36525;
        const ayanamsa = 23.85 + (1.397 * T); 

        // Refined 'n' (Mean Motion) for Pro accuracy
        const data = {
            Sun:     { L0: 280.466, n: 0.98564736,  corr: 1.914 },
            Moon:    { L0: 218.316, n: 13.176396,   corr: 6.289 },
            Mars:    { L0: 355.453, n: 0.524020,    corr: 10.691 },
            Jupiter: { L0: 34.404,  n: 0.083085,    corr: 5.549 },
            Saturn:  { L0: 49.944,  n: 0.033444,    corr: 6.500 },
            Venus:   { L0: 181.979, n: 1.602130,    corr: 0.517 },
            Mercury: { L0: 252.250, n: 4.092334,    corr: 2.500 },
            Rahu:    { L0: 125.044, n: -0.052953,   corr: 0 },
        };

        let positions = {};
        for (let planet in data) {
            let p = data[planet];
            let days = jd - 2451545.0;
            let meanPos = (p.L0 + p.n * days) % 360;
            
            // Negative Correction
            let M = (meanPos < 0) ? meanPos + 360 : meanPos;
            let truePos = (meanPos + p.corr * Math.sin(M * Math.PI / 180)) % 360;
            
            let siderealPos = (truePos - ayanamsa + 360) % 360;
            positions[planet] = siderealPos;
        }
        positions['Ketu'] = (positions['Rahu'] + 180) % 360;
        return positions;
    }
};

/**
 * Execution logic
 */
function runCalculation() {
    const d = document.getElementById('dob').value;
    const t = document.getElementById('tob').value;
    const lo = parseFloat(document.getElementById('lon').value);

    if (!d || !t || isNaN(lo)) { 
        alert("कृपया सभी विवरण सही से भरें!"); 
        return; 
    }

    const jd = AstroEngine.getJD(d, t, lo);
    const planets = AstroEngine.getPlanets(jd);

    const moon = planets.Moon;
    const nakNum = Math.floor((moon * 60) / 800) + 1;
    let yIdx = (nakNum + 3) % 8 || 8;

    const yoginiData = {
        1: { name: "Mangala", freq: "528 Hz", benefit: "Love & DNA Repair" },
        2: { name: "Pingala", freq: "639 Hz", benefit: "Relationships" },
        3: { name: "Dhanya", freq: "852 Hz", benefit: "Intuition" },
        4: { name: "Bhramari", freq: "417 Hz", benefit: "Change" },
        5: { name: "Bhadrika", freq: "741 Hz", benefit: "Solutions" },
        6: { name: "Ulka", freq: "396 Hz", benefit: "Fear Removal" },
        7: { name: "Siddha", freq: "285 Hz", benefit: "Healing" },
        8: { name: "Sankata", freq: "963 Hz", benefit: "Awakening" }
    };

    const result = yoginiData[yIdx];

    // 1. Update UI (Using innerHTML for the <small> rashi tags)
    document.getElementById('out-moon').innerHTML = AstroEngine.formatDMS(moon);
    document.getElementById('out-nak').innerText = nakNum;
    document.getElementById('out-yog').innerText = result.name;
    document.getElementById('out-freq').innerText = result.freq;
    document.getElementById('out-benefit').innerText = result.benefit;

    // 2. Update Navagraha Grid
    const grid = document.getElementById('planets-grid');
    if (grid) {
        grid.innerHTML = ""; 
        for (let pName in planets) {
            grid.innerHTML += `
                <div style="padding: 8px; border-bottom: 1px solid #222; display: flex; justify-content: space-between; align-items:center;">
                    <span style="color: #888;">${pName}</span> 
                    <span style="color: #f5c542; font-weight: bold; font-size: 0.9rem;">
                        ${AstroEngine.formatDMS(planets[pName])}
                    </span>
                </div>
            `;
        }
    }

    document.getElementById('output').style.display = 'block';
}

// Event Listener
document.getElementById('runBtn').addEventListener('click', runCalculation);
