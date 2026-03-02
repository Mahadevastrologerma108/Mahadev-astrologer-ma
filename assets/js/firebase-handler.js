// ==========================================
// 5a. SOUND HEALING SPECIAL LOGIC
// ==========================================

window.handleSoundHealingSubmit = async function(event, method, dosha) {
    event.preventDefault();
    const form = event.target;
    const btn = form.querySelector('button');
    const originalBtnText = btn.innerText;

    btn.innerText = "🔱 MAPPING VIBRATIONS...";
    btn.disabled = true;

    try {
        // Form Data Capture
        const formData = new FormData(form);
        const name = form.querySelector('input[placeholder="Full Name"]').value;
        const contact = form.querySelector('input[type="tel"]').value;
        const extraInfo = form.querySelector('textarea')?.value || "None";
        
        // Dynamic Fields based on Method
        let specificDetails = {};
        if (method === 'Kundali' || method === 'Numerology') {
            specificDetails.dob = form.querySelector('input[type="date"]').value;
            if(method === 'Kundali') {
                specificDetails.birth_time = form.querySelector('input[type="time"]').value;
                specificDetails.birth_place = form.querySelector('input[placeholder*="Place"]').value;
            }
        } else if (method === 'Palmistry') {
            specificDetails.current_location = form.querySelector('input[placeholder*="Location"]').value;
        }

        const subData = {
            service: "Sound Healing",
            method: method,
            detected_dosha: dosha,
            name: name,
            contact_detail: contact,
            details: specificDetails,
            notes: extraInfo,
            timestamp: serverTimestamp()
        };

        // 1. Save to Firestore (Same Database, New Category)
        await addDoc(collection(db, "appointments"), subData);

        // 2. Send Telegram Notification (Premium Format)
        const tgMessage = `🔱 *New SOUND HEALING Request!*\n\n` +
                          `👤 *Name:* ${name}\n` +
                          `🌀 *Dosha:* ${dosha}\n` +
                          `🛠️ *Method:* ${method}\n` +
                          `📞 *Contact:* ${contact}\n` +
                          `📝 *Note:* ${extraInfo}`;

        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: CHAT_ID, text: tgMessage, parse_mode: 'Markdown' })
        });

        // 3. SPECIAL REACTION: UI Transformation
        const container = document.getElementById('dosha-quiz-container');
        container.innerHTML = `
            <div class="divine-success" style="padding: 40px; text-align: center; animation: fadeIn 1s;">
                <div class="divine-symbol" style="font-size: 4rem; margin-bottom:20px;">🕉️</div>
                <h2 class="gold-text">VIBRATIONAL DATA CAPTURED!</h2>
                <p style="color: #fff; margin-top: 15px;">Mahadev ki kripa se aapki <b>Frequency Mapping</b> shuru ho gayi hai.</p>
                <div style="background: rgba(245,197,66,0.1); padding: 20px; border-radius: 15px; margin: 25px 0; border: 1px dashed var(--gold);">
                    <p style="font-size: 0.95rem; line-height:1.6;">Hamare experts aapke <b>${dosha}</b> dosha aur planets ke hisaab se <b>Personalized Sound Frequency</b> calculate kar rahe hain.</p>
                </div>
                <p style="font-size: 0.8rem; color: #888;">Aapko WhatsApp par jald hi report aur 'Healing Key' mil jayegi.</p>
            </div>
        `;
        
        container.scrollIntoView({ behavior: 'smooth' });

    } catch (err) {
        console.error("🔱 Sound Form Error:", err);
        alert("Kshama karein, vibrations connect nahi ho payi. Dobara koshish karein.");
        btn.innerText = originalBtnText;
        btn.disabled = false;
    }
};
