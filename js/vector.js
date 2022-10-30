"use strict";
class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    copy() {
        return new Vector(this.x, this.y);
    }
    get X() { return this.x; }
    get Y() { return this.y; }
    neg() {
        this.x = -this.x;
        this.y = -this.y;
    }
    addBy(v) {
        this.x += v.x;
        this.y += v.y;
    }
    subBy(v) {
        this.x -= v.x;
        this.y -= v.y;
    }
    mulBy(d) {
        this.x *= d;
        this.y *= d;
    }
    transfBy(f) {
        let tx = this.x;
        this.x = f.M11 * tx + f.M12 * this.y + f.A1;
        this.y = f.M21 * tx + f.M22 * this.y + f.A2;
    }
    static neg(v) {
        return new Vector(-v.x, -v.y);
    }
    static add(v, w) {
        return new Vector(v.x + w.x, v.y + w.y);
    }
    static sub(v, w) {
        return new Vector(v.x - w.x, v.y - w.y);
    }
    static mul(d, v) {
        return new Vector(d * v.x, d * v.y);
    }
    static transf(f, v) {
        return new Vector(f.M11 * v.X + f.M12 * v.Y + f.A1, f.M21 * v.X + f.M22 * v.Y + f.A2);
    }
}
Vector.ZERO = new Vector(0, 0);
Vector.E1 = new Vector(1, 0);
Vector.E2 = new Vector(0, 1);
export default Vector;
