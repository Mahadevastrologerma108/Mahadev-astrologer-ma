/**
 * MAHADEV ASTROLOGER MA - Final Sound Module Logic
 * Secure data handling for 9 Planets and Tridosha Warning.
 */

const soundDatabase = {
    planets: [
        { name: "Sun (Surya)", raag: "Bilawal", time: "Sunrise", status: "🔐 Locked", effect: "Soul Power" },
        { name: "Moon (Chandra)", raag: "Bhairavi", time: "Anytime", status: "🔐 Locked", effect: "Mental Peace" },
        { name: "Mars (Mangal)", raag: "Bhairav", time: "Dawn", status: "🔐 Locked", effect: "Willpower" },
        { name: "Mercury (Budh)", raag: "Kafi", time: "Daytime", status: "🔐 Locked", effect: "Intellect" },
        { name: "Jupiter (Guru)", raag: "Yaman", time: "Evening", status: "🔐 Locked", effect: "Luck & Growth" },
        { name: "Venus (Shukra)", raag: "Khamaj", time: "Night", status: "🔐 Locked", effect: "Prosperity" },
        { name: "Saturn (Shani)", raag: "Todi", time: "Morning", status: "🔐 Locked", effect: "Discipline" },
        { name: "Rahu (North Node)", raag: "Asavari", time: "Twilight", status: "🔐 Locked", effect: "Shadow Clearing" },
        { name: "Ketu (South Node)", raag: "Shree", time: "Midnight", status: "🔐 Locked", effect: "Intuition" }
    ]
};

function loadFinalTable() {
    const tableBody = document.getElementById('resonance-data-body');
    if(tableBody) {
        let rows = "";
        soundDatabase.planets.forEach(p => {
            rows += `<tr>
                <td><b>${p.name}</b><br><small style="color:#666; font-size:0.75rem;">${p.effect}</small></td>
                <td>${p.raag}</td>
                <td>${p.time}</td>
                <td class="gold-text" style="font-weight:bold; letter-spacing:1px;">${p.status}</td>
            </tr>`;
        });
        tableBody.innerHTML = rows;
    }
}

function checkDosha() {
    // Lead generation trigger
    alert("Vedic calculations in progress... Please scroll down to read the Mandatory Safety Note.");
    const warning = document.getElementById('dosha-warning');
    if(warning) {
        warning.style.display = 'block';
        warning.scrollIntoView({ behavior: 'smooth' });
    }
}

document.addEventListener('DOMContentLoaded', loadFinalTable);