"use strict";

import AffineTx from "./affineTx.js";

function trunc(x: number): string {
    // return Math.round(x * 100000) / 100000;
    let str = (Math.round(x * 100000) / 100000).toString();
    return x > 0 ? (str.length > 2 && x < 1 ? str.slice(1) : str) : x < 0 ? (str.length > 3 && x > -1 ? '-' + str.slice(2) : str) : str;
}

class Vector {
    private x: number;
    private y: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    public copy(): Vector {
        return new Vector(this.x, this.y);
    }

    public static readonly ZERO = new Vector(0, 0);
    public static readonly E1 = new Vector(1, 0);
    public static readonly E2 = new Vector(0, 1);

    public get X(): number { return this.x; }
    public get Y(): number { return this.y; }

    public svg(): string {
        return `${trunc(this.X)} ${trunc(this.Y)}`;
    }

    public containedIn(rect: number[]): boolean {
        return rect[0] <= this.x && this.x <= rect[2] && rect[1] <= this.y && this.y <= rect[3];
    }

    public neg(): void {
        this.x = -this.x;
        this.y = -this.y;
    }
    public addBy(v: Vector): void {
        this.x += v.x;
        this.y += v.y;
    }
    public subBy(v: Vector): void {
        this.x -= v.x;
        this.y -= v.y;
    }

    public mulBy(d: number): void {
        this.x *= d;
        this.y *= d;
    }

    public transfBy(f: AffineTx): void {
        let tx = this.x;
        this.x = f.M11 * tx + f.M12 * this.y + f.A1;
        this.y = f.M21 * tx + f.M22 * this.y + f.A2;
    }

    public static neg(v: Vector): Vector {
        return new Vector(-v.x, -v.y);
    }

    public static add(v: Vector, w: Vector): Vector {
        return new Vector(v.x + w.x, v.y + w.y);
    }

    public static sub(v: Vector, w: Vector): Vector {
        return new Vector(v.x - w.x, v.y - w.y);
    }

    public static mul(d: number, v: Vector): Vector {
        return new Vector(d * v.x, d * v.y);
    }

    public static transf(f: AffineTx, v: Vector): Vector {
        return new Vector(f.M11 * v.X + f.M12 * v.Y + f.A1, f.M21 * v.X + f.M22 * v.Y + f.A2);
    }
}

export default Vector;