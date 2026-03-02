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

// 5. Final Result (Updated for Conversion)
function showFinalResult() {
    let finalDosha = (scores[0] === 'A') ? "VATA" : (scores[0] === 'B' ? "PITTA" : "KAPHA");
    const container = document.getElementById('dosha-quiz-container');
    const warningNote = document.getElementById('dosha-warning');
    
    container.innerHTML = `
        <div class="result-box" style="padding: 20px; animation: fadeIn 1s;">
            <h2 class="gold-text" style="font-size: 1.8rem;">Result: ${finalDosha} Dominant</h2>
            <p>Aapki energy profile Mahadev ki kripa se mil gayi hai.</p>
            
            <div class="booking-zone" style="margin-top:25px; border-top: 1px solid rgba(245,197,66,0.2); padding-top:20px;">
                <p style="color:var(--gold); font-weight:bold;">Ab apni exact 'Healing Frequency' unlock karein:</p>
                <p style="font-size:0.85rem; margin-bottom:15px; color:#ccc;">Kaunsa rasta aapke liye sahi hai?</p>
                
                <div class="method-buttons" style="display: flex; flex-direction: column; gap: 10px;">
                    <button class="quiz-opt" style="width:100%; margin:5px 0;" onclick="loadDivineForm('Kundali', '${finalDosha}')">🔱 Via Astrological Chart (Kundali)</button>
                    <button class="quiz-opt" style="width:100%; margin:5px 0;" onclick="loadDivineForm('Palmistry', '${finalDosha}')">✋ Via Palmistry Analysis</button>
                    <button class="quiz-opt" style="width:100%; margin:5px 0;" onclick="loadDivineForm('Numerology', '${finalDosha}')">🔢 Via Numerology Vibration</button>
                </div>
            </div>
        </div>
    `;
    
    if(warningNote) {
        warningNote.style.display = 'block';
        warningNote.scrollIntoView({ behavior: 'smooth' });
    }
}

// 6. The Magical Form (New Lead System)
function loadDivineForm(method, dosha) {
    const container = document.getElementById('dosha-quiz-container');
    let formHTML = `
        <div class="magical-form-box" style="animation: fadeIn 0.8s; text-align:left; padding:10px;">
            <h3 class="gold-text" style="text-align:center;">🔱 ${method} Analysis</h3>
            <p style="font-size:0.8rem; margin-bottom:20px; text-align:center; color:#aaa;">Please provide details for <b>${dosha}</b> Frequency Mapping.</p>
            
            <form id="healing-contact-form" onsubmit="window.handleSoundHealingSubmit(event, '${method}', '${dosha}')">
                <input type="text" placeholder="Full Name" required class="form-input" style="width:100%; padding:12px; margin-bottom:15px; background:rgba(0,0,0,0.5); border:1px solid rgba(245,197,66,0.3); color:#fff; border-radius:8px;">
    `;

    if (method === 'Kundali') {
        formHTML += `
            <input type="date" title="Birth Date" required class="form-input" style="width:100%; padding:12px; margin-bottom:15px; background:rgba(0,0,0,0.5); border:1px solid rgba(245,197,66,0.3); color:#fff; border-radius:8px;">
            <input type="time" title="Birth Time" required class="form-input" style="width:100%; padding:12px; margin-bottom:15px; background:rgba(0,0,0,0.5); border:1px solid rgba(245,197,66,0.3); color:#fff; border-radius:8px;">
            <input type="text" placeholder="Birth Place (City, Country)" required class="form-input" style="width:100%; padding:12px; margin-bottom:15px; background:rgba(0,0,0,0.5); border:1px solid rgba(245,197,66,0.3); color:#fff; border-radius:8px;">
        `;
    } else if (method === 'Palmistry') {
        formHTML += `
            <input type="text" placeholder="Current Location" required class="form-input" style="width:100%; padding:12px; margin-bottom:15px; background:rgba(0,0,0,0.5); border:1px solid rgba(245,197,66,0.3); color:#fff; border-radius:8px;">
            <div style="background: rgba(245,197,66,0.1); padding: 15px; border-radius: 8px; margin-bottom: 15px; font-size: 0.8rem; color: #eee; border: 1px dashed var(--gold);">
                📸 <b>Note:</b> Keep clear photos of both hands (Front & Back) ready. Our team will ask for them on WhatsApp.
            </div>
        `;
    } else if (method === 'Numerology') {
        formHTML += `
            <input type="date" title="Birth Date" required class="form-input" style="width:100%; padding:12px; margin-bottom:15px; background:rgba(0,0,0,0.5); border:1px solid rgba(245,197,66,0.3); color:#fff; border-radius:8px;">
            <input type="text" placeholder="Current Full Name (Spelling)" required class="form-input" style="width:100%; padding:12px; margin-bottom:15px; background:rgba(0,0,0,0.5); border:1px solid rgba(245,197,66,0.3); color:#fff; border-radius:8px;">
        `;
    }

    formHTML += `
                <input type="tel" placeholder="WhatsApp Number" required class="form-input" style="width:100%; padding:12px; margin-bottom:15px; background:rgba(0,0,0,0.5); border:1px solid rgba(245,197,66,0.3); color:#fff; border-radius:8px;">
                <textarea placeholder="Any specific mental or physical issue?" class="form-input" style="width:100%; padding:12px; margin-bottom:15px; background:rgba(0,0,0,0.5); border:1px solid rgba(245,197,66,0.3); color:#fff; border-radius:8px; height:80px;"></textarea>
                <button type="submit" class="module-btn" style="width:100%; border-radius:50px;">INVOKE FREQUENCY MAPPING ➔</button>
            </form>
        </div>
    `;

    container.innerHTML = formHTML;
    container.scrollIntoView({ behavior: 'smooth' });
}

// Initialization remains same
document.addEventListener('DOMContentLoaded', loadTable);
