const request = require('request')
// const geocode = require('geocode')

const forecast = (latitude, longitude, callback) => {
     const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=hourly,minutely,daily&units=metric&appid=2e1e251f838c85a4ce1b3f7a6f33e6fc'

     request({url: url , json: true}, (error, response) => {
          if(error){
             callback('Unable to connect to weather services', undefined)
          }else if (response.body.error){
            callback('Unable to connect to find location', undefined)
          }else{
              callback(undefined, response.body.current.temp + ' degrees Celcius ')
          }
   
     } )
}
module.exports = forecast
