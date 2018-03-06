'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WeatherStatSchema = Schema({
    temperature1: {type: String},
    temperature2: {type: String},
    humidity: {type: String},
    pressure: {type: String},
    altitude: {type: String},
    rain: {type: Number},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Weatherstat', WeatherStatSchema);