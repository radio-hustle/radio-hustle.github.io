function Matrix() {
}
var Sylvester = {version: "0.1.3", precision: 1e-6};
Matrix.prototype = {
    dup: function () {
        return Matrix.create(this.elements)
    }, canMultiplyFromLeft: function (e) {
        var t = e.elements || e;
        return "undefined" == typeof t[0][0] && (t = Matrix.create(t).elements), this.elements[0].length == t.length
    }, multiply: function (e) {
        var t = e.modulus ? !0 : !1, n = e.elements || e;
        if ("undefined" == typeof n[0][0] && (n = Matrix.create(n).elements), !this.canMultiplyFromLeft(n))return null;
        var l, i, r, s, h, u, m = this.elements.length, a = m, o = n[0].length, f = this.elements[0].length, d = [];
        do {
            l = a - m, d[l] = [], i = o;
            do {
                r = o - i, s = 0, h = f;
                do u = f - h, s += this.elements[l][u] * n[u][r]; while (--h);
                d[l][r] = s
            } while (--i)
        } while (--m);
        return n = Matrix.create(d), t ? n.col(1) : n
    }, isSquare: function () {
        return this.elements.length == this.elements[0].length
    }, toRightTriangular: function () {
        var e, t, n, l, i = this.dup(), r = this.elements.length, s = r, h = this.elements[0].length;
        do {
            if (t = s - r, 0 === i.elements[t][t])for (j = t + 1; j < s; j++)if (0 !== i.elements[j][t]) {
                e = [], n = h;
                do l = h - n, e.push(i.elements[t][l] + i.elements[j][l]); while (--n);
                i.elements[t] = e;
                break
            }
            if (0 !== i.elements[t][t])for (j = t + 1; j < s; j++) {
                var u = i.elements[j][t] / i.elements[t][t];
                e = [], n = h;
                do l = h - n, e.push(t >= l ? 0 : i.elements[j][l] - i.elements[t][l] * u); while (--n);
                i.elements[j] = e
            }
        } while (--r);
        return i
    }, determinant: function () {
        if (!this.isSquare())return null;
        var e, t = this.toRightTriangular(), n = t.elements[0][0], l = t.elements.length - 1, i = l;
        do e = i - l + 1, n *= t.elements[e][e]; while (--l);
        return n
    }, isSingular: function () {
        return this.isSquare() && 0 === this.determinant()
    }, augment: function (e) {
        var t = e.elements || e;
        "undefined" == typeof t[0][0] && (t = Matrix.create(t).elements);
        var n, l, i, r = this.dup(), s = r.elements[0].length, h = r.elements.length, u = h, m = t[0].length;
        if (h != t.length)return null;
        do {
            n = u - h, l = m;
            do i = m - l, r.elements[n][s + i] = t[n][i]; while (--l)
        } while (--h);
        return r
    }, inverse: function () {
        if (!this.isSquare() || this.isSingular())return null;
        var e, t, n, l, i, r, s, h = this.elements.length, u = h, m = this.augment(Matrix.I(h)).toRightTriangular(), a = m.elements[0].length, o = [];
        do {
            e = h - 1, i = [], n = a, o[e] = [], r = m.elements[e][e];
            do l = a - n, s = m.elements[e][l] / r, i.push(s), l >= u && o[e].push(s); while (--n);
            for (m.elements[e] = i, t = 0; e > t; t++) {
                i = [], n = a;
                do l = a - n, i.push(m.elements[t][l] - m.elements[e][l] * m.elements[t][e]); while (--n);
                m.elements[t] = i
            }
        } while (--h);
        return Matrix.create(o)
    }, setElements: function (e) {
        var t, n = e.elements || e;
        if ("undefined" != typeof n[0][0]) {
            var l, i, r, s = n.length, h = s;
            this.elements = [];
            do {
                t = h - s, l = n[t].length, i = l, this.elements[t] = [];
                do r = i - l, this.elements[t][r] = n[t][r]; while (--l)
            } while (--s);
            return this
        }
        var u = n.length, m = u;
        this.elements = [];
        do t = m - u, this.elements.push([n[t]]); while (--u);
        return this
    }
}, Matrix.create = function (e) {
    var t = new Matrix;
    return t.setElements(e)
}, Matrix.I = function (e) {
    var t, n, l, i = [], r = e;
    do {
        t = r - e, i[t] = [], n = r;
        do l = r - n, i[t][l] = t == l ? 1 : 0; while (--n)
    } while (--e);
    return Matrix.create(i)
};