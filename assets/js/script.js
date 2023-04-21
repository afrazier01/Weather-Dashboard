var dateEl = document.querySelector('#date')
var date = dayjs().format('dddd, MMMM D, YYYY h:mm A')
dateEl.textContent = date

var API_BASE_URL = 'http://api.openweathermap.org/geo/1.0/direct?q='
//make sure this vairable can be parsed properly
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
                if (!response.ok) throw new Error('OOPs');
        
        
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
        temp1 = data.list[3].main.temp
        wind1 = data.list[3].wind.speed
        hum1 = data.list[3].main.humidity
        date1 = data.list[3].dt

        console.log('1st temperature :>>',temp1)
        console.log('1st wind speed :>>',wind1)
        console.log('1st humidity :>>',hum1)
        console.log('1st unix time :>>',date1)

        localStorage.setItem('temperature1',JSON.stringify(temp1))
        localStorage.setItem('wind1',JSON.stringify(wind1))
        localStorage.setItem('humidity1',JSON.stringify(hum1))
        localStorage.setItem('date1',JSON.stringify(date1))
        //Forecast for 2nd day

        //Forecast for 3rd day

        //Forecast for 4th day

        //Forecast for 5th day

    }

renderForecast()
function renderForecast () {
    var timeEl = document.querySelector('#time')
    time1 = JSON.parse(localStorage.getItem('date1'))
    timeEl.textContent = time1
}
