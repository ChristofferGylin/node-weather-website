const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const geoCode = require('../utils/geoCode');
const forecast = require('../utils/forecast');


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Chrissy Burnout'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Chrissy Burnout'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpMsg: 'This is a very helpful message. It will help you in all your future endeavours.',
        name: 'Chrissy Burnout'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.adress) {
        return res.send({
            error: 'You must provide an adress.'
        });
    }

    geoCode(req.query.adress, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location: location,
                adress: req.query.adress
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        });
    }

    console.log(req.query);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Chrissy Burnout',
        errorMessage: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Chrissy Burnout',
        errorMessage: 'Page not found.'
    });
});


app.listen(3000, () => {
    console.log('Server is up on port 3000');
});

