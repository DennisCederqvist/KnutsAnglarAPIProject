import { getWeatherByCity } from './weatherByCity.js';
import { weatherCode } from './weatherCode.js';
import { saveData, showData } from './saveLocal.js';

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const result = document.getElementById("weatherResult");

async function showWeather(){
    const city = cityInput.value.trim().toLowerCase();
    const data = await getWeatherByCity(city);
      if (!data) {
        let err = document.getElementById("weatherError");
      if (!err) {
        err = document.createElement("p");
        err.id = "weatherError";
        err.className = "error";
        // result.prepend(err);
    }
    err.textContent = "⚠️ Staden finns inte i systemet.";
    err.style.color = "red";
    err.hidden = false;
    result.prepend(err);
    result.classList.remove("hidden");
    cityInput.value = "";

    setTimeout(() => {
      err.hidden = true;
    }, 3000);

    return;
  }

  const desc = weatherCode(data.weathercode);

  const existingCard = result.querySelector(`[data-city="${data.name}"]`);
    if (existingCard) {
      existingCard.remove();
    }

const card = document.createElement("div");
card.classList.add("weathercard");
card.setAttribute("data-city", data.name);

// Skapar stängknapp
const closeBtn = document.createElement("button");
closeBtn.classList.add("close-btn");
closeBtn.setAttribute("title", `Stäng kortet för ${data.name}`);
closeBtn.setAttribute("aria-label", `Stäng kortet för ${data.name}`);
closeBtn.innerHTML = `<span aria-hidden="true">✖</span>`;

// Skapar själva väderregionen
const region = document.createElement("div");
region.classList.add("weather");
region.setAttribute("role", "region");
region.setAttribute("tabindex", "0");
region.setAttribute("aria-labelledby", `title-${data.name}`);
region.setAttribute("aria-describedby", `desc-${data.name}`);

region.innerHTML = `
  <h2 id="title-${data.name}" aria-hidden="true">${data.name}</h2>
  <p aria-hidden="true">🌡️ ${data.temperature}°C</p>
  <p aria-hidden="true">${data.description}</p>
  <p aria-hidden="true">💨 ${data.windspeed} m/s</p>
  <span id="desc-${data.name}" class="sr-only">
    ${data.temperature} grader, ${data.description}, ${data.windspeed} meter per sekund vind.
  </span>
`;

// Bygger ihop kortet
card.appendChild(region);
card.appendChild(closeBtn);
result.prepend(card);

// Knapp
closeBtn.addEventListener("click", () => {
  card.style.opacity = "0";
  setTimeout(() => card.remove(), 300);
});

result.classList.remove("hidden");
cityInput.value = "";
saveData();
}

searchBtn.addEventListener("click", showWeather);

cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        showWeather();
    }
});

async function updateWeatherCards() {
  const cards = document.querySelectorAll(".weathercard");

  for (const card of cards) {
    const city = card.getAttribute("data-city");
    const data = await getWeatherByCity(city);
    if (!data) continue;

    card.querySelector("p:nth-of-type(1)").textContent = `🌡️ ${data.temperature}°C`;
    card.querySelector("p:nth-of-type(2)").textContent = `${desc}`;
    card.querySelector("p:nth-of-type(3)").textContent = `💨 ${data.windspeed} m/s`;
    card.querySelector("small").textContent = `Uppdaterad: ${new Date(data.time).toLocaleTimeString("sv-SE")}`;
  }
}


//visar sparad data från lokal när sidan laddas
window.addEventListener("DOMContentLoaded", showData);
// Uppdateras var 5:e minut
setInterval(updateWeatherCards, 300000);

