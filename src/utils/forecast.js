//darksky api key: 9f4efb561a20f8340d378bc7a557a1dc
const request = require ('request');

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/9f4efb561a20f8340d378bc7a557a1dc/${lat},${long}?units=si`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service');
        } else if (body.error) {
            callback('unable to find location');
        } else {
            const temp = body.currently.temperature;
            const precipProbability = body.currently.precipProbability;
            const summary = body.daily.data[0].summary;
            const high = body.daily.data[0].temperatureHigh;
            const low = body.daily.data[0].temperatureLow;
            const today = `${summary} It is currently ${temp} degrees out.  There is ${precipProbability}% chance of rain.  There will be a a high of ${high} degrees and a low of ${low} degrees.`;
            callback(undefined, today);
        }
    });
};

module.exports = forecast;
