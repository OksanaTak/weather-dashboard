var APIkey = '8cc5aa0691fc507164238dafdbbf0ac8'

var searchButton = document.getElementById('City')
// localStorage.clear()
// console.log(searchButton)


searchButton.addEventListener('click', function (event) {
  event.preventDefault()

  var city = document.getElementById('searchCity').value
  console.log(city)
  getWeatherData(city)
  getFiveDaysData(city)
  var previousList = JSON.parse(localStorage.getItem('weathersearch')) || []
  previousList.push(city)
  console.log(previousList)
  localStorage.setItem('weathersearch', JSON.stringify(previousList))
  cityListDisplay()
})

function getWeatherData (city) {
  var currentWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=imperial`
  fetch(currentWeatherAPI)
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data)
      document.getElementById('city-name').innerText = 'City ' + city
      document
        .getElementById('weatherIcon')
        .setAttribute(
          'src',
          `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        )
      document.getElementById('temperature').innerText =
        'Temperature ' + data.main.temp + 'F'
      document.getElementById('humidity').innerText =
        'Humidity ' + data.main.humidity + '%'
      document.getElementById('windSpeed').innerText =
        'Wind speed ' + data.wind.speed + 'mph'
    })
}
function getFiveDaysData (city) {
  //api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
  var fiveDayWeatherAPI = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}&units=imperial`
  fetch(fiveDayWeatherAPI)
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data)
      var j = 1
      for (let i = 0; i < data.list.length; i = i + 8) {
        document.getElementById('date-' + j).innerText = data.list[i].dt_txt
        document
          .getElementById('weatherIcon-' + j)
          .setAttribute(
            'src',
            `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`
          )
        document.getElementById('temperature-' + j).innerText =
          'Temperature ' + data.list[i].main.temp + 'F'
        document.getElementById('humidity-' + j).innerText =
          'Humidity ' + data.list[i].main.humidity + '%'
        document.getElementById('windSpeed-' + j).innerText =
          'Wind speed ' + data.list[i].wind.speed + 'mph'
        j++
      }
    })
}

console.log('Js response')
function cityListDisplay () {
  var previousList = JSON.parse(localStorage.getItem('weathersearch')) || []
  document.getElementById('cityList').innerHTML = ""
  console.log(previousList)
  for(let i=0;i<previousList.length;i++) {
    var btn = document.createElement('button')

    btn.innerText = previousList[i]
    btn.classList.add("previous-search")
    const node = document.createElement('li')
    node.appendChild(btn)
    document.getElementById('cityList').appendChild(node)
  }
  var previousSearchBtnsList = document.querySelectorAll('.previous-search');

  previousSearchBtnsList.forEach(btn=> btn.addEventListener("click",previousSearchCityName))

}
function previousSearchCityName (event) {
    var city = event.target.innerText
    getFiveDaysData(city)
    getWeatherData(city)
}

cityListDisplay()
