/* =====================================
   Panchang JS
   Future Ready (API / JSON Upgrade Safe)
   ===================================== */

document.addEventListener("DOMContentLoaded", () => {
  const yearSelect = document.getElementById("yearSelect");
  const calendarGrid = document.getElementById("calendarGrid");

  // Default year
  const DEFAULT_YEAR = new Date().getFullYear();

  // Load on page load
  loadYear(DEFAULT_YEAR);

  // Change year event
  yearSelect.addEventListener("change", (e) => {
    loadYear(e.target.value);
  });

  /* ===========================
     Core Functions
     =========================== */

  function loadYear(year) {
    calendarGrid.innerHTML = "<p>Loading Panchang...</p>";

    fetch(`data/${year}.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Data not found");
        return res.json();
      })
      .then((data) => {
        renderCalendar(data);
      })
      .catch(() => {
        calendarGrid.innerHTML = `
          <p style="opacity:.7">
            Panchang data for <strong>${year}</strong> not available yet.
            <br>We will update it soon 🙏
          </p>
        `;
      });
  }

  function renderCalendar(data) {
    calendarGrid.innerHTML = "";

    data.months.forEach((month) => {
      const monthCard = document.createElement("div");
      monthCard.className = "month-card";

      monthCard.innerHTML = `
        <div class="month-title">${month.name}</div>
        ${month.days.map(renderDay).join("")}
      `;

      calendarGrid.appendChild(monthCard);
    });
  }

  function renderDay(day) {
    let tithiClass = "";

    if (day.type === "amavasya") tithiClass = "amavasya";
    if (day.type === "purnima") tithiClass = "purnima";
    if (day.type === "ekadashi") tithiClass = "ekadashi";

    return `
      <div class="date-row ${tithiClass}">
        <span>${day.date}</span>
        <span>${day.title}</span>
      </div>
    `;
  }
});