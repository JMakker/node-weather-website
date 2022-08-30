const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname,'../public/index.html'))

const app = express()
const port = process.env.PORT || 3000

//define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index', {
        title : "Weather",
        name : "Jeroen"
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title : "About me",
        name : "Jeroen"
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title : "Help",
        helpText: "This text isn't helping!",
        name : "Jeroen"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide a address"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error});
        }else{
            // console.log('Data', data);
            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({error})
                }else{ 
                    return res.send({
                        forecast: forecastData,
                        location : location,
                        address: req.query.address
                    })
                }
            })
            
        }
    })
    
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }
    // req.query()
    res.send({
        products: []
    })
})

app.get("./help/*", (req, res) => {
    res.render('404', {
        title : "404 page doesn't exists",
        textMessage : "Article not found!",
        name : "Jeroen"
    })
    res.send("Article not found!")
})

app.get('*', (req, res) => {
    res.render('404', {
        title : "404",
        textMessage: "Page not found.",
        name : "Jeroen"
    })
    // res.send("my 404 page")
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + ".")
})