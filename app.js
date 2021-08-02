const button = document.querySelector("#search")
const body = document.querySelector("#BodyBox")


const weatherRequest = async () => {

  while (body.lastChild) {
    body.removeChild(body.lastChild)
  }

  try {
    const city = document.querySelector("#input").value
    const weatherResponce = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=1e7daf730878bdb0f31169272347b4f7`)
    // const weatherResponce = console.log(`api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=1e7daf730878bdb0f31169272347b4f7`)
    
    const weatherData = weatherResponce.data
    console.log(weatherData)

    body.append(`Name: ${weatherData.name}`)

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
      
      // const icon = document.createElement("img")
      // icon.src = index.icon
      // body.append(icon)

      const weatherForecast = document.createElement("h2")
      weatherForecast.innerText = `Weather: ${index.main}`
      body.append(weatherForecast)
      
      const weatherDescr = document.createElement("h2")
      weatherDescr.innerText = `Described as: ${index.description}`
      body.append(weatherDescr)

    });

  } catch (error) {
    console.log(error)
  }
}

button.addEventListener("click", weatherRequest)