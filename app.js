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
      
      // const icon = document.createElement("img")
      // icon.src = index.icon
      // body.append(icon)

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
        document.body.style.backgroundImage = "url(data:image/jpeg;base64,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)"
      }

    });
  
      
    

  } catch (error) {
    console.log(error)

    const noSearch = document.createElement("h1")
    noSearch.innerText = "Not a viable search"
    body.append(noSearch)
  }
}

button.addEventListener("click", weatherRequest)