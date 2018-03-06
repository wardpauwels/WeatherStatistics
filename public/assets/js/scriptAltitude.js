"use strict";

$(() => {

    getWeatherInfo();

});

function getWeatherInfo() {
    $.ajax({
        url: "https://api.thingspeak.com/channels/352104/fields/5.json?results=1000",
        context: document.body,
        dataType: "json"
    }).done(function (result) {
        let feeds = result.feeds;
        var dataArray = [['Datum', 'Tijd', 'Hoogte']];
        for (let i = 0; i < feeds.length; i++) {

            let dateTime = feeds[i].created_at.split("T");
            let date = dateTime[0];
            let time = dateTime[1].split(".")[0].substring(0, 3)+"00";

            dataArray.push([date, time, parseInt(feeds[i].field5)]);
        }
        groupByHour(dataArray, "Meter m", "Hoogte", -50);
        groupByDay(dataArray, "Meter m", "Hoogte", -50);
    });
}