export function weatherCode(weatherDescription) {
    let description;
    let background;

    if (weatherDescription === 0) {
        description = "☀️ Klar himmel"; 
        background = "./imgs/sun.jpg";
    } else if (weatherDescription >= 1 && weatherDescription <= 3) {
        description = "☁️ Molnig"; 
        background = "./imgs/cloud.jpg";
    } else if (weatherDescription === 45 || weatherDescription === 48) {
        description = "🌫️ Dimma"; 
        background = "./imgs/fog.jpg";
    } else if (weatherDescription === 51 || weatherDescription === 53 || weatherDescription === 55) {
        description = "🌧️ Duggregn"; 
        background = "./imgs/rain.jpg";
    } else if (weatherDescription === 61 || weatherDescription === 63 ||weatherDescription === 65) {
        description = "🌧️ Regn"; 
        background = "./imgs/rain.jpg";
    } else if (weatherDescription === 71 || weatherDescription === 73 || weatherDescription === 75) {
        description = "🌨️ Snö"; 
        background = "./imgs/snow.jpg";
    } else if (weatherDescription === 95 || weatherDescription === 96 || weatherDescription === 99) {
        description = "🌩️ Blixt och dunder";
        background = "./imgs/thunder.jpg";
    } else {
        return null;
    }

    return {description, background};

}