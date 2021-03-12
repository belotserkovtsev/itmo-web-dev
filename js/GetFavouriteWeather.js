
for(let i = 0; i < localStorage.length; ++i) {
  // console.log(localStorage.getItem(i))
  setTimeout( () => {
    // console.log(i)
    requestFor(localStorage.key(i))
  }, 2000 * i)
}

function requestFor(city) {
  let favouriteRequest = new XMLHttpRequest()
  favouriteRequest.open('GET', `https://community-open-weather-map.p.rapidapi.com/weather?q=${city}&units=metric`, true)
  favouriteRequest.setRequestHeader('x-rapidapi-key', '6612892f6emsh30a0f24ef412cd4p124235jsnf129c5108087')

  favouriteRequest.onreadystatechange = function() {
        if(favouriteRequest.readyState === XMLHttpRequest.DONE && favouriteRequest.status === 200) {
            let data = JSON.parse(this.response)
            // console.log(data)
            let insertBlock = document.getElementById('weatherDataWrapper')
            insertBlock.insertAdjacentHTML('afterbegin',
            `
            <div id="${city.toLowerCase()}Block" class="weatherBlock">
              <div class="headerWeatherDataWrapper">
                <h3>${data.name}</h3>
                <p class="regularTemperature">${data.main.temp}°C</p>
                <img src="./img/cloud.png" class="weatherIcon">
                <button onclick="removeBlock('${city.toLowerCase()}')" class="btn closeBtn" type="button" name="button">X</button>
              </div>

              <ul>
                <li class="weatherDataBlock">
                  <p>Ветер</p>
                  <p>${data.wind.speed} km/h</p>
                </li>

                <li class="weatherDataBlock">
                  <p>Видимость</p>
                  <p>${data.visibility} m</p>
                </li>

                <li class="weatherDataBlock">
                  <p>Давление</p>
                  <p>${data.main.pressure} bar</p>
                </li>

                <li class="weatherDataBlock">
                  <p>Влажность</p>
                  <p>${data.main.humidity} %</p>
                </li>

                <li class="weatherDataBlock">
                  <p>Координаты</p>
                  <p>${data.coord.lon + ', ' + data.coord.lat}</p>
                </li>
              </ul>
            </div>

            `)
            if(localStorage.getItem(city) === null) {
              localStorage.setItem(city, city);
            }
        }
    }
  favouriteRequest.send()
}

function storeCity() {
  let city = document.getElementById("inputCity")
  requestFor(city.value)
  // console.log(city.value);
}

function removeBlock(city) {
  document.getElementById(city+'Block').remove()
  localStorage.removeItem(city)
}
