const express = require('express')
const productModel = require('../models/product.model')

const router = express.Router()

// getting all products
router.get('/', (req, res, next) => {
    productModel.find()
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({
                message: 'Internel server error'
            })
        })
})

// getting single product by id
router.get('/:id', (req, res, next) => {
    const productId = req.params.id
    productModel.findOne({ _id: productId })
        .exec()
        .then(result => {
            if (result == null) {
                res.status(401).json({
                    message: 'No record found'
                })
            } else {
                res.status(200).json(result)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Internel server error',
                error: err
            })
        })
})

// adding new product
router.post('/', (req, res, next) => {
    newProduct = new productModel({
            name: req.body.name,
            description: req.body.description,
            images: req.body.images,
            price: req.body.price,
            stock: req.body.stock
        })
        .save()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({
                message: 'Internal server error',
                err: err
            })
        })
})

// change product stock
router.put('/:id/:changeStock', (req, res, next) => {
    const productId = req.params.id
    const changeStock = req.params.changeStock
    console.log(changeStock)
    productModel.findOne({ _id: productId })
        .exec()
        .then(result => {
            if (result == null) {
                res.status(401).json({
                    message: 'No record found'
                })
            } else {
                currentStock = result.stock
                console.log(currentStock)
                productModel.findByIdAndUpdate(productId, { stock: (currentStock - changeStock) })
                    .exec()
                    .then(result => {
                        res.status(200).json(result)
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: 'Error chaning stock',
                            error: err
                        })
                    })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Internel server error',
                error: err
            })
        })
})

module.exports = router