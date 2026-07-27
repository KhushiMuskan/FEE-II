document.addEventListener("DOMContentLoaded", function () {

    // LIGHTBOX
    function openLightbox(src) {
        const img = document.getElementById('lightbox-img');
        const box = document.getElementById('lightbox');

        if (!img || !box) return;

        img.src = src;
        box.classList.add('active');
    }

    function closeLightbox() {
        const box = document.getElementById('lightbox');
        if (!box) return;
        box.classList.remove('active');
    }
    window.openLightbox = openLightbox;
    window.closeLightbox = closeLightbox;

    const lightbox = document.getElementById('lightbox');

    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === this) closeLightbox();
        });
    }

    // DARK MODE
    const themeBtn = document.getElementById("themeBtn");

    if (themeBtn) {
        themeBtn.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");

            themeBtn.innerHTML = document.body.classList.contains("dark-mode")
                ? "☀ Light Mode"
                : "🌙 Dark Mode";
        });
    }

    //  SEARCH BAR 
    const searchBar = document.getElementById("searchBar");

    if (searchBar) {
        searchBar.addEventListener("keyup", function () {

            let searchValue = searchBar.value.toLowerCase();

            // FIX: correct class (your HTML uses .card not .state-card)
            let states = document.querySelectorAll(".card");

            states.forEach(function (card) {
                let stateName = card.innerText.toLowerCase();

                card.style.display = stateName.includes(searchValue)
                    ? "flex"
                    : "none";
            });

        });
    }

    //HOTEL BOOKING 
    const bookBtn = document.getElementById("bookBtn");

    if (bookBtn) {
        bookBtn.addEventListener("click", function () {

            const name = document.getElementById("name")?.value;
            const hotelName = document.getElementById("hotelName")?.value;
            const checkin = document.getElementById("checkin")?.value;
            const checkout = document.getElementById("checkout")?.value;
            const room = document.getElementById("room")?.value;

            const bookingMessage = document.getElementById("bookingMessage");

            if (!bookingMessage) return;

            if (!name || !hotelName || !checkin || !checkout || !room) {
                bookingMessage.style.color = "red";
                bookingMessage.innerHTML = "Please fill all fields.";
            } else {
                bookingMessage.style.color = "green";
                bookingMessage.innerHTML =
                    `Booking Successful for ${name} at ${hotelName}!`;
            }

        });
    }

    // WEATHER API 
    const weatherBtn = document.getElementById("weatherBtn");

    if (weatherBtn) {

        weatherBtn.addEventListener("click", async function () {

            const city = document.getElementById("cityInput")?.value;
            const resultBox = document.getElementById("weatherResult");

            if (!resultBox) return;

            if (!city || !city.trim()) {
                resultBox.innerHTML = "Please enter a city";
                return;
            }

            try {

                const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;

                const geoResponse = await fetch(geoUrl);
                const geoData = await geoResponse.json();

                if (!geoData.results || geoData.results.length === 0) {
                    resultBox.innerHTML = "City not found";
                    return;
                }

                const { latitude, longitude, name } = geoData.results[0];

                const weatherUrl =
                    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

                const weatherResponse = await fetch(weatherUrl);
                const weatherData = await weatherResponse.json();

                const temp = weatherData.current_weather.temperature;
                const wind = weatherData.current_weather.windspeed;

                resultBox.innerHTML =
                    `🌍 ${name}<br>🌡 ${temp}°C<br>💨 ${wind} km/h`;

            }
            catch (error) {
                resultBox.innerHTML = "Error fetching weather data";
            }

        });

    }

    //  CURRENCY 
    const convertBtn = document.getElementById("convertBtn");

    if (convertBtn) {

        convertBtn.addEventListener("click", function () {

            const amount = document.getElementById("amount")?.value;
            const from = document.getElementById("fromCurrency")?.value;
            const to = document.getElementById("toCurrency")?.value;

            const resultBox = document.getElementById("currencyResult");

            if (!resultBox) return;

            if (!amount) {
                resultBox.innerHTML = "Enter amount";
                return;
            }

            fetch(`https://open.er-api.com/v6/latest/${from}`)
                .then(res => res.json())
                .then(data => {

                    const rate = data.rates[to];
                    const converted = (amount * rate).toFixed(2);

                    resultBox.innerHTML =
                        `💱 ${amount} ${from} = ${converted} ${to}`;

                })
                .catch(() => {
                    resultBox.innerHTML = "Error converting currency";
                });

        });

    }

    //  FAVORITES (FIXED)
    const hearts = document.querySelectorAll(".favorite");

    hearts.forEach(function (fav) {
        fav.addEventListener("click", function () {
            const heart = fav.querySelector(".heart");

            if (!heart) return;

            if (heart.textContent === "🤍") {
                heart.textContent = "❤️";
            } else {
                heart.textContent = "🤍";
            }
        });
    });

    //  STAR RATING (FIXED) 
    const ratings = document.querySelectorAll(".rating");

    ratings.forEach(function (rating) {

        const stars = rating.querySelectorAll(".star");

        stars.forEach(function (star, index) {

            star.addEventListener("click", function () {

                stars.forEach((s, i) => {
                    s.textContent = i <= index ? "★" : "☆";
                    s.style.color = i <= index ? "orange" : "gray";
                });

            });

        });

    });

});