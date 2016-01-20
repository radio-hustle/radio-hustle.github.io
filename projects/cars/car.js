var _gl = {
    routes: [
        'Москва, метро Лубянка',
        'Москва, метро Охотный ряд',
        'Москва, метро Тверская',
        'Москва, метро Площадь Революции',
        'Москва, метро метро Бибилиотека им. Ленина',
        'Москва, метро Тургеневская',
        'Москва, метро Трубная',
        'Москва, метро Арбатская',
        'Москва, метро Красные Ворота',
        'Москва, метро Кропоткинская'
    ]
};

var map, cars = {};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomRoute(length) {
    if (length === undefined || length < 2) {
        length = 2;
    }
    var route = [], points = [].concat(_gl.routes);
    for (var i = 0; i < length; i++) {
        var rand = getRandomInt(0, points.length - 1),
            el = points[rand];
        points.splice(rand, 1);
        if (i !== 0 && i !== length - 1) {
            route.push({
                type: 'viaPoint',
                point: el
            });
        } else {
            route.push(el);
        }
    }
    return route;
}

function makeCarID() {
    for (var r = "", a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", t = 0; 10 > t; t++)r += a.charAt(Math.floor(Math.random() * a.length));
    return r;
}

function startCar(car, route) {
    var routeArray = [].concat(route);
    car = new Car({
        iconLayout: ymaps.templateLayoutFactory.createClass(
            '<div class="circle" style="transform: rotate($[properties.direction]deg)"></div>'
        )
    });

    ymaps.route(route, {
        mapStateAutoApply: false // автоматически позиционировать карту
    }).then(function (route) {
        route.getPaths().options.set({
            strokeColor: '00000000',
            opacity: 0
        });
        route.getViaPoints().options.set({
            opacity: 0,
            visible: false
        });
        route.getWayPoints().options.set({
            opacity: 0,
            visible: false
        });
        // Задание контента меток в начальной и конечной точках
        var points = route.getWayPoints();

        points.get(0).properties.set("iconContent", "А");
        points.get(1).properties.set("iconContent", "Б");

        // Добавление маршрута на карту
        map.geoObjects.add(route);
        // И "машинку" туда же
        map.geoObjects.add(car);

        // Отправляем машинку по полученному маршруту простым способом
        // car.moveTo(route.getPaths().get(0).getSegments());
        // или чуть усложненным: с указанием скорости,
        car.moveTo(route.getPaths().get(0).getSegments(), {
            speed: 40,
            directions: 8
        }, function (geoObject, coords, direction) { // тик движения
            // перемещаем машинку
            geoObject.geometry.setCoordinates(coords);
            // ставим машинке правильное направление - в данном случае меняем ей текст
            geoObject.properties.set('direction', direction.t);

        }, function (geoObject) { // приехали
            geoObject.options.set({
                visible: false
            });
            var newRoute = getRandomRoute(getRandomInt(2, 4));
            newRoute.unshift(routeArray[routeArray.length - 1]);
            newRoute[1] = {
                type: 'viaPoint',
                point: newRoute[1]
            };
            startCar(car, newRoute);
        });

    }, function (error) {
        console.error("Возникла ошибка: " + error.message);
    });
}

ymaps.ready(function () {
    "use strict";

    window.map = new ymaps.Map("map", {
        center: [55.753659, 37.620669],
        zoom: 14
    }, {
        searchControlProvider: 'yandex#search'
    });
    for (var i = 0; i < 1; i++) {
        startCar(cars[makeCarID()], getRandomRoute(getRandomInt(2, 4)));
    }
});