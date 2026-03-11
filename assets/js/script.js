/* 🔱 MAHADEV ASTROLOGER MA - Main Script (script.js) 🔱 */

// 1. Dynamic Form Logic: फॉर्म के हिस्से दिखाने और छुपाने का काम
function applyFormLogic() {
    const serviceSelect = document.getElementById('service-select');
    if (!serviceSelect) return; // अगर पन्ने पर फॉर्म नहीं है, तो कुछ न करें

    const service = serviceSelect.value;
    
    const sectionSingle = document.getElementById('section-single');
    const sectionMatching = document.getElementById('section-matching');
    const palmInstruction = document.getElementById('palm-instruction');
    const timePlaceGroup = document.getElementById('time-place-group'); 

    // सबसे पहले सब कुछ छुपा दें (Reset State)
    if(sectionSingle) sectionSingle.style.display = 'none';
    if(sectionMatching) sectionMatching.style.display = 'none';
    if(palmInstruction) palmInstruction.style.display = 'none';
    if(timePlaceGroup) timePlaceGroup.style.display = 'grid'; // डिफ़ॉल्ट रूप से टाइम/प्लेस दिखाएं

    // चुनी गई सर्विस के अनुसार फॉर्म सेट करें
    if (service === 'kundli_making' || service === 'numerology') {
        if(sectionSingle) sectionSingle.style.display = 'block';
    } 
    else if (service === 'kundli_matching') {
        if(sectionMatching) sectionMatching.style.display = 'block';
    } 
    else if (service === 'palmistry') {
        if(sectionSingle) sectionSingle.style.display = 'block';
        if(timePlaceGroup) timePlaceGroup.style.display = 'none'; // पामिस्ट्री में टाइम और प्लेस की आवश्यकता नहीं
        if(palmInstruction) palmInstruction.style.display = 'block';
    } 
    else if (service === 'combo_analysis') {
        if(sectionSingle) sectionSingle.style.display = 'block';
        if(palmInstruction) palmInstruction.style.display = 'block';
    }
}

// 2. Contact Method Sync: WhatsApp, Telegram या Email चुनने पर काम करेगा
function syncContactMethod(method) {
    const contactInput = document.getElementById('contact-detail');
    const emailWarning = document.getElementById('email-warning');
    
    if (!contactInput) return;

    if (method === 'WA') {
        contactInput.setAttribute('placeholder', 'अपना WhatsApp नंबर लिखें');
        if(emailWarning) emailWarning.style.display = 'none';
    } else if (method === 'TG') {
        contactInput.setAttribute('placeholder', 'अपना Telegram Username या नंबर लिखें');
        if(emailWarning) emailWarning.style.display = 'none';
    } else if (method === 'EM') {
        contactInput.setAttribute('placeholder', 'अपनी Email ID लिखें');
        if(emailWarning) emailWarning.style.display = 'block'; // ईमेल की चेतावनी दिखाएं
    }
}

// 3. Form Submit & Initialize Logic
document.addEventListener('DOMContentLoaded', () => {
    // पेज लोड होते ही फॉर्म का डिफ़ॉल्ट लुक सेट करें
    applyFormLogic();

    const form = document.getElementById('consultation-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // पेज को तुरंत रिफ्रेश होने से रोकें
            
            const btn = document.getElementById('submit-btn');
            const originalText = btn.innerHTML; // असली टेक्स्ट सेव कर लें
            
            // बटन को डिसेबल करें ताकि यूजर बार-बार क्लिक न करे
            btn.disabled = true;
            btn.innerHTML = "⏳ Processing...";
            btn.style.opacity = "0.7";

            // 🔱 यहाँ आपका Firebase (firebase-handler.js) का डेटा सेव करने वाला काम आएगा 🔱
            
            // अभी टेस्टिंग के लिए 2 सेकंड का डेमो लगाया है:
            setTimeout(() => {
                alert("🔱 महादेव की कृपा से आपका फॉर्म सबमिट हो गया है! (Trial Success)");
                
                // फॉर्म को वापस नार्मल करें
                btn.disabled = false;
                btn.innerHTML = originalText;
                btn.style.opacity = "1";
                form.reset();
                applyFormLogic(); // फॉर्म रिसेट होने के बाद वापस डिफ़ॉल्ट लेआउट लाएं
            }, 2000);
        });
    }
});