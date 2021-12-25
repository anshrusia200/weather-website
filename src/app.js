const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { query } = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express() // configue server with express function
const port = process.env.PORT || 3000

//Defin paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup stsaic directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ansh Rusia'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Ansh Rusia'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Ansh Rusia',
        errorMessage : 'Page not found'
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ansh Rusia',
        errorMessage : 'Page not found'
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
           error: 'You must provide a search term' 
        })
    }
    
    res.send({
        products : []
    })
    console.log(req.query.search)
}) 

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide a address'
        })
    }
     
    geocode(req.query.address , (error, data) =>{
        if(error){
            return res.send({error})
        } 
        
        forecast(data.latitude, data.longitude, (error, forecastData) => {

          if(error){
              return res.send({error})
          }
           
          res.send({
              location: data.location,
              Weather : forecastData
            })
     
           
        })
})
    
    // res.send({
    //    address: req.query.address 
    // })
})

app.get('*',(req,res) => {
     res.render('404', {
         title: '404',
         name: 'Ansh rusia',
         errorMessage: 'Page not found'
     })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})