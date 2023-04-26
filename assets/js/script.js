var dateEl = document.querySelector('#date-main')
var searchButton = document.querySelector('#search-button')
var userInput = document.querySelector('#search-field')
var date = dayjs().format('dddd, MMMM D, YYYY h:mm A')
dateEl.textContent = date

searchButton.addEventListener('click',function(e) {
    e.preventDefault();
    var userSearch = userInput.value
    fetchAPI(userSearch)
})

function fetchAPI (userSearch) {
    removeData ();
    var API_BASE_URL = 'http://api.openweathermap.org/geo/1.0/direct?q='
    fetch(API_BASE_URL + userSearch + '&appid=489926538e0b86d709e90c069e0d5027')
    .then(function (res) {
    return res.json();
    })
    .then(function (data) {
    userName = data[0].name;
    userLat = data[0].lat;
    userLon = data[0].lon;
    userLat = userLat.toString();
    userLon = userLon.toString()
    //Have to set variables to local storage so they can be retrieved elsewhere
    localStorage.setItem('latitude', JSON.stringify(userLat))
    localStorage.setItem('longitude',JSON.stringify(userLon))
    localStorage.setItem('name',JSON.stringify(userName))
    searchHistory(userName)

    //second call
    var API_BASE_URL_FORECAST = 'https://api.openweathermap.org/data/2.5/forecast?'
    fetch(API_BASE_URL_FORECAST + 'lat=' + userLat + '&lon=' + userLon + '&appid=489926538e0b86d709e90c069e0d5027')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            storeData (data)
            renderForecast()
        })

        //third call
        var API_BASE_URL_CURRENT = 'https://api.openweathermap.org/data/2.5/weather?'
        fetch(API_BASE_URL_CURRENT + 'lat=' + userLat + '&lon=' + userLon + '&appid=489926538e0b86d709e90c069e0d5027')
            .then(function (res) {
                return res.json();
            }).then( function (data) {
                console.log(data)

                currentTemp = data.main.temp
                currentWind = data.wind.speed
                currentHum = data.main.humidity
                currentDate = data.dt
                currentIcon = data.weather[0].icon

                currentDate = dayjs(currentDate*1000).format(' (M/D/YYYY)')
                currentTemp = Math.round((currentTemp-273.15)*1.8+32)

                localStorage.setItem('currentTemperature',JSON.stringify(currentTemp))
                localStorage.setItem('currentWind',JSON.stringify(currentWind))
                localStorage.setItem('currentHum',JSON.stringify(currentHum))
                localStorage.setItem('currentDate',JSON.stringify(currentDate))
                localStorage.setItem('currentIcon',JSON.stringify(currentIcon))

                renderCurrent ()
            })
    })
}

function storeData (data) {

    //Forecast for 1st day
    temp1 = data.list[7].main.temp
    wind1 = data.list[7].wind.speed
    hum1 = data.list[7].main.humidity
    date1 = data.list[7].dt
    icon1 = data.list[7].weather[0].icon

    date1 = dayjs(date1*1000).format('dddd - M/D/YYYY')
    temp1 = Math.round((temp1-273.15)*1.8+32)

    localStorage.setItem('temperature1',JSON.stringify(temp1))
    localStorage.setItem('wind1',JSON.stringify(wind1))
    localStorage.setItem('humidity1',JSON.stringify(hum1))
    localStorage.setItem('date1',JSON.stringify(date1))
    localStorage.setItem('weathericon1',JSON.stringify(icon1))
    //Forecast for 2nd day
    temp2 = data.list[15].main.temp
    wind2 = data.list[15].wind.speed
    hum2 = data.list[15].main.humidity
    date2 = data.list[15].dt
    icon2 = data.list[15].weather[0].icon

    date2 = dayjs(date2*1000).format('dddd - M/D/YYYY')
    temp2 = Math.round((temp2-273.15)*1.8+32)

    localStorage.setItem('temperature2',JSON.stringify(temp2))
    localStorage.setItem('wind2',JSON.stringify(wind2))
    localStorage.setItem('humidity2',JSON.stringify(hum2))
    localStorage.setItem('date2',JSON.stringify(date2))
    localStorage.setItem('weathericon2',JSON.stringify(icon2))
    //Forecast for 3rd day
    temp3 = data.list[23].main.temp
    wind3 = data.list[23].wind.speed
    hum3 = data.list[23].main.humidity
    date3 = data.list[23].dt
    icon3 = data.list[23].weather[0].icon

    date3 = dayjs(date3*1000).format('dddd - M/D/YYYY')
    temp3 = Math.round((temp3-273.15)*1.8+32)

    localStorage.setItem('temperature3',JSON.stringify(temp3))
    localStorage.setItem('wind3',JSON.stringify(wind3))
    localStorage.setItem('humidity3',JSON.stringify(hum3))
    localStorage.setItem('date3',JSON.stringify(date3))
    localStorage.setItem('weathericon3',JSON.stringify(icon3))
    //Forecast for 4th day
    temp4 = data.list[31].main.temp
    wind4 = data.list[31].wind.speed
    hum4 = data.list[31].main.humidity
    date4 = data.list[31].dt
    icon4 = data.list[31].weather[0].icon

    date4 = dayjs(date4*1000).format('dddd - M/D/YYYY')
    temp4 = Math.round((temp4-273.15)*1.8+32)

    localStorage.setItem('temperature4',JSON.stringify(temp4))
    localStorage.setItem('wind4',JSON.stringify(wind4))
    localStorage.setItem('humidity4',JSON.stringify(hum4))
    localStorage.setItem('date4',JSON.stringify(date4))
    localStorage.setItem('weathericon4',JSON.stringify(icon4))
    //Forecast for 5th day
    temp5 = data.list[39].main.temp
    wind5 = data.list[39].wind.speed
    hum5 = data.list[39].main.humidity
    date5 = data.list[39].dt
    icon5 = data.list[39].weather[0].icon

    date5 = dayjs(date5*1000).format('dddd - M/D/YYYY')
    temp5 = Math.round((temp5-273.15)*1.8+32)

    localStorage.setItem('temperature5',JSON.stringify(temp5))
    localStorage.setItem('wind5',JSON.stringify(wind5))
    localStorage.setItem('humidity5',JSON.stringify(hum5))
    localStorage.setItem('date5',JSON.stringify(date5))
    localStorage.setItem('weathericon5',JSON.stringify(icon5))
}

function renderCurrent() {
    var currentDivEl = document.createElement('div')
    currentDivEl.setAttribute('style',' width:80%; background-color: var(--secondarycolor); margin-top:20px; margin-right: auto; margin-left: auto;')
    currentDivEl.setAttribute('class','card my2 align-items-center currentDivEl')

    // elements
    var currentDateEl = document.createElement('h2')
    currentDateEl.setAttribute('style','background-color: var(--secondarycolor); color: var(--mainbackgroundcolor); font-weight: bold;')
    currentDateEl.textContent =  JSON.parse(localStorage.getItem('name'))+JSON.parse(localStorage.getItem('currentDate'))
    currentIcon = document.createElement('img')
    currentIcon.setAttribute('src','https://openweathermap.org/img/wn/'+JSON.parse(localStorage.getItem('currentIcon'))+'@2x.png')
    //add alt
    currentIcon.setAttribute('style',"width: 50px; background-color: var(--secondarycolor);")
    currentTemp = document.createElement('h2')
    currentTemp.setAttribute('style','background-color: var(--secondarycolor); color: var(--mainbackgroundcolor); font-weight: bold;')
    currentTemp.textContent = 'Temp: '+JSON.parse(localStorage.getItem('currentTemperature'))+'°F'
    currentWind = document.createElement('h2')
    currentWind.setAttribute('style','background-color: var(--secondarycolor); color: var(--mainbackgroundcolor); font-weight: bold;')
    currentWind.textContent = 'Wind: '+JSON.parse(localStorage.getItem('currentWind'))+' MPH'
    currentHum = document.createElement('h2')
    currentHum.setAttribute('style','background-color: var(--secondarycolor); color: var(--mainbackgroundcolor); font-weight: bold;')
    currentHum.textContent = 'Humidity: '+JSON.parse(localStorage.getItem('currentHum'))+' %'

    document.body.appendChild(currentDivEl)
    currentDivEl.appendChild(currentDateEl)
    currentDivEl.appendChild(currentIcon)
    currentDivEl.appendChild(currentTemp)
    currentDivEl.appendChild(currentWind)
    currentDivEl.appendChild(currentHum)
}

function renderForecast () {
    //Div 
    var divEl = document.createElement('div')
    divEl.setAttribute('class','d-flex justify-content-around DivEl')
    divEl.setAttribute('style','margin-top:20px;')
    document.body.appendChild(divEl)



    //Card 1
    var cardEl1 = document.createElement('card')
    cardEl1.setAttribute('class','card my2 align-items-center')
    cardEl1.setAttribute('style','width: 18rem; background-color: var(--secondarycolor);')

    //card elements
    forecastDate1 = document.createElement('h4')
    forecastDate1.setAttribute('style','background-color: var(--secondarycolor); color: var(--mainbackgroundcolor); font-weight: bold;')
    forecastDate1.textContent = JSON.parse(localStorage.getItem('date1'))
    icon1 = document.createElement('img')
    icon1.setAttribute('src','https://openweathermap.org/img/wn/'+JSON.parse(localStorage.getItem('weathericon1'))+'@2x.png')
    //add alt
    icon1.setAttribute('style',"width: 50px; background-color: var(--secondarycolor);")
    temp1El = document.createElement('h2')
    temp1El.setAttribute('style','background-color: var(--secondarycolor); color: var(--mainbackgroundcolor); font-weight: bold;')
    temp1El.textContent = 'Temp: '+JSON.parse(localStorage.getItem('temperature1'))+'°F'
    wind1El = document.createElement('h2')
    wind1El.setAttribute('style','background-color: var(--secondarycolor); color: var(--mainbackgroundcolor); font-weight: bold;')
    wind1El.textContent = 'Wind: '+JSON.parse(localStorage.getItem('wind1'))+' MPH'
    hum1El = document.createElement('h2')
    hum1El.setAttribute('style','background-color: var(--secondarycolor); color: var(--mainbackgroundcolor); font-weight: bold;')
    hum1El.textContent = 'Humidity: '+JSON.parse(localStorage.getItem('humidity1'))+' %'

    //append card 1 elements
    cardEl1.appendChild(forecastDate1)
    cardEl1.appendChild(icon1)
    cardEl1.appendChild(temp1El)
    cardEl1.appendChild(wind1El)
    cardEl1.appendChild(hum1El)
    


    //Card 2
    var cardEl2 = document.createElement('card')
    cardEl2.setAttribute('class','card my2 align-items-center')
    cardEl2.setAttribute('style','width: 18rem; background-color: var(--secondarycolor);')

    //card elements
    forecastDate2 = document.createElement('h4')
    forecastDate2.textContent = JSON.parse(localStorage.getItem('date2'))
    forecastDate2.setAttribute('style','background-color: var(--secondarycolor); color: var(--mainbackgroundcolor); font-weight: bold;')
    icon2 = document.createElement('img')
    icon2.setAttribute('src','https://openweathermap.org/img/wn/'+JSON.parse(localStorage.getItem('weathericon2'))+'@2x.png')
    icon2.setAttribute('style',"width: 50px; background-color: var(--secondarycolor);")
    temp1E2 = document.createElement('h2')
    temp1E2.setAttribute('style','background-color: var(--secondarycolor); color: var(--mainbackgroundcolor); font-weight: bold;')
    temp1E2.textContent = 'Temp: '+JSON.parse(localStorage.getItem('temperature2'))+'°F'
    wind2El = document.createElement('h2')
    wind2El.setAttribute('style','background-color: var(--secondarycolor); color: var(--mainbackgroundcolor); font-weight: bold;')
    wind2El.textContent = 'Wind: '+JSON.parse(localStorage.getItem('wind2'))+' MPH'
    hum2El = document.createElement('h2')
    hum2El.setAttribute('style','background-color: var(--secondarycolor); color: var(--mainbackgroundcolor); font-weight: bold;')
    hum2El.textContent = 'Humidity: '+JSON.parse(localStorage.getItem('humidity2'))+' %'

    //append card 2 elements
    cardEl2.appendChild(forecastDate2)
    cardEl2.appendChild(icon2)
    cardEl2.appendChild(temp1E2)
    cardEl2.appendChild(wind2El)
    cardEl2.appendChild(hum2El)



    //Card 3
    var cardEl3 = document.createElement('card')
    cardEl3.setAttribute('class','card my2 align-items-center')
    cardEl3.setAttribute('style','width: 18rem; background-color: var(--secondarycolor);')

    //card elements
    forecastDate3 = document.createElement('h4')
    forecastDate3.textContent = JSON.parse(localStorage.getItem('date3'))
    forecastDate3.setAttribute('style','background-color: var(--secondarycolor); color: var(--mainbackgroundcolor); font-weight: bold;')
    icon3 = document.createElement('img')
    icon3.setAttribute('src','https://openweathermap.org/img/wn/'+JSON.parse(localStorage.getItem('weathericon3'))+'@2x.png')
    icon3.setAttribute('style',"width: 50px; background-color: var(--secondarycolor);")
    temp3El = document.createElement('h2')
    temp3El.setAttribute('style','background-color: var(--secondarycolor); color: var(--mainbackgroundcolor); font-weight: bold;')
    temp3El.textContent = 'Temp: '+JSON.parse(localStorage.getItem('temperature3'))+'°F'
    wind3El = document.createElement('h2')
    wind3El.setAttribute('style','background-color: var(--secondarycolor); color: var(--mainbackgroundcolor); font-weight: bold;')
    wind3El.textContent = 'Wind: '+JSON.parse(localStorage.getItem('wind3'))+' MPH'
    hum3El = document.createElement('h2')
    hum3El.setAttribute('style','background-color: var(--secondarycolor); color: var(--mainbackgroundcolor); font-weight: bold;')
    hum3El.textContent = 'Humidity: '+JSON.parse(localStorage.getItem('humidity3'))+' %'

    //append card 3 elements
    cardEl3.appendChild(forecastDate3)
    cardEl3.appendChild(icon3)
    cardEl3.appendChild(temp3El)
    cardEl3.appendChild(wind3El)
    cardEl3.appendChild(hum3El)



    //Card 4
    var cardEl4 = document.createElement('card')
    cardEl4.setAttribute('class','card my2 align-items-center')
    cardEl4.setAttribute('style','width: 18rem; background-color: var(--secondarycolor);')

    //card elements
    forecastDate4 = document.createElement('h4')
    forecastDate4.textContent = JSON.parse(localStorage.getItem('date4'))
    forecastDate4.setAttribute('style','background-color: var(--secondarycolor); color: var(--mainbackgroundcolor); font-weight: bold;')
    icon4 = document.createElement('img')
    icon4.setAttribute('src','https://openweathermap.org/img/wn/'+JSON.parse(localStorage.getItem('weathericon4'))+'@2x.png')
    icon4.setAttribute('style',"width: 50px; background-color: var(--secondarycolor);")
    temp4El = document.createElement('h2')
    temp4El.setAttribute('style','background-color: var(--secondarycolor); color: var(--mainbackgroundcolor); font-weight: bold;')
    temp4El.textContent = 'Temp: '+JSON.parse(localStorage.getItem('temperature4'))+'°F'
    wind4El = document.createElement('h2')
    wind4El.setAttribute('style','background-color: var(--secondarycolor); color: var(--mainbackgroundcolor); font-weight: bold;')
    wind4El.textContent = 'Wind: '+JSON.parse(localStorage.getItem('wind4'))+'MPH'
    hum4El = document.createElement('h2')
    hum4El.setAttribute('style','background-color: var(--secondarycolor); color: var(--mainbackgroundcolor); font-weight: bold;')
    hum4El.textContent = 'Humidity: '+JSON.parse(localStorage.getItem('humidity4'))+' %'

    //append card 4 elements
    cardEl4.appendChild(forecastDate4)
    cardEl4.appendChild(icon4)
    cardEl4.appendChild(temp4El)
    cardEl4.appendChild(wind4El)
    cardEl4.appendChild(hum4El)



    //Card 5
    var cardEl5 = document.createElement('card')
    cardEl5.setAttribute('class','card my2 align-items-center')
    cardEl5.setAttribute('style','width: 18rem; background-color: var(--secondarycolor);')

    //card elements
    forecastDate5 = document.createElement('h4')
    forecastDate5.textContent = JSON.parse(localStorage.getItem('date5'))
    forecastDate5.setAttribute('style','background-color: var(--secondarycolor); color: var(--mainbackgroundcolor); font-weight: bold;')
    icon5 = document.createElement('img')
    icon5.setAttribute('src','https://openweathermap.org/img/wn/'+JSON.parse(localStorage.getItem('weathericon5'))+'@2x.png')
    icon5.setAttribute('style',"width: 50px; background-color: var(--secondarycolor);")
    temp5El = document.createElement('h2')
    temp5El.setAttribute('style','background-color: var(--secondarycolor); color: var(--mainbackgroundcolor); font-weight: bold;')
    temp5El.textContent = 'Temp: '+JSON.parse(localStorage.getItem('temperature5'))+'°F'
    wind5El = document.createElement('h2')
    wind5El.setAttribute('style','background-color: var(--secondarycolor); color: var(--mainbackgroundcolor); font-weight: bold;')
    wind5El.textContent = 'Wind: '+JSON.parse(localStorage.getItem('wind5'))+'MPH'
    hum5El = document.createElement('h2')
    hum5El.setAttribute('style','background-color: var(--secondarycolor); color: var(--mainbackgroundcolor); font-weight: bold;')
    hum5El.textContent = 'Humidity: '+JSON.parse(localStorage.getItem('humidity5'))+' %'

    //append card 5 elements
    cardEl5.appendChild(forecastDate5)
    cardEl5.appendChild(icon5)
    cardEl5.appendChild(temp5El)
    cardEl5.appendChild(wind5El)
    cardEl5.appendChild(hum5El)

    //append cards
    divEl.appendChild(cardEl1)
    divEl.appendChild(cardEl2)
    divEl.appendChild(cardEl3)
    divEl.appendChild(cardEl4)
    divEl.appendChild(cardEl5)
}
    
function removeData () {
    var currentForecastEl = document.querySelector('.currentDivEl')
    var forecastEl = document.querySelector('.DivEl')
        
    if (typeof currentForecastEl !== 'undefined' && currentForecastEl !== null) {
        currentForecastEl.remove();                            
    }
    if (typeof forecastEl !== 'undefined' && forecastEl !== null) {
        forecastEl.remove();
    }

    //reset variables from local storage
    localStorage.setItem('latitude', '')
    localStorage.setItem('longitude', '')
    localStorage.setItem('name', '')
    localStorage.setItem('temperature1','')
    localStorage.setItem('wind1','')
    localStorage.setItem('humidity1','')
    localStorage.setItem('date1','')
    localStorage.setItem('weathericon1','')
    localStorage.setItem('temperature2','')
    localStorage.setItem('wind2','')
    localStorage.setItem('humidity2','')
    localStorage.setItem('date2','')
    localStorage.setItem('weathericon2','')
    localStorage.setItem('temperature3','')
    localStorage.setItem('wind3','')
    localStorage.setItem('humidity3','')
    localStorage.setItem('date3','')
    localStorage.setItem('weathericon3','')
    localStorage.setItem('temperature4','')
    localStorage.setItem('wind4','')
    localStorage.setItem('humidity4','')
    localStorage.setItem('date4','')
    localStorage.setItem('weathericon4','')
    localStorage.setItem('temperature5','')
    localStorage.setItem('wind5','')
    localStorage.setItem('humidity5','')
    localStorage.setItem('date5','')
    localStorage.setItem('weathericon5','')
    localStorage.setItem('currentTemperature','')
    localStorage.setItem('currentWind','')
    localStorage.setItem('currentHum','')
    localStorage.setItem('currentDate','')
    localStorage.setItem('currentIcon','')
}

function searchHistory (userName) {
    var searchHistoryEl = document.querySelector('.searchHistoryEl')
    var removeSearchEl = document.querySelector('.removeSearchEl')
    if (typeof searchHistoryEl == 'undefined' || searchHistoryEl == null) {
        var searchHistoryEl = document.createElement('div')
        searchHistoryEl.setAttribute('class','d-flex flex-row searchHistoryEl')
        document.body.appendChild(searchHistoryEl)                         
    }

    x = userName.split(' ')
    userNameUse = x.join('-')
    userNameUse = userNameUse.toLowerCase()

    //if statement - only create button if the userNameUse does not exist in a search button already
    if (!document.querySelector('.search.btn.'+userNameUse)) {
        console.log('this button does not exist yet')
        var userSearches = document.createElement('button')
        userSearches.setAttribute('class','search btn '+userNameUse)
        userSearches.textContent = userName
        searchHistoryEl.appendChild(userSearches)
    } else {
        console.log('This button exist already')
    }
    
    if (typeof removeSearchEl == 'undefined' || removeSearchEl == null) {
        var removeSearchEl = document.createElement('button')
        removeSearchEl.setAttribute('class','removeSearchEl btn')
        removeSearchEl.textContent = 'Clear History'
        document.body.appendChild(removeSearchEl)
    }
    
    var searchBtn = document.querySelector('.'+userNameUse)
    if (searchBtn) {
        searchBtn.addEventListener('click',function () {
            fetchAPI(userName)
        }) 
    }
}



