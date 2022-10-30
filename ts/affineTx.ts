'use strict';

import Vector from "./vector.js";

const EPSILON = 1e-6;

function equals(x: number, y: number): boolean {
    return x - EPSILON < y && y < x + EPSILON;
}

class AffineTx {
    private m11: number;
    private m21: number;
    private m12: number;
    private m22: number;
    private a1: number;
    private a2: number;

    public constructor(m11: number, m21: number, m12: number, m22: number, a1: number, a2: number) {
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

    public static readonly I = new AffineTx(1, 0, 0, 1, 0, 0);

    public static translation(x: number, y: number): AffineTx {
        return new AffineTx(1, 0, 0, 1, x, y);
    }

    public static similarity(exp: number, angle: number, translX: number, translY: number): AffineTx {
        const c = exp * Math.cos(angle);
        const s = exp * Math.sin(angle);
        return new AffineTx(c, -s, s, c, translX, translY);
    }

    public get M11(): number { return this.m11; }
    public get M21(): number { return this.m21; }
    public get M12(): number { return this.m12; }
    public get M22(): number { return this.m22; }
    public get A1(): number { return this.a1; }
    public get A2(): number { return this.a2; }

    public rightMultBy(f: AffineTx): void {
        this.a1 += this.m11 * f.a1 + this.m12 * f.a2;
        this.a2 += this.m21 * f.a1 + this.m22 * f.a2;
        let t11 = this.m11;
        let t21 = this.m21;
        this.m11 = t11 * f.m11 + this.m12 * f.m21;
        this.m21 = t21 * f.m11 + this.m22 * f.m21;
        this.m12 = t11 * f.m12 + this.m12 * f.m22;
        this.m22 = t21 * f.m12 + this.m22 * f.m22;
    }

    public leftMultBy(f: AffineTx): void {
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

    public getInverse(): AffineTx {
        let det = this.m11 * this.m22 - this.m12 * this.m21;
        return new AffineTx(this.m22 / det, -this.m21 / det, -this.m12 / det, this.m11 / det,
            (-this.m22 * this.a1 + this.m12 * this.a2) / det, (this.m21 * this.a1 - this.m11 * this.a2) / det);
    }

    public transf(v: Vector): Vector {
        return new Vector(this.M11 * v.X + this.M12 * v.Y + this.A1, this.M21 * v.X + this.M22 * v.Y + this.A2);
    }

    public static transf(f: AffineTx, v: Vector): Vector {
        return new Vector(f.M11 * v.X + f.M12 * v.Y + f.A1, f.M21 * v.X + f.M22 * v.Y + f.A2);
    }

    public static mult(f: AffineTx, g: AffineTx): AffineTx {
        return new AffineTx(
            f.m11 * g.m11 + f.m12 * g.m21, f.m21 * g.m11 + f.m22 * g.m21,
            f.m11 * g.m12 + f.m12 * g.m22, f.m21 * g.m12 + f.m22 * g.m22,
            f.a1 + f.m11 * g.a1 + f.m12 * g.a2, f.a2 + f.m21 * g.a1 + f.m22 * g.a2);
    }

    public static inverse(f: AffineTx): AffineTx {
        let det = f.m11 * f.m22 - f.m12 * f.m21;
        return new AffineTx(f.m22 / det, -f.m21 / det, -f.m12 / det, f.m11 / det,
            (-f.m22 * f.a1 + f.m12 * f.a2) / det, (f.m21 * f.a1 - f.m11 * f.a2) / det);
    }

    public static commute(f: AffineTx, g: AffineTx): boolean {
        let fg = AffineTx.mult(f, g);
        let gf = AffineTx.mult(g, f);
        return equals(fg.m11, gf.m11) && equals(fg.m21, gf.m21) && equals(fg.m12, gf.m12) && equals(fg.m22, gf.m22) &&
            equals(fg.a1, gf.a1) && equals(fg.a2, gf.a2);
    }
}

export default AffineTx;