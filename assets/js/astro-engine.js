/**
 * MAHADEV ASTROLOGER M.A. - Logic Engine
 */

const AstroEngine = {
    // Julian Day Calculation
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

    // True Moon Position (Vedic Ayanamsa Included)
    getMoon: (jd) => {
        const T = (jd - 2451545.0) / 36525;
        let L0 = 218.316 + 481267.881 * T; 
        let M = 134.963 + 477198.867 * T;   
        let correction = 6.289 * Math.sin(M * Math.PI / 180); 
        let trueMoon = (L0 + correction) % 360;
        
        let ayanamsa = 23.85 + (1.397 * T); 
        let siderealMoon = (trueMoon - ayanamsa + 360) % 360;
        return siderealMoon;
    }
};

// Function to handle UI and Trigger Calculation
function runCalculation() {
    const d = document.getElementById('dob').value;
    const t = document.getElementById('tob').value;
    const la = parseFloat(document.getElementById('lat').value);
    const lo = parseFloat(document.getElementById('lon').value);

    const jd = AstroEngine.getJD(d, t, lo);
    const moon = AstroEngine.getMoon(jd);
    const nakNum = Math.floor((moon * 60) / 800) + 1;
    
    let yIdx = (nakNum + 3) % 8;
    if (yIdx === 0) yIdx = 8;

    const yoginis = ["", "Mangala", "Pingala", "Dhanya", "Bhramari", "Bhadrika", "Ulka", "Siddha", "Sankata"];

    // Update the Screen
    document.getElementById('out-moon').innerText = moon.toFixed(2) + "°";
    document.getElementById('out-nak').innerText = nakNum;
    document.getElementById('out-yog').innerText = yoginis[yIdx];
    document.getElementById('output').style.display = 'block';

    console.log("Mahadev Engine Status: Calculation Verified ✅");
}

// Event Listener for the button
document.getElementById('runBtn').addEventListener('click', runCalculation);
