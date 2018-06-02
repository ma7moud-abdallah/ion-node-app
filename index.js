const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const http = require('http')

const config = require('./config/config')

const productRoute = require('./routes/products')


mongoose.connect(config.database,err => {
    if(!err) return console.log('connected')
    console.log('connection error ')
})



const app = express()


app.listen(config.port,()=> console.log('app works'))

app.use(cors())

// use body-parser to read data 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

app.use('/products',productRoute)










