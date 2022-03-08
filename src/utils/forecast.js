const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ef332f4e70a02f506238daabc45e9e46&query=' + latitude + ',' + longitude + '&units=m'

    request({ url, json: true}, (error, { body } = {} ) => {
        if (error) {
            callback('Unable to connect to weather service!')
        }
        else if(body.error) {
            callback('Unable to find location, please try again.', undefined)
        }
        else {
            callback(undefined, 'Weather is ' + body.current.weather_descriptions[0] + '.'
            + ' ' + 'Currently ' + body.current.temperature + ' degrees. Feels like ' + body.current.feelslike + ' degrees.')
        }
    })
}

module.exports = forecast