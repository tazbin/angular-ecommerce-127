const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const productRoute = require('./routes/product.route')
const orderRoute = require('./routes/order.route')

const app = express()
const port = 3000
app.use(bodyParser.json())

// databse connection
mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.on('connected', function() {
    console.log('connection established...')
});

mongoose.connection.on('error', function(err) {
    console.log('error encountered: ' + err)
});

// routes
app.use('/products', productRoute)
app.use('/orders', orderRoute)

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Getting response from api'
    })
})

app.listen(port, () => {
    console.log(`app listening to port ${port}...`)
})