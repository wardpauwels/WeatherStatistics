"use strict";

$(() => {

    getWeatherInfo();

});

function getWeatherInfo() {
    $.ajax({
        url: "https://api.thingspeak.com/channels/352104/feeds.json?results=1",
        context: document.body,
        dataType: "json"
    }).done(function (result) {
        makeWeatherBoxes(result);
    });
}