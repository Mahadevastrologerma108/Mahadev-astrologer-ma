// Firebase se data fetch karne ka logic
async function getPanchangFromFirebase(year) {
    console.log(`[Firebase] Fetching data for year: ${year}...`);
    try {
        // 'panchang/2026' path se data uthana
        const snapshot = await db.ref('panchang/' + year).once('value');
        if (snapshot.exists()) {
            console.log(`[Firebase] Data found for ${year}`);
            return snapshot.val();
        } else {
            console.warn(`[Firebase] No data for ${year}`);
            return {};
        }
    } catch (error) {
        console.error("[Firebase] Error fetching data:", error);
        return {};
    }
}

// Master Function jo script.js call karega
async function loadYearlyData(year) {
    // Pehle check karo ki kya memory mein pehle se hai? (Fast Loading)
    if (window["Data" + year] && Object.keys(window["Data" + year]).length > 0) {
        return window["Data" + year];
    }
    
    // Agar nahi hai, toh Firebase se mangao
    const data = await getPanchangFromFirebase(year);
    window["Data" + year] = data; // Global memory mein save karo
    return data;
}
