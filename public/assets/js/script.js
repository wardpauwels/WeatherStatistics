'use strict';

function makeWeatherBoxes(weatherStats) {
    let feeds = weatherStats.feeds;

    let latestStats = feeds[feeds.length - 1];

    setLatestUpdateTime(latestStats.created_at);
    setTemperatureBox((parseInt(latestStats.field1) + parseInt(latestStats.field2)) / 2);
    setRainBox(latestStats.field6);
    setHumidityBox(latestStats.field3);
    setPressureBox(latestStats.field4);
    setAltitudeBox(latestStats.field5);
}

function setLatestUpdateTime(time) {
    let dateTime = time.split("T");
    $('#latestUpdateInfo').html("<p>Laatst geüpdatet op: " + dateTime[0] + " om: " + dateTime[1].split("Z")[0] + " GMT</p>");
}

function setTemperatureBox(temp) {
    let temperature = Math.round(temp * 100) / 100;
    let image = "temp";
    if (temperature <= 10) {
        image += "0";
    } else if (temperature <= 15) {
        image += "1";
    } else if (temperature <= 21) {
        image += "2";
    } else {
        image += "3";
    }
    makeBox("Temperatuur", temperature, image);
}

function setRainBox(rain) {
    rain = 1024 - rain;
    let rainPercentage = Math.round((parseInt(rain) / 1024 * 100) * 100) / 100;
    let image = "rain";
    if (rainPercentage <= 10) {
        image += "0";
    } else if (rainPercentage <= 35) {
        image += "1";
    } else if (rainPercentage <= 50) {
        image += "2";
    } else if (rainPercentage <= 60) {
        image += "3";
    } else if (rainPercentage <= 70) {
        image += "4";
    } else {
        image += "5";
    }

    makeBox("Regensterkte", rainPercentage, image);
}

function setAltitudeBox(altitude) {
    let image = "height";
    if (altitude <= 5) {
        image += "0";
    } else if (altitude <= 20) {
        image += "1";
    } else if (altitude <= 50) {
        image += "2";
    } else {
        image += "3";
    }
    makeBox("Hoogte", altitude, image);
}

function setPressureBox(pressure) {
    let barPressure = Math.round((parseInt(pressure) / 1000) * 100) / 100;
    let image = "pressure";
    if (barPressure <= 0.700) {
        image += "0";
    } else if (barPressure <= 0.900) {
        image += "1";
    } else if (barPressure <= 1.100) {
        image += "2";
    } else if (barPressure <= 1.300) {
        image += "3";
    } else {
        image += "4";
    }
    makeBox("Druk", barPressure, image);
}

function setHumidityBox(humidity) {
    let image = "humidity";
    if (humidity <= 33) {
        image += "0";
    } else if (humidity <= 66) {
        image += "1";
    } else {
        image += "2";
    }
    makeBox("Luchtvochtigheid", humidity, image);
}

function makeBox(h2, text, image) {
    $('#' + h2 + '>h2').html(h2);
    $('#' + h2 + '>img').attr("src", "assets/images/weathericons/" + image + ".svg").attr(h2, "alt");
    $('#' + h2 + '>p>span').html(text);
}

function makeChart(resultset, yAxisTitle, lastDays, hoursOrDays, minimumOfchart) {

    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable(resultset);

        var options = {
            title: lastDays + ' de laatste ' + hoursOrDays,
            hAxis: {title: 'Tijd', titleTextStyle: {color: '#333'}},
            vAxis: {title: yAxisTitle, minValue: minimumOfchart}
        };

        var chart;
        if (hoursOrDays === "dagen") {
            chart = new google.visualization.AreaChart(document.getElementById('chartDays'));
        } else {
            chart = new google.visualization.AreaChart(document.getElementById('chartHours'));
        }
        chart.draw(data, options);
    }
}

function groupByHour(dataArray, size1, size2, minimum) {
    let dateData = [];
    let amountData = new Array(20).fill(0);
    let totalData = new Array(20).fill(0);
    let newDataArray = [[dataArray[0][1], dataArray[0][2]]];

    for (let i = 1; i < dataArray.length; i++) {
        let index = dateData.indexOf(dataArray[i][1]);
        if (index === -1) {
            dateData.push(dataArray[i][1]);
            index = dateData.indexOf(dataArray[i][1]);
        }
        amountData[index] += 1;
        totalData[index] += parseInt(dataArray[i][2]);
    }
    for (let i = 0; i < dateData.length; i++) {
        newDataArray.push([dateData[i], (parseInt(totalData[i]) / parseInt(amountData[i]))]);
    }

    makeChart(newDataArray, size1, size2, "uren", minimum);
}

function groupByDay(dataArray, size1, size2, minimum) {
    let dateData = [];
    let amountData = new Array(20).fill(0);
    let totalData = new Array(20).fill(0);
    let newDataArray = [[dataArray[0][0], dataArray[0][2]]];

    for (let i = 1; i < dataArray.length; i++) {
        let index = dateData.indexOf(dataArray[i][0]);
        if (index === -1) {
            dateData.push(dataArray[i][0]);
            index = dateData.indexOf(dataArray[i][0]);
        }
        amountData[index] += 1;
        totalData[index] += parseInt(dataArray[i][2]);
    }
    for (let i = 0; i < dateData.length; i++) {
        newDataArray.push([dateData[i], (parseInt(totalData[i]) / parseInt(amountData[i]))]);
    }

    makeChart(newDataArray, size1, size2, "dagen", minimum);
}
