// Spara varje kort som object.
export function saveData() {
  const cards = document.querySelectorAll(".weathercard");
  const data = [];

  cards.forEach(card => {
    const city = card.getAttribute("data-city");
    const temp = card.querySelector("p:nth-of-type(1)").textContent.replace("🌡️ ", "").replace("°C", "");
    const desc = card.querySelector("p:nth-of-type(2)").textContent;
    const wind = card.querySelector("p:nth-of-type(3)").textContent.replace("💨 ", "").replace(" m/s", "");

    data.push({ city, temperature: temp, description: desc, windspeed: wind });
  });

  localStorage.setItem("weatherCards", JSON.stringify(data));
}


//läser in skapade kort igen
export function showData() {
  const saved = localStorage.getItem("weatherCards");
  if (!saved) return;

const cards = JSON.parse(saved);
cards.forEach(data => {
  const card = document.createElement("div");
  card.classList.add("weathercard");
  card.setAttribute("data-city", data.city);

  // --- Skapa stängknappen (utanför regionen) ---
  const closeBtn = document.createElement("button");
  closeBtn.classList.add("close-btn");
  closeBtn.setAttribute("title", `Stäng kortet för ${data.city}`);
  closeBtn.setAttribute("aria-label", `Stäng kortet för ${data.city}`);
  closeBtn.innerHTML = `<span aria-hidden="true">✖</span>`;

  // --- Skapa själva väderregionen ---
  const region = document.createElement("div");
  region.classList.add("weather");
  region.setAttribute("role", "region");
  region.setAttribute("tabindex", "0");
  region.setAttribute("aria-labelledby", `title-${data.city}`);
  region.setAttribute("aria-describedby", `desc-${data.city}`);

  region.innerHTML = `
    <h2 id="title-${data.city}" aria-hidden="true">${data.city}</h2>
    <p aria-hidden="true">🌡️ ${data.temperature}°C</p>
    <p aria-hidden="true">${data.description}</p>
    <p aria-hidden="true">💨 ${data.windspeed} m/s</p>
    <span id="desc-${data.city}" class="sr-only">
      ${data.temperature} grader, ${data.description}, ${data.windspeed} meter per sekund vind.
    </span>
  `;

  // --- Bygg ihop kortet ---
card.appendChild(region);
card.appendChild(closeBtn);

  weatherResult.prepend(card);

  // --- Knappfunktion ---
  closeBtn.addEventListener("click", () => {
    card.remove();
    saveData(); // spara ändringen
  });
});
}

//visar sparad data från lokal när sidan laddas
window.addEventListener("DOMContentLoaded", showData);