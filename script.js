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
        dateNow = dateNow.substr(0, 10)
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
            if (uviNow <=2){
                var resultUVINow = $("<p class='badge bg-success' id='uvIndex'>").text("UV Index: " + uviNow);
                curDiv.append(resultUVINow);
            } else if (uviNow <=5){
                var resultUVINow = $("<p class='badge bg-warning' id='uvIndex'>").text("UV Index: " + uviNow);
                curDiv.append(resultUVINow);
            } else if (uviNow <=7){
                var resultUVINow = $("<p class='badge bg-orange' id='uvIndex'>").text("UV Index: " + uviNow);
                curDiv.append(resultUVINow);
            } else {
                var resultUVINow = $("<p class='badge bg-danger' id='uvIndex'>").text("UV Index: " + uviNow);
                curDiv.append(resultUVINow);
            }
        })
    })

    // var queryForecast = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&cnt=40&appid=" + APIKey;
    $.ajax({
        url: queryWeatherNow,
        method: "GET"
      })
      .then(function(response) {
        var latItDude = response.coord.lat;
         var lonGitDude = response.coord.lon;
         var queryForecast = "http://api.openweathermap.org/data/2.5/onecall?lat=" + latItDude + "&lon=" + lonGitDude + "&exclude=current,minutely,hourly,alerts&units=imperial&cnt=5&appid=" + APIKey;

        $.ajax({
            url: queryForecast,
            method: "GET"
        })
        .then(function(response) {
            console.log(queryForecast);
            console.log(response);
            //First Day Forecast//
            var cardOne = $("#cardOne");
            var dateForOne = new Date(response.daily[0].dt *1000);
            dateForOne = dateForOne.toLocaleString();
            dateForOne = dateForOne.substr(0, 8)
            console.log(dateForOne);
            var resultDate = $("<h5>").text(dateForOne);
            cardOne.append(resultDate);
            //temperature//
            var tempForOne = response.daily[0].temp.day;
            console.log(tempForOne);
            var resultTempForOne = $("<p>").text("Temp.: " + tempForOne + "°F");
            cardOne.append(resultTempForOne);
            // humidity//
            var humForOne = response.daily[0].humidity;
            console.log(humForOne);
            var resultHumForOne = $("<p>").text("Humidity: " + humForOne + "%");
            cardOne.append(resultHumForOne);

            //Second Day Forecast//
            var cardTwo = $("#cardTwo");
            var dateForTwo = new Date(response.daily[1].dt *1000);
            dateForTwo = dateForTwo.toLocaleString();
            dateForTwo = dateForTwo.substr(0, 8)
            console.log(dateForTwo);
            var resultDate = $("<h5>").text(dateForTwo);
            cardTwo.append(resultDate);
            // temperature//
            var tempForTwo = response.daily[1].temp.day;
            console.log(tempForTwo);
            var resultTempForTwo = $("<p>").text("Temp.: " + tempForTwo + "°F");
            cardTwo.append(resultTempForTwo);
            // humidity//
            var humForTwo = response.daily[1].humidity;
            console.log(humForTwo);
            var resultHumForTwo = $("<p>").text("Humidity: " + humForTwo + "%");
            cardTwo.append(resultHumForTwo);

            //Third Day Forecast//
            var cardThree = $("#cardThree");
            var dateForThree = new Date(response.daily[2].dt *1000);
            dateForThree = dateForThree.toLocaleString();
            dateForThree = dateForThree.substr(0, 8)
            console.log(dateForThree);
            var resultDate = $("<h5>").text(dateForThree);
            cardThree.append(resultDate);
            // temperature//
            var tempForThree = response.daily[2].temp.day;
            console.log(tempForThree);
            var resultTempForThree = $("<p>").text("Temp.: " + tempForThree + "°F");
            cardThree.append(resultTempForThree);
            // humidity//
            var humForThree = response.daily[2].humidity;
            console.log(humForThree);
            var resultHumForThree = $("<p>").text("Humidity: " + humForThree + "%");
            cardThree.append(resultHumForThree);  

            //Fourth Day Forecast//
            var cardFour = $("#cardFour");
            var dateForFour = new Date(response.daily[3].dt *1000);
            dateForFour = dateForFour.toLocaleString();
            dateForFour = dateForFour.substr(0, 8)
            console.log(dateForFour);
            var resultDate = $("<h5>").text(dateForFour);
            cardFour.append(resultDate);
            // temperature//
            var tempForFour = response.daily[3].temp.day;
            console.log(tempForFour);
            var resultTempForFour = $("<p>").text("Temp.: " + tempForFour + "°F");
            cardFour.append(resultTempForFour);
            // humidity//
            var humForFour = response.daily[3].humidity;
            console.log(humForFour);
            var resultHumForFour = $("<p>").text("Humidity: " + humForFour + "%");
            cardFour.append(resultHumForFour);

            //Fifth Day Forecast//
            var cardFive = $("#cardFive");
            var dateForFive = new Date(response.daily[4].dt *1000);
            dateForFive = dateForFive.toLocaleString();
            dateForFive = dateForFive.substr(0, 8)
            console.log(dateForFive);
            var resultDate = $("<h5>").text(dateForFive);
            cardFive.append(resultDate);
            // temperature//
            var tempForFive = response.daily[4].temp.day;
            console.log(tempForFive);
            var resultTempForFive = $("<p>").text("Temp.: " + tempForFive + "°F");
            cardFive.append(resultTempForFive);
            // humidity//
            var humForFive = response.daily[4].humidity;
            console.log(humForFive);
            var resultHumForFive = $("<p>").text("Humidity: " + humForFive + "%");
            cardFive.append(resultHumForFive); 
        })
    })
});

// have search button call forth the information for the city typed//
// display current day information on the main div//
//display the next 5 days in their repective card//
// have the city typed save to the log and appear as a new button //
// have the button with the city name call the weather stats for that city and display in in the main section//