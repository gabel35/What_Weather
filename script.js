function clear(){
    $("#resultDiv").empty();
}


$("#magnifying-glass").on("click", function(event) {
    event.preventDefault();
    clear();
    
    var APIKey = "9b97bdc0a57667e94c3b8958a0c57307";
    var cityName = $("#city-name").val().trim();
    var queryWeatherNow = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;

    $.ajax({
      url: queryWeatherNow,
      method: "GET"
    })
    .then(function(response) {
        console.log(queryWeatherNow);
        console.log(response);
    })

    var queryForecast = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&cnt=5&appid=" + APIKey;

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