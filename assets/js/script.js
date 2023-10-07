
var APIkey="8cc5aa0691fc507164238dafdbbf0ac8"

var searchButton=document.getElementById("City")


searchButton.addEventListener("click", function(event){
    event.preventDefault ()

    var city = document.getElementById("searchCity").value
    console.log (city)
    getWeatherData (city)
})
function getWeatherData(city) {
    var currentWeatherAPI =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;
    fetch(currentWeatherAPI)
    .then (response => {
        return response.json()
    }).then(data => {
        console.log(data)
    })



}