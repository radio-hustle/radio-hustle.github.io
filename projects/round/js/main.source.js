/**
 * Created by tribunskiy on 16.07.2015.
 */
(function ($) {
    function animateRotate(selector, d){
        $({deg: 0}).animate({deg: d}, {
            step: function(now, fx){
                selector.css({
                    transform: "rotate(" + now + "deg)"
                });
            }
        });
    }

    var methods = {
        init: function (options) {
            var container = this.parent();

            var xWindowCenter = $(window).innerWidth() / 2;
            var yWindowCenter = $(window).innerHeight() / 2;

            var left = this.position().left;
            var top = this.position().top;
            container.animate({
                left: xWindowCenter - left - this.width() / 2,
                top: yWindowCenter -  top - this.height() / 2
            }, 2000, function() {});

            var transform = this.css('transform');
            console.log(transform);
            if (transform && transform != 'none') {
                var values = transform.split('(')[1].split(')')[0].split(',');
                console.log(123);
                animateRotate(container, -1 * Math.asin(values[1])    * (180 / Math.PI))
            }
        },
        show: function () {
        },
        hide: function () {
        },
        update: function (content) {
        }
    };

    $.fn.Round = function (method) {

        // логика вызова метода
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.Round');
        }
    };

})(jQuery);
