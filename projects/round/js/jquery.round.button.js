!function (n) {
    function o(o, r) {
        var e = t(), u = jQuery.extend({}, r);
        for (var a in e)e.hasOwnProperty(a) && !u[a] && (e[a]instanceof jQuery ? u[a] = n(o.data(a)) : u[a] = o.data(a));
        return jQuery.extend({}, e, u)
    }

    function t() {
        return {type: "next", root: n(document.body), wrap: "true"}
    }

    function r(n, o) {
        n.addClass("zoomButton");
        var t;
        t = o.root.hasClass("zoomContainer") ? o.root : o.root.find(".zoomContainer");
        var r = function () {
            function n(n) {
                return a.indexOf(n)
            }

            function o(o) {
                var t = n(o) + 1;
                return t < a.length && 0 !== t ? a[t] : null
            }

            function r(o) {
                var t = n(o) - 1;
                return 0 > t ? null : a[t]
            }

            function e() {
                return a[0]
            }

            function u() {
                return a[a.length - 1]
            }

            var a = jQuery.makeArray(t.find(".zoomTarget"));
            return {next: o, prev: r, last: u, first: e}
        }();
        n.on("click", function (n) {
            var e, u = !0, a = t.find(".selectedZoomTarget");
            0 === a.length && (a = r.first()), 0 === o.type.indexOf("prev") ? (e = r.prev(a[0]), null === e && (o.wrap ? e = r.last() : u = !1)) : (e = r.next(a[0]), null === e && (o.wrap ? e = r.first() : u = !1)), u && e.click(), n.stopPropagation()
        })
    }

    n.zoomooz || (n.zoomooz = {});
    n.zoomooz.helpers;
    n.fn.zoomButton = function (t) {
        this.each(function () {
            var e = o(n(this), t);
            r(n(this), e)
        })
    }, n(document).ready(function () {
        n(".zoomButton").zoomButton()
    })
}(jQuery);