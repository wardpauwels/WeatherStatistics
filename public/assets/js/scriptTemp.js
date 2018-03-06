"use strict";

$(() => {

    getWeatherInfo();

});

function getWeatherInfo() {
    $.ajax({
        url: "https://api.thingspeak.com/channels/352104/fields/1.json?results=1000",
        context: document.body,
        dataType: "json"
    }).done(function (result) {
        let feedsTemp1 = result.feeds;
        $.ajax({
            url: "https://api.thingspeak.com/channels/352104/fields/2.json?results=1000",
            context: document.body,
            dataType: "json"
        }).done(function (result) {
            let feedsTemp2 = result.feeds;
            var dataArray = [['Datum', 'Tijd', 'Temperatuur']];
            for (let i = 0; i < feedsTemp1.length; i++) {

                let dateTime = feedsTemp1[i].created_at.split("T");
                let date = dateTime[0];
                let time = dateTime[1].split(".")[0].substring(0, 3) + "00";

                dataArray.push([date, time, ((parseInt(feedsTemp1[i].field1) + parseInt(feedsTemp2[i].field2)) / 2)]);
            }
            groupByHour(dataArray, "Graden Celsius°C", "Temperatuur", -10);
            groupByDay(dataArray, "Graden Celsius°C", "Temperatuur", -10);
        })
    });
}