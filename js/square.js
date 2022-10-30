"use strict";
import Vector from "./vector.js";
class Square {
    // private sides: string;
    constructor(a, b, c, d) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        // this.sides = 'none';
    }
    copy() {
        return new Square(this.a.copy(), this.b.copy(), this.c.copy(), this.d.copy());
    }
    getByGroup(tg, a = new Vector(1, 1)) {
        let b = tg.F.transf(a);
        return new Square(a, b, tg.G.transf(b), tg.G.transf(a));
    }
    static getByAffineTx(f, g, a = new Vector(1, 1)) {
        let b = f.transf(a);
        return new Square(a, b, g.transf(b), g.transf(a));
    }
    get A() { return this.a; }
    get B() { return this.b; }
    get C() { return this.c; }
    get D() { return this.d; }
    // public set Sides(value: string) { this.sides = value; }
    transfBy(f) {
        this.a.transfBy(f);
        this.b.transfBy(f);
        this.c.transfBy(f);
        this.d.transfBy(f);
    }
    stroke(context, sides) {
        context.beginPath();
        switch (sides) {
            case 'a': // initial square
                context.moveTo(this.a.X, this.a.Y);
                context.lineTo(this.b.X, this.b.Y);
                context.lineTo(this.c.X, this.c.Y);
                context.lineTo(this.d.X, this.d.Y);
                context.closePath();
                break;
            case 'r': // right
                context.moveTo(this.a.X, this.a.Y);
                context.lineTo(this.b.X, this.b.Y);
                context.lineTo(this.c.X, this.c.Y);
                context.lineTo(this.d.X, this.d.Y);
                break;
            case 'u': //up
                context.moveTo(this.b.X, this.b.Y);
                context.lineTo(this.c.X, this.c.Y);
                context.lineTo(this.d.X, this.d.Y);
                context.lineTo(this.a.X, this.a.Y);
                break;
            case 'l': // left
                context.moveTo(this.c.X, this.c.Y);
                context.lineTo(this.d.X, this.d.Y);
                context.lineTo(this.a.X, this.a.Y);
                context.lineTo(this.b.X, this.b.Y);
                break;
            case 'd': // down
                context.moveTo(this.d.X, this.d.Y);
                context.lineTo(this.a.X, this.a.Y);
                context.lineTo(this.b.X, this.b.Y);
                context.lineTo(this.c.X, this.c.Y);
                break;
            case 'ur': // up right
                context.moveTo(this.b.X, this.b.Y);
                context.lineTo(this.c.X, this.c.Y);
                context.lineTo(this.d.X, this.d.Y);
                break;
            case 'ul': // up left
                context.moveTo(this.c.X, this.c.Y);
                context.lineTo(this.d.X, this.d.Y);
                context.lineTo(this.a.X, this.a.Y);
                break;
            case 'dl': // down left
                context.moveTo(this.d.X, this.d.Y);
                context.lineTo(this.a.X, this.a.Y);
                context.lineTo(this.b.X, this.b.Y);
                break;
            case 'dr': // down right
                context.moveTo(this.a.X, this.a.Y);
                context.lineTo(this.b.X, this.b.Y);
                context.lineTo(this.c.X, this.c.Y);
        }
        context.stroke();
    }
    static transf(f, s) {
        return new Square(Vector.transf(f, s.a), Vector.transf(f, s.b), Vector.transf(f, s.c), Vector.transf(f, s.d));
    }
}
export default Square;
