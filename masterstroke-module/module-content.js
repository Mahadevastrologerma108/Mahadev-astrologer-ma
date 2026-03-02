/**
 * MAHADEV ASTROLOGER MA - Final Sound Module Logic
 * Includes: Navgrah Table & Interactive Dosha Quiz (Option B)
 */

let currentStep = 1;
let scores = [];

// 1. Navgrah Database (The Matrix)
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

// 2. Load Table on Page Load
function loadTable() {
    const tableBody = document.getElementById('resonance-data-body');
    if(tableBody) {
        let rows = "";
        soundDatabase.planets.forEach(p => {
            rows += `<tr>
                <td><b>${p.name}</b><br><small style="color:#666; font-size:0.75rem;">${p.effect}</small></td>
                <td>${p.raag}</td>
                <td>${p.time}</td>
                <td class="gold-text" style="font-weight:bold;">${p.status}</td>
            </tr>`;
        });
        tableBody.innerHTML = rows;
    }
}

// 3. Quiz Trigger (Option B)
function checkDoshaOptionB() {
    const startBtn = document.getElementById('start-quiz-btn');
    const quizContainer = document.getElementById('dosha-quiz-container');
    
    if(startBtn) startBtn.style.display = 'none';
    if(quizContainer) {
        quizContainer.style.display = 'block';
        quizContainer.scrollIntoView({ behavior: 'smooth' });
    }
}

// 4. Quiz Navigation Logic
function nextStep(val) {
    scores.push(val);
    const questionPara = document.getElementById('quiz-question');
    const optionsDiv = document.getElementById('quiz-options');

    if(currentStep === 1) {
        questionPara.innerText = "2. Aapka swabhava (nature) kaisa hai?";
        optionsDiv.innerHTML = `
            <button class="quiz-opt" onclick="nextStep('A')">Chanchal (Restless)</button>
            <button class="quiz-opt" onclick="nextStep('B')">Tez/Gusse wala (Fiery)</button>
            <button class="quiz-opt" onclick="nextStep('C')">Shant (Calm/Stable)</button>
        `;
        currentStep++;
    } else if(currentStep === 2) {
        questionPara.innerText = "3. Mausam ka asar aap par kaisa hota hai?";
        optionsDiv.innerHTML = `
            <button class="quiz-opt" onclick="nextStep('A')">Thand zyada lagti hai</button>
            <button class="quiz-opt" onclick="nextStep('B')">Garmi bardasht nahi hoti</button>
            <button class="quiz-opt" onclick="nextStep('C')">Hawa/Moisture se pareshani</button>
        `;
        currentStep++;
    } else {
        showFinalResult();
    }
}

// 5. Final Result & Warning Display
function showFinalResult() {
    let finalDosha = (scores[0] === 'A') ? "VATA" : (scores[0] === 'B' ? "PITTA" : "KAPHA");
    const container = document.getElementById('dosha-quiz-container');
    const warningNote = document.getElementById('dosha-warning');
    
    container.innerHTML = `
        <div style="padding: 10px; animation: fadeIn 1s ease-in;">
            <h2 class="gold-text" style="font-size: 1.8rem; margin-bottom:10px;">Result: ${finalDosha} Dominant</h2>
            <p style="color:#fff;">Mahadev ki kripa se aapka prathmik vishleshan (Initial Analysis) ho gaya hai.</p>
            <p style="font-size: 0.85rem; color: #aaa; margin-top:10px;">Ab niche di gayi 'Param-Aavashyak' savdhani ko dhyan se padhein.</p>
        </div>
    `;
    
    if(warningNote) {
        warningNote.style.display = 'block';
        warningNote.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', loadTable);
