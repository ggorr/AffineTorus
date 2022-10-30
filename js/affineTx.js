'use strict';
import Vector from "./vector.js";
const EPSILON = 1e-6;
function equals(x, y) {
    return x - EPSILON < y && y < x + EPSILON;
}
class AffineTx {
    constructor(m11, m21, m12, m22, a1, a2) {
        // [ m11 m12 a1 ]
        // [ m21 m22 a2 ]
        // [  0   0   1 ]
        this.m11 = m11;
        this.m21 = m21;
        this.m12 = m12;
        this.m22 = m22;
        this.a1 = a1;
        this.a2 = a2;
    }
    static translation(x, y) {
        return new AffineTx(1, 0, 0, 1, x, y);
    }
    static similarity(exp, angle, translX, translY) {
        const c = exp * Math.cos(angle);
        const s = exp * Math.sin(angle);
        return new AffineTx(c, -s, s, c, translX, translY);
    }
    get M11() { return this.m11; }
    get M21() { return this.m21; }
    get M12() { return this.m12; }
    get M22() { return this.m22; }
    get A1() { return this.a1; }
    get A2() { return this.a2; }
    rightMultBy(f) {
        this.a1 += this.m11 * f.a1 + this.m12 * f.a2;
        this.a2 += this.m21 * f.a1 + this.m22 * f.a2;
        let t11 = this.m11;
        let t21 = this.m21;
        this.m11 = t11 * f.m11 + this.m12 * f.m21;
        this.m21 = t21 * f.m11 + this.m22 * f.m21;
        this.m12 = t11 * f.m12 + this.m12 * f.m22;
        this.m22 = t21 * f.m12 + this.m22 * f.m22;
    }
    leftMultBy(f) {
        let s1 = this.a1;
        this.a1 = f.a1 + f.m11 * s1 + f.m12 * this.a2;
        this.a2 = f.a2 + f.m21 * s1 + f.m22 * this.a2;
        let t11 = this.m11;
        let t12 = this.m12;
        this.m11 = f.m11 * t11 + f.m12 * this.m21;
        this.m21 = f.m21 * t11 + f.m22 * this.m21;
        this.m12 = f.m11 * t12 + f.m12 * this.m22;
        this.m22 = f.m21 * t12 + f.m22 * this.m22;
    }
    getInverse() {
        let det = this.m11 * this.m22 - this.m12 * this.m21;
        return new AffineTx(this.m22 / det, -this.m21 / det, -this.m12 / det, this.m11 / det, (-this.m22 * this.a1 + this.m12 * this.a2) / det, (this.m21 * this.a1 - this.m11 * this.a2) / det);
    }
    transf(v) {
        return new Vector(this.M11 * v.X + this.M12 * v.Y + this.A1, this.M21 * v.X + this.M22 * v.Y + this.A2);
    }
    static transf(f, v) {
        return new Vector(f.M11 * v.X + f.M12 * v.Y + f.A1, f.M21 * v.X + f.M22 * v.Y + f.A2);
    }
    static mult(f, g) {
        return new AffineTx(f.m11 * g.m11 + f.m12 * g.m21, f.m21 * g.m11 + f.m22 * g.m21, f.m11 * g.m12 + f.m12 * g.m22, f.m21 * g.m12 + f.m22 * g.m22, f.a1 + f.m11 * g.a1 + f.m12 * g.a2, f.a2 + f.m21 * g.a1 + f.m22 * g.a2);
    }
    static inverse(f) {
        let det = f.m11 * f.m22 - f.m12 * f.m21;
        return new AffineTx(f.m22 / det, -f.m21 / det, -f.m12 / det, f.m11 / det, (-f.m22 * f.a1 + f.m12 * f.a2) / det, (f.m21 * f.a1 - f.m11 * f.a2) / det);
    }
    static commute(f, g) {
        let fg = AffineTx.mult(f, g);
        let gf = AffineTx.mult(g, f);
        return equals(fg.m11, gf.m11) && equals(fg.m21, gf.m21) && equals(fg.m12, gf.m12) && equals(fg.m22, gf.m22) &&
            equals(fg.a1, gf.a1) && equals(fg.a2, gf.a2);
    }
}
AffineTx.I = new AffineTx(1, 0, 0, 1, 0, 0);
export default AffineTx;
