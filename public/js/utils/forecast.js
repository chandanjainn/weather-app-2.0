const request = require('request');

const forecast = (geoCodeResponse, callback) => {
	const token = '53511e9a3600bf44737a6b00060cd77b';
	const url =
		'https://api.darksky.net/forecast/' +
		token +
		'/' +
		geoCodeResponse.latitude +
		',' +
		geoCodeResponse.longitude +
		'?units=si';

	request({ url, json: true }, (error, { body } = {}) => {
		if (error) {
			callback('Unable to connect to weather service', undefined);
		} else if (body.error) {
			callback(body.error, undefined);
		} else {
			callback(undefined, {
				summary: body.hourly.summary,
				temperature: body.currently.temperature
			});
		}
	});
};

module.exports = forecast;
