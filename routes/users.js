const { User, validateUser } = require('../models/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) { return res.status(400).send(error.details[0].message) };

    let user = await User.findOne({ email: req.body.email });
    if (user) { return res.status(400).send('user already exist'); }

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user = await user.save();

    res.send(_.pick(user, ['id', 'name', 'email']));
    // res.send({
    //     name: user.name,
    //     email: user.email
    // });
});

module.exports = router;