/**
 * MAHADEV ASTROLOGER MA - Sound Science Module
 * Purpose: Secure Data Injection for Naad Healing Page
 * Note: Exact Hz values are reserved for professional charts to prevent misuse.
 */

const soundDatabase = {
    safetyWarning: "Vedic frequencies are powerful cosmic vibrations. Misalignment of these sounds without analyzing your 'Lagna' and 'Chakra' balance can lead to spiritual restlessness. Always consult a certified Vedic expert before beginning any Sound Therapy.",
    
    resonanceMatrix: [
        { planet: "Sun (Surya)", raag: "Bilawal", prahar: "Sunrise", hz: "Reserved 🔐", effect: "Soul Vitality" },
        { planet: "Moon (Chandra)", raag: "Bhairavi", prahar: "Anytime", hz: "Reserved 🔐", effect: "Emotional Balance" },
        { planet: "Mars (Mangal)", raag: "Bhairav", prahar: "Dawn", hz: "Reserved 🔐", effect: "Willpower & Energy" },
        { planet: "Mercury (Budh)", raag: "Kafi", prahar: "Anytime", hz: "Reserved 🔐", effect: "Intellect & Speech" },
        { planet: "Jupiter (Guru)", raag: "Yaman", prahar: "Late Evening", hz: "Reserved 🔐", effect: "Wisdom & Growth" },
        { planet: "Venus (Shukra)", raag: "Khamaj", prahar: "Night", hz: "Reserved 🔐", effect: "Prosperity & Love" },
        { planet: "Saturn (Shani)", raag: "Todi", prahar: "Morning", hz: "Reserved 🔐", effect: "Discipline & Karma" }
    ]
};

// Function to inject data safely
function loadVedicModule() {
    // 1. Inject Safety Warning
    const warningElement = document.getElementById('safety-note');
    if(warningElement) {
        warningElement.innerText = soundDatabase.safetyWarning;
    }

    // 2. Inject Resonance Matrix into Table
    const tableBody = document.getElementById('resonance-data-body');
    if(tableBody) {
        let tableHTML = "";
        soundDatabase.resonanceMatrix.forEach(item => {
            tableHTML += `
                <tr>
                    <td data-label="Planet"><b>${item.planet}</b><br><small style="color:#666">${item.effect}</small></td>
                    <td data-label="Raag">${item.raag}</td>
                    <td data-label="Prahar">${item.prahar}</td>
                    <td data-label="Frequency" class="gold-text" style="font-weight:bold;">${item.hz}</td>
                </tr>
            `;
        });
        tableBody.innerHTML = tableHTML;
    }
}

// Execute on load
document.addEventListener('DOMContentLoaded', loadVedicModule);