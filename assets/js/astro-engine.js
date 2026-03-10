/**
 * MAHADEV ASTROLOGER M.A. - 9 Planets Logic Engine
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

        // Planetary Constants: [Mean Longitude L0, Mean Motion n, Mand-Phala Correction]
        const data = {
            Sun:     { L0: 280.466, n: 0.985647,  corr: 1.914 },
            Moon:    { L0: 218.316, n: 13.176396, corr: 6.289 },
            Mars:    { L0: 355.453, n: 0.524020,  corr: 10.691 },
            Jupiter: { L0: 34.404,  n: 0.083085,  corr: 5.549 },
            Saturn:  { L0: 49.944,  n: 0.033444,  corr: 6.500 },
            Venus:   { L0: 181.979, n: 1.602130,  corr: 0.517 },
            Mercury: { L0: 252.250, n: 4.092334,  corr: 2.500 },
            Rahu:    { L0: 125.044, n: -0.052953, corr: 0 }, // Mean Node
        };

        let positions = {};
        for (let planet in data) {
            let p = data[planet];
            // Mean Position
            let meanPos = (p.L0 + p.n * (jd - 2451545.0)) % 360;
            // Mean Anomaly (Simplified for JS Engine)
            let M = meanPos; 
            // True Position with correction
            let truePos = (meanPos + p.corr * Math.sin(M * Math.PI / 180)) % 360;
            // Apply Ayanamsa
            let siderealPos = (truePos - ayanamsa + 360) % 360;
            positions[planet] = siderealPos;
        }

        // Ketu is always Rahu + 180
        positions['Ketu'] = (positions['Rahu'] + 180) % 360;

        return positions;
    }
};

function runCalculation() {
    const d = document.getElementById('dob').value;
    const t = document.getElementById('tob').value;
    const lo = parseFloat(document.getElementById('lon').value);

    if (!d || !t || isNaN(lo)) { alert("Fill all details!"); return; }

    const jd = AstroEngine.getJD(d, t, lo);
    const planets = AstroEngine.getPlanets(jd);

    // Nakshatra & Yogini Calculation based on Moon
    const moon = planets.Moon;
    const nakNum = Math.floor((moon * 60) / 800) + 1;
    let yIdx = (nakNum + 3) % 8 || 8;

    const yoginiData = {
        1: { name: "Mangala", freq: "528 Hz", benefit: "Love & DNA Repair" },
        2: { name: "Pingala", freq: "639 Hz", benefit: "Connecting Relationships" },
        3: { name: "Dhanya", freq: "852 Hz", benefit: "Spiritual Order & Intuition" },
        4: { name: "Bhramari", freq: "417 Hz", benefit: "Undoing Situations & Change" },
        5: { name: "Bhadrika", freq: "741 Hz", benefit: "Expression & Solutions" },
        6: { name: "Ulka", freq: "396 Hz", benefit: "Liberating Guilt & Fear" },
        7: { name: "Siddha", freq: "285 Hz", benefit: "Healing Tissues & Organs" },
        8: { name: "Sankata", freq: "963 Hz", benefit: "Divine Consciousness & Awakening" }
    };

    const result = yoginiData[yIdx];

    // --- Update UI ---
    // Standard Results
    document.getElementById('out-moon').innerText = moon.toFixed(2) + "°";
    document.getElementById('out-nak').innerText = nakNum;
    document.getElementById('out-yog').innerText = result.name;
    document.getElementById('out-freq').innerText = result.freq;
    document.getElementById('out-benefit').innerText = result.benefit;

    // 9 Planets Display (Console logging for verification)
    console.log("--- 9 Planets Report ---");
    console.table(planets);

    document.getElementById('output').style.display = 'block';
}

document.getElementById('runBtn').addEventListener('click', runCalculation);
