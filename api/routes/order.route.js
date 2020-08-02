const express = require('express')
const orderModel = require('../models/order.model')

const router = express.Router()

// getting all orders
router.get('/', (req, res, next) => {
    orderModel.find()
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

// getting single order by id
router.get('/:id', (req, res, next) => {
    const orderId = req.params.id
    orderModel.findOne({ _id: orderId })
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
    newOrder = new orderModel({
            total: req.body.total,
            prodcuts: req.body.products
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

module.exports = router