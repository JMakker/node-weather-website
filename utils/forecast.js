const request = require('postman-request');

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=5387bc026b24c86d12ed95ea61115c72&query='+latitude + ',' + longitude;

    request({
        url,
        json: true
    }, (error, {body} = {})=>{
        // console.log(response);
        if(error){
            callback(error, undefined)
        }else if (body.error){
            callback(body.error, undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0] +". It is currently " + body.current.temperature +" degrees but it feels like " + body.current.feelslike)
        }
    });
}

module.exports = forecast