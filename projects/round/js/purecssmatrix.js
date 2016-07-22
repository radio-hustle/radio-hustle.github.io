PureCSSMatrix = function () {
    "use strict";
    function t(t) {
        t && null !== t && "none" != t ? t instanceof Matrix ? this.setMatrix(t) : this.setMatrixValue(t) : this.m = Matrix.I(3)
    }

    function e(t) {
        var e = parseFloat(r(t));
        return t.match(n) && (e = 2 * Math.PI * e / 360), e
    }

    function r(t) {
        return t.match(i)
    }

    function a(t) {
        return Number(t).toFixed(6)
    }

    var n = /deg$/, i = /([0-9.\-e]+)/g, o = /([a-zA-Z]+)\(([^\)]+)\)/g;
    return t.prototype.setMatrix = function (t) {
        this.m = t
    }, t.prototype.setMatrixValue = function (t) {
        for (var a, n = Matrix.I(3); null !== (a = o.exec(t));) {
            var i, s = a[1].toLowerCase(), l = a[2].split(",");
            if ("matrix" == s)i = Matrix.create([[parseFloat(l[0]), parseFloat(l[2]), parseFloat(r(l[4]))], [parseFloat(l[1]), parseFloat(l[3]), parseFloat(r(l[5]))], [0, 0, 1]]); else if ("translate" == s)i = Matrix.I(3), i.elements[0][2] = parseFloat(r(l[0])), i.elements[1][2] = parseFloat(r(l[1])); else if ("scale" == s) {
                var u, p = parseFloat(l[0]);
                u = l.length > 1 ? parseFloat(l[1]) : p, i = Matrix.create([[p, 0, 0], [0, u, 0], [0, 0, 1]])
            } else"rotate" == s ? i = Matrix.RotationZ(e(l[0])) : "skew" == s || "skewx" == s ? (i = Matrix.I(3), i.elements[0][1] = Math.tan(e(l[0]))) : "skewy" == s ? (i = Matrix.I(3), i.elements[1][0] = Math.tan(e(l[0]))) : console.log("Problem with setMatrixValue", s, l);
            n = n.multiply(i)
        }
        this.m = n
    }, t.prototype.multiply = function (e) {
        return new t(this.m.multiply(e.m))
    }, t.prototype.inverse = function () {
        return Math.abs(this.m.elements[0][0]) < 1e-6 && (this.m.elements[0][0] = 0), new t(this.m.inverse())
    }, t.prototype.translate = function (e, r) {
        var a = Matrix.I(3);
        return a.elements[0][2] = e, a.elements[1][2] = r, new t(this.m.multiply(a))
    }, t.prototype.scale = function (e, r) {
        var a = Matrix.create([[e, 0, 0], [0, r, 0], [0, 0, 1]]);
        return new t(this.m.multiply(a))
    }, t.prototype.rotate = function (e) {
        var r = Matrix.RotationZ(e);
        return new t(this.m.multiply(r))
    }, t.prototype.toString = function () {
        var t = this.m.elements, e = "";
        return ($.browser.mozilla || $.browser.opera) && (e = "px"), "matrix(" + a(t[0][0]) + ", " + a(t[1][0]) + ", " + a(t[0][1]) + ", " + a(t[1][1]) + ", " + a(t[0][2]) + e + ", " + a(t[1][2]) + e + ")"
    }, t.prototype.elements = function () {
        var t = this.m.elements;
        return {a: t[0][0], b: t[1][0], c: t[0][1], d: t[1][1], e: t[0][2], f: t[1][2]}
    }, t
}();