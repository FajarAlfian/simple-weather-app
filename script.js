const apiKey = API_KEY; 
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");
const loadingText = document.getElementById("loadingText");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value;
    if (city === "") {
        alert("Masukkan nama kota!");
        return;
    }

   
    loadingText.style.display = "block";
    weatherInfo.innerHTML = ""; 
   
    setTimeout(async () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=id`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Kota tidak ditemukan");

            const data = await response.json();
            const { name, main, weather } = data;
            const temperature = main.temp;
            const description = weather[0].description;
            const icon = `https://openweathermap.org/img/wn/${weather[0].icon}.png`;

          
            weatherInfo.innerHTML = `
                <h2>${name}</h2>
                <img src="${icon}" alt="Weather Icon">
                <p>${temperature}°C</p>
                <p>${description}</p>
            `;
        } catch (error) {
            weatherInfo.innerHTML = `<p style="color: red;">${error.message}</p>`;
        } finally {
           
            loadingText.style.display = "none";
        }
    }, 2000); 
});
