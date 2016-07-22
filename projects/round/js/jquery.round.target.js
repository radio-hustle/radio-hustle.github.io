!function (o) {
    "use strict";
    function e(t, a, n) {
        t.addClass("zoomTarget"), n.animationendcallback || (n.closeclick ? n.animationendcallback = function () {
            o(".selectedZoomTarget").removeClass("selectedZoomTarget zoomNotClickable"), t.addClass("selectedZoomTarget")
        } : n.animationendcallback = function () {
            o(".selectedZoomTarget").removeClass("selectedZoomTarget zoomNotClickable"), t.addClass("selectedZoomTarget zoomNotClickable")
        });
        var c = a.closest(".zoomContainer");
        0 !== c.length && (n.root = c);
        var l = n.root;
        if (!l.hasClass("zoomTarget")) {
            var r = l.zoomSettings({});
            r.animationendcallback = function () {
                var e = o(this);
                o(".selectedZoomTarget").removeClass("selectedZoomTarget zoomNotClickable"), e.addClass("selectedZoomTarget zoomNotClickable"), e.parent().addClass("selectedZoomTarget zoomNotClickable")
            }, e(l, l, r), e(l.parent(), l, r), l.click()
        }
        t.on("click", function (o) {
            n.closeclick && a.hasClass("selectedZoomTarget") ? n.root.click() : a.zoomTo(n), o.stopPropagation()
        })
    }

    function t() {
        function o(o) {
            var e = "-webkit-touch-callout: " + (o ? "default" : "none") + ";";
            return a.forEachPrefix(function (t) {
                e += t + "user-select:" + (o ? "text" : "none") + ";"
            }, !0), e
        }

        var e = document.createElement("style");
        e.type = "text/css", e.innerHTML = ".zoomTarget{" + o(!1) + "}.zoomTarget:hover{cursor:pointer!important;}.zoomNotClickable{" + o(!0) + "}.zoomNotClickable:hover{cursor:auto!important;}.zoomContainer{position:relative;padding:1px;margin:-1px;}", document.getElementsByTagName("head")[0].appendChild(e)
    }

    o.zoomooz || (o.zoomooz = {});
    var a = o.zoomooz.helpers;
    o.fn.zoomTarget = function (t) {
        this.each(function () {
            var a = o(this).zoomSettings(t);
            e(o(this), o(this), a)
        })
    }, t(), o(document).ready(function () {
        o(".zoomTarget").zoomTarget()
    })
}(jQuery);