const request = require('request');

const geoCode = (adress, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(adress)}.json?types=address&access_token=pk.eyJ1IjoiY2hyaXN0b2ZmZXJneWxpbiIsImEiOiJjbDBpN2EycDkwMWEzM2RwaHNoN3VlMXdyIn0.o3Uw_19NPR2_Hjx0lOFQWA&limit=1`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback(`Unable to connect to location services`, undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geoCode;