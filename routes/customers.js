const { Customer, validateCustomer } = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort({ name: 1 });
    res.send(customers);
});

router.post('/', async (req, res) => {
    const result = validateCustomer(req.body);
    if (result.error)
        return res.status(400).send(result.error.details[0].message);
    let customers = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    customers = await customers.save();
    res.send(customers);
});

router.put('/:id', async (req, res) => {
    const result = validateCustomer(req.body);
    if (result.error)
        return res.status(404).send(result.error.details[0].message);
    const customers = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    }, { new: true });
    if (!customers)
        return res.status(404).send('the customer with the with id is not available');
    res.send(customers);
});

router.delete('/:id', async (req, res) => {
    const customers = await Customer.findByIdAndRemove(req.body.id);
    if (!customers)
        return res.status(404).send('the customer with the with id is not available');
    res.send(customers);
});

router.get('/:id', async (req, res) => {
    const customers = await Customer.findById(req.body.id);
    if (!customers)
        return res.status(404).send('the customer with the with id is not available');
    res.send(customers);
});

module.exports = router 