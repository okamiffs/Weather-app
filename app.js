const button = document.querySelector("#search")
const body = document.querySelector("#BodyBox")
const iconBox = document.querySelector("#IconBox")
const inputField = document.querySelector("#input")

const weatherRequest = async () => {

  while (body.lastChild) {
    body.removeChild(body.lastChild)
  }
  while (iconBox.lastChild) {
    iconBox.removeChild(iconBox.lastChild)
  }

  try {
    let city = inputField.value
    const weatherResponce = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=1e7daf730878bdb0f31169272347b4f7`)
    inputField.value = ""
    const weatherData = weatherResponce.data
    console.log(weatherData)


    const name = document.createElement('h1')
    name.innerText = `Name: ${weatherData.name}`
    body.append(name)

    const temp = document.createElement("h2")
    temp.innerText = `Temp: ${weatherData.main.temp}F`
    body.append(temp)

    const feelsLike = document.createElement("h2")
    feelsLike.innerText = `Feels like: ${weatherData.main.feels_like}F`
    body.append(feelsLike)

    const tempMaxMin = document.createElement("h2")
    tempMaxMin.innerText = `Highest: ${weatherData.main.temp_max}F Lowest: ${weatherData.main.temp_min}F`
    body.append(tempMaxMin)

    const weatherConditions = weatherResponce.data.weather
    weatherConditions.forEach(index => {
      
      const icon = document.createElement("img")
      icon.src = `http://openweathermap.org/img/wn/${index.icon}@2x.png`
      iconBox.append(icon)

      const weatherForecast = document.createElement("h2")
      weatherForecast.innerText = `Weather: ${index.main}`
      body.append(weatherForecast)
      
      const weatherDescr = document.createElement("h2")
      weatherDescr.innerText = `Described as: ${index.description}`
      body.append(weatherDescr)

      if (index.main === "Clouds") {
        document.body.style.backgroundImage = "url(https://cdn.pixabay.com/photo/2020/08/24/20/14/clouds-5514993_1280.jpg)"
      } else if (index.main === "Clear") {
        document.body.style.backgroundImage = "url(https://image.shutterstock.com/image-photo/blue-sky-cloud-bright-morning-260nw-1567973272.jpg)"
      } else if (index.main === "Rain" || "Drizzle") {
        if (index.main === "thunderstorm") {
          document.body.style.backgroundImage = "url(https://physics.aps.org/assets/3a3e7b4c-4f56-4184-888d-e41fc70fa546/e29_1.png)"
        }
        document.body.style.backgroundImage = "url(https://i.pinimg.com/originals/92/34/38/923438ea72f4320989192aa24e88c4a5.jpg)"
      }

    });
  
      
   

  } catch (error) {
    const noSearch = document.createElement("h1")
    noSearch.innerText = "Not a viable search"
    body.append(noSearch)
  }
}

button.addEventListener("click", weatherRequest)