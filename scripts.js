MOCK_WEATHER = {
"Stockholm": { tempC: 7, description: "Mulet", icon: "☁️ ", updated: "09:00" },
"Göteborg": { tempC: 8, description: "Lätt regn", icon: "🌧️", updated: "09:00" },
"Malmö": { tempC: 10, description: "Klart", icon: "☀️", updated: "09:00" },
"Uppsala": { tempC: 6, description: "Disigt", icon: "🌫️", updated: "09:00" },
"Lund": { tempC: 9, description: "Halvklart", icon: "⛅", updated: "09:00" }
};

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const result = document.getElementById("weatherResult");

function showWeather(){
    const city = cityInput.value.trim().toLowerCase();
    const foundKey = Object.keys(MOCK_WEATHER).find((key) => key.toLowerCase() === city 
);

if (!foundKey) {
    let err = document.getElementById("weatherError");
    if (!err) {
      err = document.createElement("p");
      err.id = "weatherError";
      err.className = "error";
      result.prepend(err);
    }
    err.textContent = "⚠️ Staden finns inte i systemet.";
    err.style.color ="red";
    err.hidden = false;
    result.classList.remove("hidden");
    cityInput.value = "";
    return;
  }

const existingErr = document.getElementById("weatherError");
    if (existingErr) existingErr.hidden = true;

const existingCard = result.querySelector(`[data-city="${foundKey}"]`);
  if (existingCard) {
    existingCard.remove();
  }

const data = MOCK_WEATHER [foundKey];
const card = document.createElement("div");
card.classList.add("weathercard");
card.setAttribute("data-city", foundKey);
card.innerHTML = `
    <div class="weather">
    <button class="close-btn" title="Stäng">✖</button>
        <h2>${foundKey}</h2>
        <p>${data.icon} ${data.description}</p>
        <p>${data.tempC}°C</p>
        <small>Uppdaterad: ${data.updated}</small> 
    </div>
  `;
result.prepend(card);

const closeBtn = card.querySelector(".close-btn");

closeBtn.addEventListener("click", () => {
  card.style.opacity = "0";
  setTimeout(() => card.remove(), 300);
});


  result.classList.remove("hidden");
  cityInput.value = "";
}

searchBtn.addEventListener("click", showWeather);

cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        showWeather();
    }
});

