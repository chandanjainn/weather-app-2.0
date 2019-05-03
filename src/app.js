require('dotenv').config();
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('../public/js/utils/geoCode');
const forecast = require('../public/js/utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const PORT = process.env.PORT;

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Chandan Jain'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Chandan Jain'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		helpText: 'This is some helpful text.',
		title: 'Help',
		name: 'Chandan Jain'
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({ error: 'You must provide a location' });
	}

	geoCode(req.query.address, (geoCodeError, geoCodeResponse) => {
		if (geoCodeError) {
			return res.send({ error: geoCodeError });
		}
		forecast(geoCodeResponse, (forecastError, forecastResponse) => {
			if (forecastError) {
				return res.send({ error: forecastError });
			}
			res.send({
				forecast: forecastResponse.summary,
				longitude: geoCodeResponse.longitude,
				latitude: geoCodeResponse.latitude,
				location: geoCodeResponse.location,
				address: req.query.address,
				temperature: forecastResponse.temperature
			});
		});
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Chandan Jain',
		errorMessage: 'Help article not found.'
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Chandan Jain',
		errorMessage: 'Page not found.'
	});
});

app.listen(PORT, () => {
	console.log('Server is up on port' + PORT);
});
