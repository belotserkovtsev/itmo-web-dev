
for(let i = 0; i < localStorage.length; ++i) {
  // console.log(localStorage.getItem(i))
  setTimeout( () => {
    // console.log(i)
    requestFor(localStorage.key(i))
  }, 2000 * i)
}

let requestHistory = []

document.getElementById("submitCity").addEventListener("click", () => {
  let city = document.getElementById('inputCity').value.toLowerCase()
  document.getElementById('inputCity').value = ""
  if(localStorage.getItem(city) === null && city.trim().length > 0 && !requestHistory.includes(city)) {
    requestHistory.push(city)
    requestFor(city)
  }
})

function requestFor(city) {
  let wrapperBlock = document.getElementById("weatherDataWrapper")

  let blockToAppend = document.querySelector('#weatherBlockLoadingTemplate')
  let clone = document.importNode(blockToAppend.content, true);
  clone.querySelector('#weatherBlockLoading').id = 'weatherBlockLoading'+city
  clone.querySelector('#weatherBlockLoaded').id = 'weatherBlockLoaded'+city
  wrapperBlock.appendChild(clone)

  let favouriteRequest = new XMLHttpRequest()
  favouriteRequest.open('GET', `https://community-open-weather-map.p.rapidapi.com/weather?q=${city}&units=metric`, true)
  favouriteRequest.setRequestHeader('x-rapidapi-key', 'd5d8135a54mshd320d2f046aa089p1025c7jsnbd7c07d68604')

  favouriteRequest.onreadystatechange = function() {
        if(favouriteRequest.readyState === XMLHttpRequest.DONE && favouriteRequest.status === 200) {
            let data = JSON.parse(this.response)
            let wbLoading = document.querySelector('#weatherBlockLoading'+city)
            let wbLoaded = document.querySelector('#weatherBlockLoaded'+city)
            wbLoading.style = "display: none;"
            wbLoaded.style = ""

            let p = wbLoaded.querySelectorAll("p")
            let h3 = wbLoaded.querySelectorAll("h3")

            h3[0].textContent = data.name
            p[0].textContent = data.main.temp + "°C"
            p[2].textContent = data.wind.speed + " km/h"
            p[4].textContent = data.visibility + " m"
            p[6].textContent = data.main.pressure + " bar"
            p[8].textContent = data.main.humidity + " %"
            p[10].textContent = data.coord.lon + ', ' + data.coord.lat

            if(localStorage.getItem(city) === null) {
              localStorage.setItem(city, city);
            }
            let remove = wbLoaded.querySelectorAll('button')
            remove[0].addEventListener("click", () => {
              wbLoaded.remove()
              wbLoading.remove()
              localStorage.removeItem(city)
            })

        } else if (favouriteRequest.status !== 200) {
          let wbLoading = document.querySelector('#weatherBlockLoading'+city)
          let p = wbLoading.querySelectorAll("p")
          let img = wbLoading.querySelectorAll("img")
          p[0].style = ""
          p[0].textContent = "Error " + favouriteRequest.status
          img[0].style = "display: none;"
        }
    }

    favouriteRequest.send()
}
