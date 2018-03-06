"use strict";

$(() => {

    getWeatherInfo();

});

function getWeatherInfo() {
    $.ajax({
        url: "https://api.thingspeak.com/channels/352104/fields/6.json?results=1000",
        context: document.body,
        dataType: "json"
    }).done(function (result) {
        let feeds = result.feeds;
        var dataArray = [['Datum', 'Tijd', 'Regensterkte']];
        for (let i = 0; i < feeds.length; i++) {

            let dateTime = feeds[i].created_at.split("T");
            let date = dateTime[0];
            let time = dateTime[1].split(".")[0].substring(0, 3)+"00";

            dataArray.push([date, time, (1024 - parseInt(feeds[i].field6))/1024*100]);
        }
        groupByHour(dataArray, "Percentage %", "Regensterkte", 0);
        groupByDay(dataArray, "Percentage %", "Regensterkte", 0);
    });
}