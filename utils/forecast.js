const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=3962cf068cb8a867875cce1b6c4842d0&query=${latitude},${longitude}`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `It is ${body.current.weather_descriptions[0]}, the temperature is ${body.current.temperature} degrees celcius, but it feels like ${body.current.feelslike}.`);
        }
    })
}

module.exports = forecast;