const asyncMiddleware = require('../middleware/async');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Genre, validateGenre } = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    throw new Error('could not get the genres.');
    const genres = await Genre.find()
        .sort({ name: 1 });
    res.send(genres);
});

router.post('/', auth, async (req, res) => {
    const result = validateGenre(req.body);
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }
    let genre = new Genre({
        name: req.body.name
    });
    genre = await genre.save();
    res.send(genre);
});

router.put('/:id', auth, async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) {
        return res.status(404).send(error.details[0].message);
    }

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });

    if (!genre) {
        return res.status(404).send('the genre with the given id se not available');
    }

    res.send(genre);
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) {
        return res.status(404).send('the genre with the given id is not available');
    }
    res.send(genre);
});

router.get('/:id', auth, async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
        return res.status(404).send('the genre with the given id is not available');
    }
    res.send(genre);
});

module.exports = router;