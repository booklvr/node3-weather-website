// const express = require('express');
// const path = require('path');
// const hbs = require('hbs');
// const geocode = require('./utils/geocode');
// const forecast = require('./utils/forecast');

const   express     = require('express'),
        path        = require('path'),
        hbs         = require('hbs'),
        geocode     = require('./utils/geocode'),
        forecast    = require('./utils/forecast');

const app = express();
const port =

//define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index' ,{
        title: 'Weather App',
        name: 'Nick'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Nick',
    });
});

app.get("/help", (req, res) => {
    res.render('help', {
        title: 'HELP!',
        name: 'Nick',
        message: 'help me i guess...'
    });
});

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address',
        });
    }
    geocode(req.query.address, (error, {latitude, longitude, location } = {}  ) => {
        if (error) {
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address,

            });
        });
    });


    // res.send({
    //     address: req.query.address,
    //     forecast: 'It is snowing',
    //     location: 'Busan',
    // });
});

app.get('/products', (req, res) => {

    if(!req.query.search) {
        return res.send({
            error: "You must provide a search term",
        });
    }

    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'Error 404',
        name: 'Nick',
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title:'Error 404',
        name: 'Nick',
        errorMessage: 'Page not found'
    });
});




const PORT = process.env.PORT || 8080;
app.listen(PORT, process.env.IP, () => {
    console.log(`App listening to ${PORT}....`);
    console.log('Press Ctrl+C to quit');
});
