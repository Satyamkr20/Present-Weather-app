let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconfile;
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value = '';
});

const getWeather = async (city) => {
    try {
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const response = await fetch(`${proxy}https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=873d7daffc5781275dc21914b413739d`, {
            mode: 'cors'
        });

        const weatherData = await response.json();
        console.log(weatherData);
        const {
            name
        } = weatherData;
        const {
            feels_like
        } = weatherData.main;
        const {
            id,
            main
        } = weatherData.weather[0];
        loc.textContent = name;
        climate.textContent = main;
        tempvalue.textContent = Math.round(feels_like - 273);
        if (id > 199 && id < 233) {
            tempicon.src = "./aicons/thunder.svg"
        } else if (id > 299 && id < 322) {
            tempicon.src = "./aicons/rainy-2.svg"
        } else if (id > 499 && id < 532) {
            tempicon.src = "./aicons/rainy-6.svg"
        } else if (id > 599 && id < 623) {
            tempicon.src = "./aicons/snowy-6.svg"
        } else if (id > 299 && id < 322) {
            tempicon.src = "./aicons/rainy-2.svg"
        } else if (id > 799 && id < 801) {
            tempicon.src = "./aicons/day.svg"
        } else if (id > 800 && id < 805) {
            tempicon.src = "./aicons/cloudy.svg"
        } else {
            tempicon.src = "./aicons/weather.svg"
        }
    } catch (error) {
        alert('city not found');
    }
};

window.addEventListener("load", () => {
    let long;
    let lat;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=873d7daffc5781275dc21914b413739d`

            fetch(api).then((response) => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {
                        name
                    } = data;
                    const {
                        temp
                    } = data.main;
                    const {
                        id,
                        main
                    } = data.weather[0];

                    loc.textContent = name;
                    climate.textContent = main;
                    tempvalue.textContent = Math.round(temp - 273.15);
                    if (id > 199 && id < 233) {
                        tempicon.src = "./aicons/thunder.svg"
                    } else if (id > 299 && id < 322) {
                        tempicon.src = "./aicons/rainy-2.svg"
                    } else if (id > 499 && id < 532) {
                        tempicon.src = "./aicons/rainy-6.svg"
                    } else if (id > 599 && id < 623) {
                        tempicon.src = "./aicons/snowy-6.svg"
                    } else if (id > 299 && id < 322) {
                        tempicon.src = "./aicons/rainy-2.svg"
                    } else if (id > 799 && id < 801) {
                        tempicon.src = "./aicons/day.svg"
                    } else if (id > 800 && id < 805) {
                        tempicon.src = "./aicons/cloudy.svg"
                    } else {
                        tempicon.src = "./aicons/weather.svg"
                    }

                })
        })
    }
})
