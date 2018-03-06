"use strict";

$(() => {

    getWeatherInfo();

});

function getWeatherInfo() {
    $.ajax({
        url: "https://api.thingspeak.com/channels/352104/fields/3.json?results=1000",
        context: document.body,
        dataType: "json"
    }).done(function (result) {
        let feeds = result.feeds;
        let dataArray = [['Datum', 'Tijd', 'Luchtvochtigheid']];
        for (let i = 0; i < feeds.length; i++) {

            let dateTime = feeds[i].created_at.split("T");
            let date = dateTime[0];
            let time = dateTime[1].split(".")[0].substring(0, 3)+"00";

            dataArray.push([date, time, parseInt(feeds[i].field3)]);
        }
        groupByHour(dataArray, "Percentage %", "Luchtvochtigheid", 0);
        groupByDay(dataArray, "Percentage %", "Luchtvochtigheid", 0);
    });
}