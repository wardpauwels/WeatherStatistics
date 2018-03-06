"use strict";

$(() => {

    getWeatherInfo();

});

function getWeatherInfo() {
    $.ajax({
        url: "https://api.thingspeak.com/channels/352104/fields/4.json?results=1000",
        context: document.body,
        dataType: "json"
    }).done(function (result) {
        let feeds = result.feeds;
        var dataArray = [['Datum', 'Tijd', 'Luchtdruk']];
        for (let i = 0; i < feeds.length; i++) {

            let dateTime = feeds[i].created_at.split("T");
            let date = dateTime[0];
            let time = dateTime[1].split(".")[0].substring(0, 3)+"00";

            dataArray.push([date, time, parseInt(feeds[i].field4)/1000]);
        }
        groupByHour(dataArray, "Bar b", "Luchtdruk", -2);
        groupByDay(dataArray, "Bar b", "Luchtdruk", -2);
    });
}