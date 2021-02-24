var appKey = '89104d923bea4d5ae43cfd42a60778d4';
var city = $("#search");
// var unit = 'imperial';
// var openWeather = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city.val() + '&appid=' + appKey + '&units=' + unit;
var currentHour = moment().hour()
var clock = moment();
$('#clock').text(clock.format("dddd, MMMM Do"))

function getWeather() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city.val() + '&appid=' + appKey + '&units=imperial')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            var cityName = $("#city-name");
            var temp = $("#temp");
            var humidity = $("#humidity");
            var windSpeed = $("#wind");
            var icon = $("#icon");
            cityName.text(data.name + clock.format(" M/D/YYYY"));
            icon.text(data.weather[0].icon);
            temp.text("Temperature: " + data.main.temp);
            humidity.text("Humidity (%): " + data.main.humidity);
            windSpeed.text("Wind Speed (mph): " + data.wind.speed);
            var lat = data.coord.lat;
            var lon = data.coord.lon;  
            getUltra(lat, lon);
        })
        
};

function getUltra(lat, lon) {
    fetch('https://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon + '&appid=' + appKey)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        var ultra = $("#ultra");
        ultra.text("UV index: " + data.value)
    });
};

function getFuture() {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city.val() + '&appid=' + appKey + '&units=imperial')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    })
};

$('#searchBtn').on("click", function(event) {
    event.preventDefault();
    getWeather();
    getFuture();
});
    