/**
 * MAHADEV ASTROLOGER M.A. - Final Merged Logic Engine
 * Includes: Julian Day, Moon Position, Nakshatra, Yogini & Frequency
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

    // 2. ग्रह स्पष्ट (True Moon Position with Lahiri Ayanamsa)
    getMoon: (jd) => {
        const T = (jd - 2451545.0) / 36525;
        let L0 = 218.316 + 481267.881 * T; // Mean Moon
        let M = 134.963 + 477198.867 * T;   // Mean Anomaly
        let correction = 6.289 * Math.sin(M * Math.PI / 180); // Mand-Phala
        let trueMoon = (L0 + correction) % 360;
        
        let ayanamsa = 23.85 + (1.397 * T); // Lahiri Ayanamsa
        let siderealMoon = (trueMoon - ayanamsa + 360) % 360;
        return siderealMoon;
    }
};

// 3. Single Execution Function
function runCalculation() {
    const d = document.getElementById('dob').value;
    const t = document.getElementById('tob').value;
    const lo = parseFloat(document.getElementById('lon').value);

    // Validate inputs
    if (!d || !t || isNaN(lo)) {
        alert("Please fill all details correctly!");
        return;
    }

    // Processing via Engine
    const jd = AstroEngine.getJD(d, t, lo);
    const moon = AstroEngine.getMoon(jd);
    const nakNum = Math.floor((moon * 60) / 800) + 1;
    
    let yIdx = (nakNum + 3) % 8;
    if (yIdx === 0) yIdx = 8;

    // Smart Frequency Database
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
    document.getElementById('out-moon').innerText = moon.toFixed(2) + "°";
    document.getElementById('out-nak').innerText = nakNum;
    document.getElementById('out-yog').innerText = result.name;
    document.getElementById('out-freq').innerText = result.freq;
    document.getElementById('out-benefit').innerText = result.benefit;
    
    // Show the hidden output box
    document.getElementById('output').style.display = 'block';

    console.log(`Mahadev Engine: ${result.name} identified at ${result.freq} ✅`);
}

// 4. Event Listener
document.getElementById('runBtn').addEventListener('click', runCalculation);
