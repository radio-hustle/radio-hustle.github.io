$.zoomooz || ($.zoomooz = {}), $.zoomooz.helpers = function (o, r) {
    "use strict";
    var n = ["-moz-", "-webkit-", "-o-", "-ms-"];
    return r.forEachPrefix = function (o, r) {
        for (var e = 0; e < n.length; e++)o(n[e]);
        r && o("")
    }, r.getElementTransform = function (n) {
        var e;
        return r.forEachPrefix(function (r) {
            e = e || o(n).css(r + "transform")
        }, !0), e
    }, r
}(jQuery, {});