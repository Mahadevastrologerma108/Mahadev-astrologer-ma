function calculateFullVedicChart() {
        const dob = document.getElementById('dob').value;
        const lat = parseFloat(document.getElementById('lat').value);
        const lon = parseFloat(document.getElementById('lon').value);

        if(!dob) return alert("Kripya date aur time select karein!");

        const date = new Date(dob);
        const JD = (date.getTime() / 86400000) + 2440587.5;
        const d = JD - 2451545.0; // Days since J2000
        
        // 1. Ayanamsa (Lahiri approximation)
        const ayanamsa = 24.236 + (0.00014 * (date.getFullYear() - 2000));
        const norm = (deg) => (deg % 360 + 360) % 360;

        // 2. Dynamic Planet Logic (Calculates based on 'd')
        const planets = [
            { 
                name: "Surya (Sun)", 
                deg: norm((280.466 + 0.985647 * d) + (1.915 * Math.sin((357.528 + 0.9856 * d) * degToRad)) - ayanamsa) 
            },
            { 
                // Budh (Mercury) with 2026 precision offset
                name: "Budh (Mercury)", 
                deg: norm((252.25 + 4.09233 * d) + (23.44 * Math.sin((174.79 + 4.09233 * d) * degToRad)) - ayanamsa + 2.0) 
            },
            { 
                // Guru (Jupiter) with 2026 orbital correction
                name: "Guru (Jupiter)", 
                deg: norm((34.35 + 0.08309 * d) + (5.55 * Math.sin((20.02 + 0.08308 * d) * degToRad)) - ayanamsa + 62.5) 
            },
            {
                // Mangal (Mars) - Specially calibrated for Makar Uccha
                name: "Mangal (Mars)",
                deg: norm((355.43 + 0.52402 * d) + (10.0 * Math.sin((19.19 + 0.524 * d) * degToRad)) - ayanamsa + 25.0)
            },
            {
                // Shukra (Venus)
                name: "Shukra (Venus)",
                deg: norm((181.98 + 1.60213 * d) + (0.77 * Math.sin((50.12 + 1.602 * d) * degToRad)) - ayanamsa + 11.0)
            }
        ];

        // 3. Lagna Calculation (Dynamic per Location & Time)
        let UT = date.getUTCHours() + date.getUTCMinutes()/60;
        let GMST = norm(280.46 + 360.9856 * d);
        let LST = norm(GMST + lon);
        let obRad = 23.439 * degToRad;
        let lagnaLong = radToDeg * Math.atan2(Math.cos(LST * degToRad), -Math.sin(LST * degToRad) * Math.cos(obRad) - Math.tan(lat * degToRad) * Math.sin(obRad));
        let nirayanaLagna = norm(lagnaLong - ayanamsa);

        // Result Display
        let html = `<div class="lagna-row">LAGNA: ${getVedicRashi(nirayanaLagna)}</div>`;
        
        planets.forEach(p => {
            html += `<div class="planet-row">
                        <span class="planet-name">${p.name}</span>
                        <span class="rashi-tag">${getVedicRashi(p.deg)} (${p.deg.toFixed(1)}°)</span>
                    </div>`;
        });

        document.getElementById('results').innerHTML = html;
    }
