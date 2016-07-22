!function (n) {
    "use strict";
    function r(n, r, t) {
        var a = {};
        if (y.forEachPrefix(function (r) {
                a[r + "transform"] = n
            }, !0), r) {
            var e = h(r / 1e3, 6) + "s";
            a["-webkit-transition-duration"] = e, a["-o-transition-duration"] = e, a["-moz-transition-duration"] = e
        }
        if (t) {
            var i = o(t);
            a["-webkit-transition-timing-function"] = i, a["-o-transition-timing-function"] = i, a["-moz-transition-timing-function"] = i
        }
        return a
    }

    function t(n, r, t, i, o, s) {
        r || (r = e(new PureCSSMatrix)), M = (new Date).getTime(), g && (clearInterval(g), g = null), i.easing && (i.easingfunction = u(i.easing, i.duration)), a(n, r, t, i, o), s && s(), g = setInterval(function () {
            a(n, r, t, i, o)
        }, 1)
    }

    function a(n, t, a, e, o) {
        var u, s = (new Date).getTime() - M;
        u = e.easingfunction ? e.easingfunction(s / e.duration) : s / e.duration, n.css(r(i(l(t, a, u)))), s > e.duration && (clearInterval(g), g = null, u = 1, o && o())
    }

    function e(n) {
        var r = n.elements(), t = r.a, a = r.b, e = r.c, i = r.d, o = r.e, u = r.f;
        if (Math.abs(t * i - a * e) < .01)return void console.log("fail!");
        var s = o, f = u, c = Math.sqrt(t * t + a * a);
        t /= c, a /= c;
        var v = t * e + a * i;
        e -= t * v, i -= a * v;
        var l = Math.sqrt(e * e + i * i);
        e /= l, i /= l, v /= l, 0 > t * i - a * e && (t = -t, a = -a, e = -e, i = -i, c = -c, l = -l);
        var h = Math.atan2(a, t);
        return {tx: s, ty: f, r: h, k: Math.atan(v), sx: c, sy: l}
    }

    function i(n) {
        var r = "";
        return r += "translate(" + h(n.tx, 6) + "px," + h(n.ty, 6) + "px) ", r += "rotate(" + h(n.r, 6) + "rad) skewX(" + h(n.k, 6) + "rad) ", r += "scale(" + h(n.sx, 6) + "," + h(n.sy, 6) + ")"
    }

    function o(n) {
        return n instanceof Array ? "cubic-bezier(" + h(n[0], 6) + "," + h(n[1], 6) + "," + h(n[2], 6) + "," + h(n[3], 6) + ")" : n
    }

    function u(n, r) {
        var t = [];
        if (n instanceof Array)t = n; else switch (n) {
            case"linear":
                t = [0, 0, 1, 1];
                break;
            case"ease":
                t = [.25, .1, .25, 1];
                break;
            case"ease-in":
                t = [.42, 0, 1, 1];
                break;
            case"ease-out":
                t = [0, 0, .58, 1];
                break;
            case"ease-in-out":
                t = [.42, 0, .58, 1]
        }
        var a = function (n) {
            return s(n, t[0], t[1], t[2], t[3], r)
        };
        return a
    }

    function s(n, r, t, a, e, i) {
        function o(n) {
            return ((l * n + h) * n + m) * n
        }

        function u(n) {
            return ((M * n + g) * n + d) * n
        }

        function s(n) {
            return (3 * l * n + 2 * h) * n + m
        }

        function f(n) {
            return 1 / (200 * n)
        }

        function c(n, r) {
            return u(v(n, r))
        }

        function v(n, r) {
            function t(n) {
                return n >= 0 ? n : 0 - n
            }

            var a, e, i, u, f, c;
            for (i = n, c = 0; 8 > c; c++) {
                if (u = o(i) - n, t(u) < r)return i;
                if (f = s(i), t(f) < 1e-6)break;
                i -= u / f
            }
            if (a = 0, e = 1, i = n, a > i)return a;
            if (i > e)return e;
            for (; e > a;) {
                if (u = o(i), t(u - n) < r)return i;
                n > u ? a = i : e = i, i = .5 * (e - a) + a
            }
            return i
        }

        var l = 0, h = 0, m = 0, M = 0, g = 0, d = 0;
        return m = 3 * r, h = 3 * (a - r) - m, l = 1 - m - h, d = 3 * t, g = 3 * (e - t) - d, M = 1 - d - g, c(n, f(i))
    }

    function f(n, r) {
        var t, a = y.getElementTransform(n);
        t = a ? new PureCSSMatrix(a) : new PureCSSMatrix, r && (t = t.translate(r.x, r.y));
        var i = e(t);
        return i.r = c(a), i
    }

    function c(n) {
        for (var r, t = 0; null !== (r = b.exec(n));) {
            var a = r[1].toLowerCase(), i = r[2].split(",");
            if ("matrix" == a) {
                var o = a + "(" + r[2] + ")";
                t += e(new PureCSSMatrix(o)).r
            } else if ("rotate" == a) {
                var u = i[0], s = parseFloat(m(u));
                u.match(w) && (s = 2 * Math.PI * s / 360), t += s
            }
        }
        return t
    }

    function v(n, r) {
        if (Math.abs(n.r - r.r) > Math.PI)if (r.r < n.r)for (; Math.abs(n.r - r.r) > Math.PI;)r.r += 2 * Math.PI; else for (; Math.abs(n.r - r.r) > Math.PI;)r.r -= 2 * Math.PI;
        return r
    }

    function l(n, r, t) {
        var a = {};
        for (var e in n)n.hasOwnProperty(e) && (a[e] = n[e] + (r[e] - n[e]) * t);
        return a
    }

    function h(n, r) {
        r = Math.abs(parseInt(r, 10)) || 0;
        var t = Math.pow(10, r);
        return Math.round(n * t) / t
    }

    function m(n) {
        return n.match(x)
    }

    var M, g, d, x = /([0-9.\-e]+)/g, b = /([a-z]+)\(([^\)]+)\)/g, w = /deg$/, y = n.zoomooz.helpers, P = {
        duration: 450,
        easing: "ease",
        nativeanimation: !1
    };
    jQuery.cssHooks.MsTransform = {
        set: function (n, r) {
            n.style.msTransform = r
        }
    }, jQuery.cssHooks.MsTransformOrigin = {
        set: function (n, r) {
            n.style.msTransformOrigin = r
        }
    }, n.fn.animateTransformation = function (a, o, u, s, c) {
        o = jQuery.extend({}, P, o), d && (clearTimeout(d), d = null), o.nativeanimation && s && (d = setTimeout(s, o.duration)), this.each(function () {
            var l = n(this);
            a || (a = new PureCSSMatrix);
            var h = f(l, u), m = v(h, e(a));
            o.nativeanimation ? (l.css(r(i(m), o.duration, o.easing)), c && c()) : t(l, h, m, o, s, c)
        })
    }, n.fn.setTransformation = function (t) {
        this.each(function () {
            var a = n(this), o = f(a), u = v(o, e(t));
            a.css(r(i(u)))
        })
    }
}(jQuery);