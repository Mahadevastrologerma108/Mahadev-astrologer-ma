/**
 * MAHADEV ASTROLOGER M.A. - Final Merged Logic Engine
 * includes: All 9 Planets, Nakshatra, Yogini & Frequencies
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

    // 2. 9 Planets Calculation Engine
    getPlanets: (jd) => {
        const T = (jd - 2451545.0) / 36525;
        const ayanamsa = 23.85 + (1.397 * T); // Lahiri Ayanamsa

        const data = {
            Sun:     { L0: 280.466, n: 0.985647,  corr: 1.914 },
            Moon:    { L0: 218.316, n: 13.176396, corr: 6.289 },
            Mars:    { L0: 355.453, n: 0.524020,  corr: 10.691 },
            Jupiter: { L0: 34.404,  n: 0.083085,  corr: 5.549 },
            Saturn:  { L0: 49.944,  n: 0.033444,  corr: 6.500 },
            Venus:   { L0: 181.979, n: 1.602130,  corr: 0.517 },
            Mercury: { L0: 252.250, n: 4.092334,  corr: 2.500 },
            Rahu:    { L0: 125.044, n: -0.052953, corr: 0 },
        };

        let positions = {};
        for (let planet in data) {
            let p = data[planet];
            let meanPos = (p.L0 + p.n * (jd - 2451545.0)) % 360;
            let M = meanPos; 
            let truePos = (meanPos + p.corr * Math.sin(M * Math.PI / 180)) % 360;
            let siderealPos = (truePos - ayanamsa + 360) % 360;
            positions[planet] = siderealPos;
        }
        positions['Ketu'] = (positions['Rahu'] + 180) % 360;
        return positions;
    }
};

/**
 * Main Calculation Function
 */
function runCalculation() {
    // Inputs
    const d = document.getElementById('dob').value;
    const t = document.getElementById('tob').value;
    const lo = parseFloat(document.getElementById('lon').value);

    if (!d || !t || isNaN(lo)) { 
        alert("कृपया सभी विवरण सही से भरें!"); 
        return; 
    }

    // Processing
    const jd = AstroEngine.getJD(d, t, lo);
    const planets = AstroEngine.getPlanets(jd);

    // Moon Data for Yogini
    const moon = planets.Moon;
    const nakNum = Math.floor((moon * 60) / 800) + 1;
    let yIdx = (nakNum + 3) % 8 || 8;

    const yoginiData = {
        1: { name: "Mangala", freq: "528 Hz", benefit: "Love & DNA Repair" },
        2: { name: "Pingala", freq: "639 Hz", benefit: "Connecting Relationships" },
        3: { name: "Dhanya", freq: "852 Hz", benefit: "Spiritual Order" },
        4: { name: "Bhramari", freq: "417 Hz", benefit: "Undoing Situations" },
        5: { name: "Bhadrika", freq: "741 Hz", benefit: "Expression & Solutions" },
        6: { name: "Ulka", freq: "396 Hz", benefit: "Liberating Guilt & Fear" },
        7: { name: "Siddha", freq: "285 Hz", benefit: "Healing Tissues" },
        8: { name: "Sankata", freq: "963 Hz", benefit: "Divine Consciousness" }
    };

    const result = yoginiData[yIdx];

    // 1. Top Display Update
    document.getElementById('out-moon').innerText = moon.toFixed(2) + "°";
    document.getElementById('out-nak').innerText = nakNum;
    document.getElementById('out-yog').innerText = result.name;
    document.getElementById('out-freq').innerText = result.freq;
    document.getElementById('out-benefit').innerText = result.benefit;

    // 2. 9 Planets Grid Update
    const grid = document.getElementById('planets-grid');
    if (grid) {
        grid.innerHTML = ""; 
        for (let pName in planets) {
            grid.innerHTML += `
                <div style="padding: 8px; border-bottom: 1px solid #222; display: flex; justify-content: space-between;">
                    <span style="color: #888;">${pName}</span> 
                    <span style="color: #f5c542; font-weight: bold;">${planets[pName].toFixed(2)}°</span>
                </div>
            `;
        }
    }

    // Show Output
    document.getElementById('output').style.display = 'block';
    console.log("Calculation Verified: All 9 Planets Updated ✅");
}

// Event Listener
document.getElementById('runBtn').addEventListener('click', runCalculation);
