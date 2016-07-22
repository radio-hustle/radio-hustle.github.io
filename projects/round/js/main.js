!function (t) {
    function n(n, i) {
        t({deg: 0}).animate({deg: i}, {
            step: function (t, i) {
                n.css({transform: "rotate(" + t + "deg)"})
            }
        })
    }

    var i = {
        init: function (i) {
            var o = this.parent(), e = t(window).innerWidth() / 2, s = t(window).innerHeight() / 2, r = this.position().left, a = this.position().top;
            o.animate({left: e - r - this.width() / 2, top: s - a - this.height() / 2}, 2e3, function () {
            });
            var h = this.css("transform");
            if (console.log(h), h && "none" != h) {
                var p = h.split("(")[1].split(")")[0].split(",");
                console.log(123), n(o, -1 * Math.asin(p[1]) * (180 / Math.PI))
            }
        }, show: function () {
        }, hide: function () {
        }, update: function (t) {
        }
    };
    t.fn.Round = function (n) {
        return i[n] ? i[n].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof n && n ? void t.error("����� � ������ " + n + " �� ���������� ��� jQuery.Round") : i.init.apply(this, arguments)
    }
}(jQuery);