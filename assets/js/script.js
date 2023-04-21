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
                if (!response.ok) throw new Error('OOP');
        
        
                return response.json();
            })
            .then(function (data) {
                console.log('data :>>',data)
            }).catch(function (error) {
                console.log(error)
            })
    })
    .catch(function (error) {
        console.error(error);
    })

// var API_BASE_URL_FORECAST = 'api.openweathermap.org/data/2.5/forecast?'
// userLat = JSON.parse(localStorage.getItem('latitude'))
// userLon = JSON.parse(localStorage.getItem('longitude'))
// // fetch(API_BASE_URL_FORECAST + 'lat=' + userLat + '&lon=' + userLon + '&appid=c8bc3bcdb62723fa5a3408d73058eac9')
// fetch(API_BASE_URL_FORECAST + 'lat=' + userLat + '&lon=' + userLon + '&appid=c8bc3bcdb62723fa5a3408d73058eac9', {
//     mode: 'cors'
// })
//     .then(function (response) {
//         if (!response.ok) throw new Error('OOP');


//         response.json();
//     })
//     .then(function (data) {
//         console.log('data :>>',data)
//     }).catch(function (error) {
//         console.log(error)
//     })