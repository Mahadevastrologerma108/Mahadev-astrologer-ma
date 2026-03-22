document.getElementById("kundaliForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  let dob = document.getElementById("dob").value;
  let time = document.getElementById("time").value;
  let place = document.getElementById("place").value;

  let coords = await getCoordinates(place);

  let result = calculateKundali(dob, time, coords.lat, coords.lon);

  document.getElementById("result").innerHTML = `
    Sun: ${result.sun} <br>
    Moon: ${result.moon} <br>
    Lagna: ${result.lagna}
  `;
});

async function getCoordinates(place) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${place}&format=json`
  );
  const data = await response.json();

  return {
    lat: data[0].lat,
    lon: data[0].lon
  };
}

// Dummy logic (replace later)
function calculateKundali(dob, time, lat, lon) {
  return {
    sun: "Aries",
    moon: "Libra",
    lagna: "Taurus"
  };
}