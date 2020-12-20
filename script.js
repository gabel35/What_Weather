function clear(){
    $("#resultDiv").empty();
}


$("#magnifying-glass").on("click", function(event) {
    event.preventDefault();
    clear();
    
    var APIKey = "9b97bdc0a57667e94c3b8958a0c57307";
    var cityName = $("#city-name").val().trim();
    var queryWeatherNow = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + APIKey;

    $.ajax({
      url: queryWeatherNow,
      method: "GET"
    })
    .then(function(response) {
        console.log(queryWeatherNow);
        console.log(response);
        //name of city and date//
        var curDiv = $("#resultDiv");
        var cityName = response.name;
        var dateNow = new Date(response.dt *1000);
        dateNow = dateNow.toLocaleString();
        console.log(cityName);
        var resultCity = $("<h1>").text(cityName + " (" + dateNow + ")");
        curDiv.append(resultCity);
        //current temperature//
        var tempNow = response.main.temp;
        console.log(tempNow);
        var resultTempNow = $("<p>").text("Temperature: " + tempNow + "°F");
        curDiv.append(resultTempNow);
        //current humidity//
        var humNow = response.main.humidity;
        console.log(humNow);
        var resultHumNow = $("<p>").text("Humidity: " + humNow + "%");
        curDiv.append(resultHumNow);
        //current wind speed//
        var windNow = response.wind.speed;
        console.log(windNow);
        var resultWindNow = $("<p>").text("Wind Speed: " + windNow + " MPH");
        curDiv.append(resultWindNow);
        //current UV index//
        var latItDude = response.coord.lat;
        var lonGitDude = response.coord.lon;
        var queryUVI = "http://api.openweathermap.org/data/2.5/uvi?lat="+ latItDude + "&lon=" + lonGitDude + "&appid=" + APIKey;
        $.ajax({
            url: queryUVI,
            method: "GET"
        })
        .then(function(response) {
            var uviNow = response.value;
            console.log(uviNow);
            var resultUVINow = $("<p>").text("UV Index: " + uviNow);
            curDiv.append(resultUVINow);
        })
    })

    var queryForecast = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&cnt=5&appid=" + APIKey;

    $.ajax({
        url: queryForecast,
        method: "GET"
      })
      .then(function(response) {
          console.log(queryForecast);
          console.log(response);
      })
});

// have search button call forth the information for the city typed//
// display current day information on the main div//
//display the next 5 days in their repective card//
// have the city typed save to the log and appear as a new button //
// have the button with the city name call the weather stats for that city and display in in the main section//