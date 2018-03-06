"use strict";

const router = require("express").Router();
const sanitizer = require("sanitizer");

const Weatherstat = require("./../models/weatherstat");

router.get('/weather', function (req, res) {
    console.log(req.query);

    let weatherstat = new Weatherstat({
        temperature1: sanitizer.escape(req.query.temp1),
        temperature2: sanitizer.escape(req.query.temp2),
        humidity: sanitizer.escape(req.query.humidity),
        pressure: sanitizer.escape(req.query.pres),
        altitude: sanitizer.escape(req.query.alt),
        rain: sanitizer.escape(req.query.rain)
    });
    weatherstat.save(function (err, savedTemps) {
        if (err) return next(err);
    });

    res.json({"Message": "Succes!"});
});

router.get('/allWeatherStats', function (req, res) {

    Weatherstat.find(function (err, weatherstats) {
        if (err) return next(err); //Error wil get caught by error handler middleware
        else {
            Weatherstat.find().sort("date").exec((err, weatherstats) => {
                res.json(weatherstats)
            })
        }
    });
});

router.get('/allTemps', function (req, res) {
    Weatherstat.find(function (err, weatherstats) {
        if (err) return next(err); //Error wil get caught by error handler middleware
        else {
            Weatherstat.find({}, {temperature1: 1, temperature2: 1, date: 1, _id: 0}).sort("date").exec((err, tempstats) => {
                res.json(tempstats)
            })
        }
    });
});

router.get('/allRain', function (req, res) {
    Weatherstat.find(function (err, weatherstats) {
        if (err) return next(err); //Error wil get caught by error handler middleware
        else {
            Weatherstat.find({}, {rain: 1, date: 1, _id: 0}).sort("date").exec((err, rainstats) => {
                res.json(rainstats)
            })
        }
    });
});

router.get('/allHumidity', function (req, res) {
    Weatherstat.find(function (err, weatherstats) {
        if (err) return next(err); //Error wil get caught by error handler middleware
        else {
            Weatherstat.find({}, {humidity: 1, date: 1, _id: 0}).sort("date").exec((err, humiditystats) => {
                res.json(humiditystats)
            })
        }
    });
});

router.get('/allPressure', function (req, res) {
    Weatherstat.find(function (err, weatherstats) {
        if (err) return next(err); //Error wil get caught by error handler middleware
        else {
            Weatherstat.find({}, {pressure: 1, date: 1, _id: 0}).sort("date").exec((err, pressurestats) => {
                res.json(pressurestats)
            })
        }
    });
});

router.get('/allAltitude', function (req, res) {
    Weatherstat.find(function (err, weatherstats) {
        if (err) return next(err); //Error wil get caught by error handler middleware
        else {
            Weatherstat.find({}, {altitude: 1, date: 1, _id: 0}).sort("date").exec((err, altitudestats) => {
                res.json(altitudestats)
            })
        }
    });
});

router.get('/', function (req, res) {
    res.json({message: 'API Initialized!'});
});

module.exports = router;