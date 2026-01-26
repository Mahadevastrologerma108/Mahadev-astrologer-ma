document.addEventListener("DOMContentLoaded", () => {
    equalizeCalendarBlocks();
});

/**
 * Sab calendar day blocks ko equal height deta hai
 * taaki chhote-bade blocks ka problem khatam ho
 */
function equalizeCalendarBlocks() {
    const days = document.querySelectorAll(".calendar-grid .day");

    if (!days.length) return;

    let maxHeight = 0;

    // pehle reset
    days.forEach(day => {
        day.style.minHeight = "auto";
    });

    // max height find karo
    days.forEach(day => {
        const height = day.offsetHeight;
        if (height > maxHeight) {
            maxHeight = height;
        }
    });

    // sabko same height do
    days.forEach(day => {
        day.style.minHeight = maxHeight + "px";
        day.style.display = "flex";
        day.style.flexDirection = "column";
        day.style.justifyContent = "center";
    });
}

/**
 * FUTURE READY SECTION
 * Jab JSON / API se festival load karoge
 * bas is function me data feed karna
 */
function applyFestivalEvents(eventData = []) {
    /*
      eventData format (future):
      [
        { date: "2026-01-15", name: "Makar Sankranti", type: "festival" },
        { date: "2026-01-26", name: "Amavasya", type: "vrat" }
      ]
    */

    const days = document.querySelectorAll(".calendar-grid .day");

    days.forEach(day => {
        const dayNumber = day.dataset.day;
        if (!dayNumber) return;

        eventData.forEach(event => {
            const eventDay = new Date(event.date).getDate();
            if (parseInt(dayNumber) === eventDay) {
                day.classList.add("event");

                const dot = document.createElement("div");
                dot.className = "event-dot";

                const label = document.createElement("small");
                label.innerText = event.name;

                day.appendChild(dot);
                day.appendChild(label);
            }
        });
    });

    // events add hone ke baad fir se equal height
    equalizeCalendarBlocks();
}

console.log("🕉️ Panchang JS loaded successfully – Mahadev Astrologer MA");