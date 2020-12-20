function clear(){
    $("#resultDiv").empty();
    $("#cardOne").empty();
    $("#cardTwo").empty();
    $("#cardThree").empty();
    $("#cardFour").empty();
    $("#cardFive").empty();
    $("#city-name").empty();
}

//Have a default city for when people first enter page//
function searchNewark() {
    clear();
    var APIKey = "9b97bdc0a57667e94c3b8958a0c57307";
    var cityName = "Newark";
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
        //current weather (for symbol)//
        var weatherNow = response.weather[0].main;
        console.log(weatherNow);
            if (weatherNow === "Clouds"){
                var resultWeatherNow = $("<i class='fas fa-cloud'></i>");
                curDiv.append(resultWeatherNow);
            } else if (weatherNow === "Snow"){
                var resultWeatherNow = $("<i class='far fa-snowflake'></i>");
                curDiv.append(resultWeatherNow);
            } else if (weatherNow === "Rain"){
                var resultWeatherNow = $("<i class='fas fa-cloud-showers-heavy'></i>");
                curDiv.append(resultWeatherNow);
            } else {
                var resultWeatherNow = $("<i class='fas fa-sun'></i>");
                curDiv.append(resultWeatherNow);
            }
              
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
        var queryUVI = "https://api.openweathermap.org/data/2.5/uvi?lat="+ latItDude + "&lon=" + lonGitDude + "&appid=" + APIKey;
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
        $.ajax({
            url: queryWeatherNow,
            method: "GET"
          })
          .then(function(response) {
            var latItDude = response.coord.lat;
             var lonGitDude = response.coord.lon;
             var queryForecast = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latItDude + "&lon=" + lonGitDude + "&exclude=current,minutely,hourly,alerts&units=imperial&cnt=5&appid=" + APIKey;
    
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
                //weather (for symbol)//
                var weatherForOne = response.daily[0].weather[0].main;
                console.log(weatherForOne);
                if (weatherForOne === "Clouds"){
                    var resultWeatherForOne = $("<div class='elI'><i class='fas fa-cloud'></i></div>");
                    cardOne.append(resultWeatherForOne);
                } else if (weatherForOne === "Snow"){
                    var resultWeatherForOne = $("<div class='elI'><i class='far fa-snowflake'></i></div>");
                    cardOne.append(resultWeatherForOne);
                } else if (weatherForOne === "Rain"){
                    var resultWeatherForOne = $("<div class='elI'><i class='fas fa-cloud-showers-heavy'></i></div>");
                    cardOne.append(resultWeatherForOne);
                } else {
                    var resultWeatherForOne = $("<div class='elI'><i class='fas fa-sun'></i></div>");
                    cardOne.append(resultWeatherForOne);
                }            
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
                //weather (for symbol)//
                var weatherForTwo = response.daily[1].weather[0].main;
                console.log(weatherForTwo);
                if (weatherForTwo === "Clouds"){
                    var resultWeatherForTwo = $("<div class='elI'><i class='fas fa-cloud'></i></div>");
                    cardTwo.append(resultWeatherForTwo);
                } else if (weatherForTwo === "Snow"){
                    var resultWeatherForTwo = $("<div class='elI'><i class='far fa-snowflake'></i></div>");
                    cardTwo.append(resultWeatherForTwo);
                } else if (weatherForTwo === "Rain"){
                    var resultWeatherForTwo = $("<div class='elI'><i class='fas fa-cloud-showers-heavy'></i></div>");
                    cardTwo.append(resultWeatherForTwo);
                } else {
                    var resultWeatherForTwo = $("<div class='elI'><i class='fas fa-sun'></i></div>");
                    cardTwo.append(resultWeatherForTwo);
                }            
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
                //weather (for symbol)//
                var weatherForThree = response.daily[2].weather[0].main;
                console.log(weatherForThree);
                if (weatherForThree === "Clouds"){
                    var resultWeatherForThree = $("<div class='elI'><i class='fas fa-cloud'></i></div>");
                    cardThree.append(resultWeatherForThree);
                } else if (weatherForThree === "Snow"){
                    var resultWeatherForThree = $("<div class='elI'><i class='far fa-snowflake'></i></div>");
                    cardThree.append(resultWeatherForThree);
                } else if (weatherForThree === "Rain"){
                    var resultWeatherForThree = $("<div class='elI'><i class='fas fa-cloud-showers-heavy'></i></div>");
                    cardThree.append(resultWeatherForThree);
                } else {
                    var resultWeatherForThree = $("<div class='elI'><i class='fas fa-sun'></i></div>");
                    cardThree.append(resultWeatherForThree);
                }            
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
                //weather (for symbol)//
                var weatherForFour = response.daily[3].weather[0].main;
                console.log(weatherForFour);
                if (weatherForFour === "Clouds"){
                    var resultWeatherForFour = $("<div class='elI'><i class='fas fa-cloud'></i></div>");
                    cardFour.append(resultWeatherForFour);
                } else if (weatherForFour === "Snow"){
                    var resultWeatherForFour = $("<div class='elI'><i class='far fa-snowflake'></i></div>");
                    cardFour.append(resultWeatherForFour);
                } else if (weatherForFour === "Rain"){
                    var resultWeatherForFour = $("<div class='elI'><i class='fas fa-cloud-showers-heavy'></i></div>");
                    cardFour.append(resultWeatherForFour);
                } else {
                    var resultWeatherForFour = $("<div class='elI'><i class='fas fa-sun'></i></div>");
                    cardFour.append(resultWeatherForFour);
                }            
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
                //weather (for symbol)//
                var weatherForFive = response.daily[4].weather[0].main;
                console.log(weatherForFive);
                if (weatherForFive === "Clouds"){
                    var resultWeatherForFive = $("<div class='elI'><i class='fas fa-cloud'></i></div>");
                    cardFive.append(resultWeatherForFive);
                } else if (weatherForFive === "Snow"){
                    var resultWeatherForFive = $("<div class='elI'><i class='far fa-snowflake'></i></div>");
                    cardFive.append(resultWeatherForFive);
                } else if (weatherForFive === "Rain"){
                    var resultWeatherForFive = $("<div class='elI'><i class='fas fa-cloud-showers-heavy'></i></div>");
                    cardFive.append(resultWeatherForFive);
                } else {
                    var resultWeatherForFive = $("<div class='elI'><i class='fas fa-sun'></i></div>");
                    cardFive.append(resultWeatherForFive);
                }            
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
    })
}   
searchNewark();

$("#cityNewark").on("click", function (event){
    event.preventDefault();
    searchNewark();
});


//activate api call for user submitted cities//
$("#magnifying-glass").on("click", function searchCity (event) {
    event.preventDefault();
    clear();
    
    var APIKey = "9b97bdc0a57667e94c3b8958a0c57307";
    var cityName = $("#city-name").val().trim();
    var cityButton = $("<button type='button' class='list-group-item list-grou-item-action' id=cityName").text(cityName);
    var clickCities = $("#clickCities");
    clickCities.append(cityButton);
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
        //current weather (for symbol)//
        var weatherNow = response.weather[0].main;
        console.log(weatherNow);
            if (weatherNow === "Clouds"){
                var resultWeatherNow = $("<i class='fas fa-cloud'></i>");
                curDiv.append(resultWeatherNow);
            } else if (weatherNow === "Snow"){
                var resultWeatherNow = $("<i class='far fa-snowflake'></i>");
                curDiv.append(resultWeatherNow);
            } else if (weatherNow === "Rain"){
                var resultWeatherNow = $("<i class='fas fa-cloud-showers-heavy'></i>");
                curDiv.append(resultWeatherNow);
            } else {
                var resultWeatherNow = $("<i class='fas fa-sun'></i>");
                curDiv.append(resultWeatherNow);
            }
              
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
        var queryUVI = "https://api.openweathermap.org/data/2.5/uvi?lat="+ latItDude + "&lon=" + lonGitDude + "&appid=" + APIKey;
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

    // var queryForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&cnt=40&appid=" + APIKey;
    $.ajax({
        url: queryWeatherNow,
        method: "GET"
      })
      .then(function(response) {
        var latItDude = response.coord.lat;
         var lonGitDude = response.coord.lon;
         var queryForecast = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latItDude + "&lon=" + lonGitDude + "&exclude=current,minutely,hourly,alerts&units=imperial&cnt=5&appid=" + APIKey;

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
            //weather (for symbol)//
            var weatherForOne = response.daily[0].weather[0].main;
            console.log(weatherForOne);
            if (weatherForOne === "Clouds"){
                var resultWeatherForOne = $("<div class='elI'><i class='fas fa-cloud'></i></div>");
                cardOne.append(resultWeatherForOne);
            } else if (weatherForOne === "Snow"){
                var resultWeatherForOne = $("<div class='elI'><i class='far fa-snowflake'></i></div>");
                cardOne.append(resultWeatherForOne);
            } else if (weatherForOne === "Rain"){
                var resultWeatherForOne = $("<div class='elI'><i class='fas fa-cloud-showers-heavy'></i></div>");
                cardOne.append(resultWeatherForOne);
            } else {
                var resultWeatherForOne = $("<div class='elI'><i class='fas fa-sun'></i></div>");
                cardOne.append(resultWeatherForOne);
            }            
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
            //weather (for symbol)//
            var weatherForTwo = response.daily[1].weather[0].main;
            console.log(weatherForTwo);
            if (weatherForTwo === "Clouds"){
                var resultWeatherForTwo = $("<div class='elI'><i class='fas fa-cloud'></i></div>");
                cardTwo.append(resultWeatherForTwo);
            } else if (weatherForTwo === "Snow"){
                var resultWeatherForTwo = $("<div class='elI'><i class='far fa-snowflake'></i></div>");
                cardTwo.append(resultWeatherForTwo);
            } else if (weatherForTwo === "Rain"){
                var resultWeatherForTwo = $("<div class='elI'><i class='fas fa-cloud-showers-heavy'></i></div>");
                cardTwo.append(resultWeatherForTwo);
            } else {
                var resultWeatherForTwo = $("<div class='elI'><i class='fas fa-sun'></i></div>");
                cardTwo.append(resultWeatherForTwo);
            }            
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
            //weather (for symbol)//
            var weatherForThree = response.daily[2].weather[0].main;
            console.log(weatherForThree);
            if (weatherForThree === "Clouds"){
                var resultWeatherForThree = $("<div class='elI'><i class='fas fa-cloud'></i></div>");
                cardThree.append(resultWeatherForThree);
            } else if (weatherForThree === "Snow"){
                var resultWeatherForThree = $("<div class='elI'><i class='far fa-snowflake'></i></div>");
                cardThree.append(resultWeatherForThree);
            } else if (weatherForThree === "Rain"){
                var resultWeatherForThree = $("<div class='elI'><i class='fas fa-cloud-showers-heavy'></i></div>");
                cardThree.append(resultWeatherForThree);
            } else {
                var resultWeatherForThree = $("<div class='elI'><i class='fas fa-sun'></i></div>");
                cardThree.append(resultWeatherForThree);
            }            
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
            //weather (for symbol)//
            var weatherForFour = response.daily[3].weather[0].main;
            console.log(weatherForFour);
            if (weatherForFour === "Clouds"){
                var resultWeatherForFour = $("<div class='elI'><i class='fas fa-cloud'></i></div>");
                cardFour.append(resultWeatherForFour);
            } else if (weatherForFour === "Snow"){
                var resultWeatherForFour = $("<div class='elI'><i class='far fa-snowflake'></i></div>");
                cardFour.append(resultWeatherForFour);
            } else if (weatherForFour === "Rain"){
                var resultWeatherForFour = $("<div class='elI'><i class='fas fa-cloud-showers-heavy'></i></div>");
                cardFour.append(resultWeatherForFour);
            } else {
                var resultWeatherForFour = $("<div class='elI'><i class='fas fa-sun'></i></div>");
                cardFour.append(resultWeatherForFour);
            }            
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
            //weather (for symbol)//
            var weatherForFive = response.daily[4].weather[0].main;
            console.log(weatherForFive);
            if (weatherForFive === "Clouds"){
                var resultWeatherForFive = $("<div class='elI'><i class='fas fa-cloud'></i></div>");
                cardFive.append(resultWeatherForFive);
            } else if (weatherForFive === "Snow"){
                var resultWeatherForFive = $("<div class='elI'><i class='far fa-snowflake'></i></div>");
                cardFive.append(resultWeatherForFive);
            } else if (weatherForFive === "Rain"){
                var resultWeatherForFive = $("<div class='elI'><i class='fas fa-cloud-showers-heavy'></i></div>");
                cardFive.append(resultWeatherForFive);
            } else {
                var resultWeatherForFive = $("<div class='elI'><i class='fas fa-sun'></i></div>");
                cardFive.append(resultWeatherForFive);
            }            
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

// have the city typed save to the log and appear as a new button //
// have the button with the city name call the weather stats for that city and display in in the main section//