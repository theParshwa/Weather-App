const path = require('path')
const express = require('express')
const fs = require('fs')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const request = require('request')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../views')
const partialsPath = path.join(__dirname, '../partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs') //To set handlebars
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather', 
        name: 'Parshwa Pasoba'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me', 
        name: 'Parshwa Pasoba'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help', 
        helpText: 'This page will help you with anything you need.',
        name: 'Parshwa Pasoba'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!res.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Parshwa Pasoba',
        errorMessage: 'Help article not found'
    })
})

app.get('/about/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Parshwa Pasoba',
        errorMessage: 'About article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Parshwa Pasoba',
        errorMessage: '404 Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000')
})


















//This is changed into html files
// app.get('', (req, res) => {
//     res.send('<h1> Weather </h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Parshwa'        
//     }, {
//         name: 'Kara'
//     }])
// })


// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

// app.get('/weather', (req, res) => {
//     res.send({
//         forecast: 'It is sunny',
//         location: 'Hyderabad'
//     })
// })