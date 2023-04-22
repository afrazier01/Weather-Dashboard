var dateEl = document.querySelector('#date-main')
var date = dayjs().format('dddd, MMMM D, YYYY h:mm A')
dateEl.textContent = date

var API_BASE_URL = 'http://api.openweathermap.org/geo/1.0/direct?q='
//make sure this variable can be parsed properly
var userSearch = 'London'
fetch(API_BASE_URL + userSearch + '&appid=c8bc3bcdb62723fa5a3408d73058eac9')
    .then(function (res) {
        if (!res.ok) throw new Error('OOP');
        
        return res.json();
    })
    .then(function (data) {
        userName = data[0].name;
        userLat = data[0].lat;
        userLon = data[0].lon;
        userLat = userLat.toString();
        userLon = userLon.toString()
        console.log('Name :>>', userName);
        console.log('Latitude :>>', userLat);
        console.log('Longitude :>>', userLon);
        //Have to set variables to local storage so they can be retrieved elsewhere
        localStorage.setItem('latitude', JSON.stringify(userLat))
        localStorage.setItem('longitude',JSON.stringify(userLon))
        localStorage.setItem('name',JSON.stringify(userName))

        //second call
        var API_BASE_URL_FORECAST = 'https://api.openweathermap.org/data/2.5/forecast?'
        fetch(API_BASE_URL_FORECAST + 'lat=' + userLat + '&lon=' + userLon + '&appid=c8bc3bcdb62723fa5a3408d73058eac9')
            .then(function (response) {
                if (!response.ok) throw new Error('oops');
        
        
                return response.json();
            })
            .then(function (data) {
                console.log(data)
                storeData (data)
            }).catch(function (error) {
                console.log(error)
            })
    })
    .catch(function (error) {
        console.error(error);
    })

    function storeData (data) {
        //Forecast for 1st day
        temp1 = data.list[2].main.temp
        wind1 = data.list[2].wind.speed
        hum1 = data.list[2].main.humidity
        date1 = data.list[2].dt
        icon1 = data.list[2].weather[0].icon

        date1 = dayjs(date1*1000).format('M/D/YYYY')

        console.log('1st temperature :>>',temp1)
        console.log('1st wind speed :>>',wind1)
        console.log('1st humidity :>>',hum1)
        console.log('1st unix time :>>',date1)
        console.log('1st icon time :>>',icon1)

        localStorage.setItem('temperature1',JSON.stringify(temp1))
        localStorage.setItem('wind1',JSON.stringify(wind1))
        localStorage.setItem('humidity1',JSON.stringify(hum1))
        localStorage.setItem('date1',JSON.stringify(date1))
        localStorage.setItem('weathericon1',JSON.stringify(icon1))
        //Forecast for 2nd day
        temp2 = data.list[10].main.temp
        wind2 = data.list[10].wind.speed
        hum2 = data.list[10].main.humidity
        date2 = data.list[10].dt

        console.log('2nd temperature :>>',temp2)
        console.log('2nd wind speed :>>',wind2)
        console.log('2nd humidity :>>',hum2)
        console.log('2nd unix time :>>',date2)

        localStorage.setItem('temperature2',JSON.stringify(temp2))
        localStorage.setItem('wind2',JSON.stringify(wind2))
        localStorage.setItem('humidity2',JSON.stringify(hum2))
        localStorage.setItem('date2',JSON.stringify(date2))
        //Forecast for 3rd day
        temp3 = data.list[18].main.temp
        wind3 = data.list[18].wind.speed
        hum3 = data.list[18].main.humidity
        date3 = data.list[18].dt

        console.log('3rd temperature :>>',temp3)
        console.log('3rd wind speed :>>',wind3)
        console.log('3rd humidity :>>',hum3)
        console.log('3rd unix time :>>',date3)

        localStorage.setItem('temperature3',JSON.stringify(temp3))
        localStorage.setItem('wind3',JSON.stringify(wind3))
        localStorage.setItem('humidity3',JSON.stringify(hum3))
        localStorage.setItem('date3',JSON.stringify(date3))
        //Forecast for 4th day
        temp4 = data.list[26].main.temp
        wind4 = data.list[26].wind.speed
        hum4 = data.list[26].main.humidity
        date4 = data.list[26].dt

        console.log('4th temperature :>>',temp4)
        console.log('4th wind speed :>>',wind4)
        console.log('4th humidity :>>',hum4)
        console.log('4th unix time :>>',date4)

        localStorage.setItem('temperature4',JSON.stringify(temp4))
        localStorage.setItem('wind4',JSON.stringify(wind4))
        localStorage.setItem('humidity4',JSON.stringify(hum4))
        localStorage.setItem('date4',JSON.stringify(date4))
        //Forecast for 5th day
        temp5 = data.list[34].main.temp
        wind5 = data.list[34].wind.speed
        hum5 = data.list[34].main.humidity
        date5 = data.list[34].dt

        console.log('5th temperature :>>',temp5)
        console.log('5th wind speed :>>',wind5)
        console.log('5th humidity :>>',hum5)
        console.log('5th unix time :>>',date5)

        localStorage.setItem('temperature5',JSON.stringify(temp5))
        localStorage.setItem('wind5',JSON.stringify(wind5))
        localStorage.setItem('humidity5',JSON.stringify(hum5))
        localStorage.setItem('date5',JSON.stringify(date5))
    }

renderForecast()
function renderForecast () {
    //Card 1
    var cardEl1 = document.createElement('card')
    cardEl1.setAttribute('class','card my2')
    cardEl1.setAttribute('style','width: 18rem;')

    //card elements
    forecastDate1 = document.createElement('h2')
    forecastDate1.textContent = JSON.parse(localStorage.getItem('date1'))

    //weather icon, temperature, wind, and humidity

    //append elements
    cardEl1.appendChild(forecastDate1)
    
    //Card 2
    var cardEl2 = document.createElement('card')
    cardEl2.setAttribute('class','card my2')
    cardEl2.setAttribute('style','width: 18rem;')
    forecastDate2 = document.createElement('h2')
    forecastDate2.textContent = JSON.parse(localStorage.getItem('date2'))
    cardEl2.appendChild(forecastDate2)
    document.body.appendChild(cardEl2)
    //Card 3
    var cardEl3 = document.createElement('card')
    cardEl3.setAttribute('class','card my2')
    cardEl3.setAttribute('style','width: 18rem;')
    forecastDate3 = document.createElement('h2')
    forecastDate3.textContent = JSON.parse(localStorage.getItem('date3'))
    cardEl3.appendChild(forecastDate3)
    //Card 4
    var cardEl4 = document.createElement('card')
    cardEl4.setAttribute('class','card my2')
    cardEl4.setAttribute('style','width: 18rem;')
    forecastDate4 = document.createElement('h2')
    forecastDate4.textContent = JSON.parse(localStorage.getItem('date4'))
    cardEl4.appendChild(forecastDate4)
    //Card 5
    var cardEl5 = document.createElement('card')
    cardEl5.setAttribute('class','card my2')
    cardEl5.setAttribute('style','width: 18rem;')
    forecastDate5 = document.createElement('h2')
    forecastDate5.textContent = JSON.parse(localStorage.getItem('date5'))
    cardEl5.appendChild(forecastDate5)
    //append cards
    document.body.appendChild(cardEl1)
    document.body.appendChild(cardEl2)
    document.body.appendChild(cardEl3)
    document.body.appendChild(cardEl4)
    document.body.appendChild(cardEl5)

    // <div class="card my-2" id='card1' style="width: 18rem;">
    //             <img src="..." class="card-img-top" alt="...">
    //             <div class="card-body">
    //                 <h3>date</h3>
    //               <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    //             </div>
    
}
