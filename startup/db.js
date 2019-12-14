
const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function () {
    mongoose.connect('mongodb://localhost/vidly')
        .then(() => winston.info('connected to database'))

    // .then(() => console.log('connected to database'))
    // .catch(err => console.error('failed to connet to database'));
}