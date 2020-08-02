const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: String,
    description: String,
    images: String,
    price: Number,
    stock: Number
})

module.exports = mongoose.model('products', productSchema)