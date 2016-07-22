!function (e) {
    "use strict";
    function t(t, o) {
        var r = jQuery.extend({}, o);
        e.zoomooz.defaultSettings || e.zoomooz.setup();
        var n, a = e.zoomooz.defaultSettings, l = jQuery.extend({}, r);
        for (n in a)a.hasOwnProperty(n) && !l[n] && (l[n] = t.data(n));
        for (var i = 0; i < v.length; i++)n = v[i], l[n] || (l[n] = t.data(n));
        return jQuery.extend({}, a, l)
    }

    function o() {
        var t = document.createElement("style");
        t.type = "text/css";
        var o = "";
        h.forEachPrefix(function (e) {
            o += e + "transform-origin: 0 0;"
        }, !0), t.innerHTML = "html {height:100%;}.noScroll{overflow:hidden !important;}* {" + o + "}", document.getElementsByTagName("head")[0].appendChild(t), e(document).ready(function () {
            var o = window.innerWidth - e("body").width();
            t.innerHTML += "body.noScroll,html.noScroll body{margin-right:" + o + "px;}"
        })
    }

    function r() {
        var t = {
            targetsize: .9,
            scalemode: "both",
            root: e(document.body),
            debug: !1,
            animationendcallback: null,
            closeclick: !1
        }, o = void 0 !== window.mozInnerScreenX;
        return t.scrollresetbeforezoom = o, t
    }

    function n(t, o) {
        var r, n = o.scrollresetbeforezoom, d = null;
        !function () {
            var e = o.root, i = e.parent();
            t[0] === e[0] ? d = a(e, i) : e.data("original-scroll") ? n || (d = a(e, i)) : (r = !0, d = l(e, i, n))
        }();
        var u, f = null;
        i(o.root);
        var m = null;
        if (t[0] !== o.root[0]) {
            var p = c(t, o.root).inverse();
            n || (m = d), u = s(t, p, m, o), o.animationendcallback && (f = function () {
                o.animationendcallback.call(t[0])
            })
        } else n && (u = (new PureCSSMatrix).translate(-d.x, -d.y)), f = function () {
            var r = e(o.root), a = d.elem;
            a.removeClass("noScroll"), r.setTransformation(new PureCSSMatrix), r.data("original-scroll", null), e(document).off("touchmove"), n && (a[0] == document.body || a[0] == window ? window.scrollTo(d.x, d.y) : (a.scrollLeft(d.x), a.scrollTop(d.y))), o.animationendcallback && o.animationendcallback.call(t[0])
        };
        var h = null;
        n && d && d.animationstartedcallback && (h = d.animationstartedcallback), r || (m = !1), e(o.root).animateTransformation(u, o, m, f, h)
    }

    function a(e, t) {
        var o = e.data("original-scroll");
        return o || (o = {elem: t, x: 0, "y:": 0}), o
    }

    function l(t, o, r) {
        var n = t.scrollTop(), a = t.scrollLeft(), l = t;
        n || (n = o.scrollTop(), a = o.scrollLeft(), l = o);
        var i = {elem: l, x: a, y: n};
        t.data("original-scroll", i), e(document).on("touchmove", function (e) {
            e.preventDefault()
        });
        var s = "translate(-" + a + "px,-" + n + "px)";
        return h.forEachPrefix(function (e) {
            t.css(e + "transform", s)
        }), l.addClass("noScroll"), r && (i.animationstartedcallback = function () {
            l[0] == document.body || l[0] == document ? window.scrollTo(0, 0) : (l.scrollLeft(0), l.scrollTop(0))
        }), i
    }

    function i(t) {
        var o = e(t).parent(), r = o.width(), n = o.height(), a = r / 2, l = n / 2, i = m(a) + "px " + m(l) + "px";
        h.forEachPrefix(function (e) {
            t.css(e + "transform-origin", i)
        })
    }

    function s(t, o, r, n) {
        var a, l = n.targetsize, i = n.scalemode, s = n.root, d = e(s).parent(), u = d.width(), f = d.height(), c = u / t.outerWidth(), m = f / t.outerHeight();
        if ("width" == i)a = l * c; else if ("height" == i)a = l * m; else if ("both" == i)a = l * Math.min(c, m); else {
            if ("scale" != i)return void console.log("wrong zoommode");
            a = l
        }
        var p = (u - t.outerWidth() * a) / 2, h = (f - t.outerHeight() * a) / 2, v = u / 2, g = f / 2, b = -parseFloat(s.css("margin-left")) || 0, y = -parseFloat(s.css("margin-top")) || 0, x = new PureCSSMatrix;
        return r && (x = x.translate(r.x, r.y)), x.translate(b, y).translate(-v, -g).translate(p, h).scale(a, a).multiply(o).translate(v, g)
    }

    function d(e, t, o) {
        return [e.a * t + e.c * o + e.e, e.b * t + e.d * o + e.f]
    }

    function u(e, t) {
        var o = c(e, t.root).elements();
        f(d(o, 0, 0)), f(d(o, 0, e.outerHeight())), f(d(o, e.outerWidth(), e.outerHeight())), f(d(o, e.outerWidth(), 0))
    }

    function f(t) {
        var o = "width:4px;height:4px;background-color:red;position:absolute;margin-left:-2px;margin-top:-2px;";
        o += "left:" + t[0] + "px;top:" + t[1] + "px;";
        var r = '<div class="debuglabel" style="' + o + '"></div>';
        e("#debug").append(r)
    }

    function c(t, o) {
        var r = t[0];
        if (!r || !r.ownerDocument)return null;
        var n, a = new PureCSSMatrix;
        if (r === r.ownerDocument.body) {
            var l = jQuery.offset.bodyOffset(r);
            return n = new PureCSSMatrix, n = n.translate(l.left, l.top), a = a.multiply(n)
        }
        var i;
        jQuery.offset.initialize ? (jQuery.offset.initialize(), i = {
            fixedPosition: jQuery.offset.supportsFixedPosition,
            doesNotAddBorder: jQuery.offset.doesNotAddBorder,
            doesAddBorderForTableAndCells: jQuery.support.doesAddBorderForTableAndCells,
            subtractsBorderForOverflowNotVisible: jQuery.offset.subtractsBorderForOverflowNotVisible
        }) : i = jQuery.support;
        var s, d, u = r.offsetParent, f = r.ownerDocument, c = f.documentElement, m = f.body, h = o[0], v = f.defaultView;
        d = v ? v.getComputedStyle(r, null) : r.currentStyle;
        var g = r.offsetTop, b = r.offsetLeft, y = p().translate(b, g);
        for (y = y.multiply(p(r)), a = y.multiply(a); (r = r.parentNode) && r !== h && (g = 0, b = 0, !i.fixedPosition || "fixed" !== d.position);)s = v ? v.getComputedStyle(r, null) : r.currentStyle, g -= r.scrollTop, b -= r.scrollLeft, r === u && (g += r.offsetTop, b += r.offsetLeft, !i.doesNotAddBorder || i.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(r.nodeName) || (g += parseFloat(s.borderTopWidth) || 0, b += parseFloat(s.borderLeftWidth) || 0), u = r.offsetParent), i.subtractsBorderForOverflowNotVisible && "visible" !== s.overflow && (g += parseFloat(s.borderTopWidth) || 0, b += parseFloat(s.borderLeftWidth) || 0), d = s, r.offsetParent == h && (g -= parseFloat(e(r.offsetParent).css("margin-top")) || 0, b -= parseFloat(e(r.offsetParent).css("margin-left")) || 0), y = p().translate(b, g), y = y.multiply(p(r)), a = y.multiply(a);
        g = 0, b = 0, ("relative" === d.position || "static" === d.position) && (g += m.offsetTop, b += m.offsetLeft), i.fixedPosition && "fixed" === d.position && (g += Math.max(c.scrollTop, m.scrollTop), b += Math.max(c.scrollLeft, m.scrollLeft));
        var x = (new PureCSSMatrix).translate(b, g);
        return a = a.multiply(x)
    }

    function m(e) {
        return Number(e).toFixed(6)
    }

    function p(e) {
        var t = h.getElementTransform(e);
        return t ? new PureCSSMatrix(t) : new PureCSSMatrix
    }

    var h = e.zoomooz.helpers, v = ["duration", "easing", "nativeanimation"];
    o(), e.zoomooz || (e.zoomooz = {}), e.zoomooz.setup = function (t) {
        e.zoomooz.defaultSettings = jQuery.extend(r(), t)
    }, e.fn.zoomSettings = function (o) {
        var r = null;
        return this.each(function () {
            var n = e(this);
            r = t(n, o)
        }), r
    }, e.fn.zoomTo = function (t, o) {
        return this.each(function () {
            var r = e(this);
            o || (t = r.zoomSettings(t)), n(r, t), t.debug ? (0 === e("#debug").length ? e(t.root).append('<div id="debug"><div>') : e("#debug").html(""), u(r, t)) : 0 !== e("#debug").length && e("#debug").html("")
        }), this
    }
}(jQuery);