var _ = {
        cities: {},
        clubs: {},
        address: {
            "москва": [55.755826, 37.6173],
            "спб": [59.9342802, 30.335098600000038],
            "новосибирск": [55.00835259999999, 82.93573270000002],
            "киров": [58.6035321, 49.66679829999998],
            "красноярск": [56.01528339999999, 92.8932476],
            "саратов": [51.55637890000001, 45.979816700000015],
            "екатеринбург": [56.83892609999999, 60.60570250000001],
            "минск": [53.90453979999999, 27.561524400000053],
            "ростов-на-дону": [47.2357137, 39.701505],
            "барнаул": [53.3547792, 83.7697832],
            "омск": [54.9884804, 73.32423620000009],
            "тверь": [56.85872140000001, 35.917596499999945],
            "томск": [56.5010397, 84.99245059999998],
            "железногорск": [52.3332892, 35.36695510000004],
            "кемерово": [55.3450231, 86.06230440000002],
            "в.новгород": [58.52556980000001, 31.274192800000037],
            "новороссийск": [44.7154014, 37.76196690000006],
            "новокузнецк": [53.7595935, 87.12157049999996],
            "дубна": [56.7320202, 37.16689740000004],
            "курск": [51.7091957, 36.15622410000003],
            "ставрополь": [45.0454764, 41.96834309999997],
            "хабаровск": [48.5027313, 135.06625989999998],
            "иваново": [57.0050671, 40.97664529999997],
            "энгельс": [51.4753297, 46.11367730000006],
            "ялта": [44.49520500000001, 34.166300999999976],
            "краснодар": [45.03926740000001, 38.98722099999998],
            "павлодар": [52.2873032, 76.9674023],
            "тюмень": [57.1612975, 65.52501719999998],
            "таганрог": [47.2416334, 38.86760129999993],
            "владивосток": [43.1737387, 132.0064506],
            "клин": [56.3333816, 36.73044700000003],
            "абакан": [53.7175644, 91.42931720000001],
            "днк спб": [59.9342802, 30.335098600000038],
            "санкт-петербург": [59.9342802, 30.335098600000038],
            "выборг": [60.7139529, 28.757157099999972]
        },
        data: []
    },
    map,
    geoCoder,
    heatmap,
    heatmapOptions = {
        radius: 2,
        maxOpacity: 0.5,
        scaleRadius: true,
        useLocalExtrema: true
    };

function setMarker(a, i) {
    if (a[i] !== undefined) {
        if (_.address[a[i]] !== undefined) {
            var marker = new google.maps.Marker({
                map: map,
                position: {
                    lat: _.address[a[i]][0],
                    lng: _.address[a[i]][1]
                }
            });
            markers.count++;
            setMarker(a, i + 1);
        } else {
            geoCoder.geocode({address: a[i]}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location
                    });
                    markers.count++;
                } else {
                    console.log("Geocode was not successful for the following reason: " + status);
                }
                setTimeout(function () {
                    setMarker(a, i + 1);
                }, 750);
            })
        }
    }
}

function getRandomNumber(min, max) {
    return Math.random() * (max - min + 1) + min;
}

function randomFluctuation() {
    return getRandomNumber(-1, 1);
}

function createData() {
    var keys = Object.keys(_.address),
        data = [];
    for (var i = 0; i < keys.length; i++) {
        data.push({
            lat: _.address[keys[i]][0] + randomFluctuation(),
            lng: _.address[keys[i]][1] + randomFluctuation(),
            count: _.cities[keys[i]]
        })
    }
    return data;
}

function setHeatmap(options) {
    var settings = {
        "radius": options.radius,
        "maxOpacity": options.maxOpacity,
        // scales the radius based on map zoom
        "scaleRadius": options.scaleRadius,
        // if set to false the heatmap uses the global maximum for colorization
        // if activated: uses the data maximum within the current map boundaries
        //   (there will always be a red spot with useLocalExtremas true)
        "useLocalExtrema": options.useLocalExtrema,
        // which field name in your data represents the latitude - default "lat"
        latField: 'lat',
        // which field name in your data represents the longitude - default "lng"
        lngField: 'lng',
        // which field name in your data represents the data value - default "value"
        valueField: 'count'
    };

    if (heatmap === undefined) {
        heatmap = new HeatmapOverlay(map, settings);
    } else {
        heatmap.configure(settings);
    }

    heatmap.setData({
        data: createData()
    });
}

function loadData() {
    $.ajax({
        url: './data/classic.csv',
        success: function (data) {
            var clubs;
            data = data.split('\n');
            for (var i = 0; i < data.length; i++) {
                var currentD = data[i].split(';'),
                    club = currentD[2].replace(/^.*?\(/, '').replace(/\)$/i, '');
                clubs = club.split(',');
                for (var j = 0; j < clubs.length; j++) {
                    var city = clubs[j].match(/\(.*\)/i);
                    if (city === undefined || city === null) {
                        city = 'Москва';
                    } else {
                        city = city[0].replace(/\(|\)|(г\.\s*)/gmi, '');
                    }
                    city = city.toLowerCase();
                    _.clubs[clubs[j].toLowerCase()] = city;
                    var count = _.cities[city];
                    if (count === undefined) {
                        count = 1;
                    } else {
                        count++;
                    }
                    _.cities[city] = count;
                }
            }
            clubs = Object.keys(_.clubs).sort();
            for (var i = 0; i < clubs.length; i++) {
                $('#cities').append('<div>' + clubs[i] + ' -> ' + _.clubs[clubs[i]] + '</div>');
            }

            //setMarker(Object.keys(_.cities), 0);
            //if (markers.count == Object.keys(_.cities).length) {
            //    console.log('success');
            //}

            setHeatmap(heatmapOptions);
        }
    });
}

function onSliderUpdate() {
    var type = $(this).attr('data-type'),
        value = $(this).slider('value');

    switch (type) {
        case 'radius':
            heatmapOptions.radius = value;
            break;
    }

    setHeatmap(heatmapOptions);
}

function initMap() {
    $('#map').height($(window).height() - $('.header').height() - $('.footer').height());

    geoCoder = new google.maps.Geocoder();
    var mapOptions = {
        center: new google.maps.LatLng(60, 100),
        zoom: 3,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

$(document).ready(function () {
    initMap();

    loadData();

    $('.heatmap-slider[data-type="radius"]').slider({
        //range: true,
        min: 0,
        max: 20,
        value: 2,
        slide: onSliderUpdate
    });
});