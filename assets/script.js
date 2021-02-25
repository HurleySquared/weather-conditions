var appKey = '89104d923bea4d5ae43cfd42a60778d4';
var city = $("#search");
// var unit = 'imperial';
// var openWeather = 'https://api.openweathermap.org/data/2.5/weather?q=' + city.val() + '&appid=' + appKey + '&units=' + unit;
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

        var recentCity = [];
        recentCity = JSON.parse(localStorage.getItem("city"));
        if(recentCity !== null) {
            recentCity = [];
            recentCity.push(city.val());
            localStorage.setItem("city", JSON.stringify(recentCity))
        }
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
        if (data.value < 3) {
            $(".violet").addClass("low")
        }   else if (data.value === 4) {
            $(".violet").addClass("medium")
        }   else {
            $(".violet").addClass("high")
        }
    });
};

function getFuture() {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city.val() + '&appid=' + appKey + '&units=imperial')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        var dateOne = $("#date1");
        var tempOne = $("#temp1");
        var humidityOne = $("#humidity1");
        dateOne.text(moment().add(1, "d").format("M/D/YYYY"));
        tempOne.text("Temp: " + data.list[3].main.temp);
        humidityOne.text("Humidity (%): " + data.list[3].main.humidity);
        var dateTwo = $("#date2");
        var tempTwo = $("#temp2");
        var humidityTwo = $("#humidity2");
        dateTwo.text(moment().add(2, "d").format("M/D/YYYY"));
        tempTwo.text("Temp: " + data.list[11].main.temp);
        humidityTwo.text("Humidity (%): " + data.list[11].main.humidity);
        var dateThree = $("#date3");
        var tempThree = $("#temp3");
        var humidityThree = $("#humidity3");
        dateThree.text(moment().add(3, "d").format("M/D/YYYY"));
        tempThree.text("Temp: " + data.list[19].main.temp);
        humidityThree.text("Humidity (%): " + data.list[19].main.humidity);
        var dateFour = $("#date4");
        var tempFour = $("#temp4");
        var humidityFour = $("#humidity4");
        dateFour.text(moment().add(4, "d").format("M/D/YYYY"));
        tempFour.text("Temp: " + data.list[27].main.temp);
        humidityFour.text("Humidity (%): " + data.list[27].main.humidity);
        var dateFive = $("#date5");
        var tempFive = $("#temp5");
        var humidityFive = $("#humidity5");
        dateFive.text(moment().add(5, "d").format("M/D/YYYY"));
        tempFive.text("Temp: " + data.list[35].main.temp);
        humidityFive.text("Humidity (%): " + data.list[35].main.humidity);
    })
};


$('#searchBtn').on("click", function(event) {
    event.preventDefault();
    getWeather();
    getFuture();
});
    