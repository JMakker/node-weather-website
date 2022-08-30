const request = require('postman-request');


const geocode = (address, callback) => {
    const url = 'https://api.maptiler.com/geocoding/[' + encodeURIComponent(address) + '].json?key=uX98QDVyhxgaVITfN6kA'
    request({
        url,
        json : true
    }, (error, {body} = {}) =>{
        // console.log(response.body)
        if(error){
           callback(error, undefined)
        }else if (body.features.length === 0){
            callback("Could not find location", undefined)
        }else{
            callback(undefined ,{
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode