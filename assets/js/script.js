// script.js

function switchLanguage() {
    // Language toggle logic
    AppConfig.currentLanguage = (AppConfig.currentLanguage === 'en') ? 'hi' : 'en';
    
    // Update all elements with data attributes
    document.querySelectorAll('[data-en]').forEach(el => {
        el.innerText = el.getAttribute(`data-${AppConfig.currentLanguage}`);
    });

    // Update Button Text
    const btn = document.getElementById('toggleLang');
    btn.innerText = AppConfig.currentLanguage === 'en' ? 'Switch to Hindi' : 'English में बदलें';
    
    // Yahan hum data reload function bhi call karenge jo bilingual data layega
    loadDataForDate(currentSelectedDate); 
}

// Initial Load
window.onload = () => {
    console.log("Panchang Loaded with Config:", AppConfig.dataFiles.events);
    // Yahan Header/Footer inject karne ka logic jo home page se copy hoga
};
