"use strict";

import Vector from "./vector.js";
import AffineTx from "./affineTx.js";
import Holonomy from "./holonomy.js";

function trunc(x:number) : string {
	// return Math.round(x * 100000) / 100000;
	let str = (Math.round(x * 100000) / 100000).toString();
	return x > 0 ? (str.length > 2 && x < 1 ? str.slice(1) : str) : x < 0 ? (str.length > 3 && x > -1 ? '-' + str.slice(2) : str) : str;
}

class Square {
    private a: Vector;
    private b: Vector;
    private c: Vector;
    private d: Vector;

    public constructor(a: Vector, b: Vector, c: Vector, d: Vector) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }

    public copy(): Square {
        return new Square(this.a.copy(), this.b.copy(), this.c.copy(), this.d.copy());
    }

    public getByGroup(tg: Holonomy, a: Vector = new Vector(1, 1)): Square {
        let b = tg.F.transf(a);
        return new Square(a, b, tg.G.transf(b), tg.G.transf(a));
    }

    public meetWith(rect:number[]) : boolean {
        return this.a.containedIn(rect) || this.b.containedIn(rect) || this.c.containedIn(rect) || this.d.containedIn(rect);
    }

    public static getByAffineTx(f: AffineTx, g: AffineTx, a: Vector = new Vector(1, 1)) {
        let b = f.transf(a);
        return new Square(a, b, g.transf(b), g.transf(a));
    }

    public get A() { return this.a; }
    public get B() { return this.b; }
    public get C() { return this.c; }
    public get D() { return this.d; }
    // public set Sides(value: string) { this.sides = value; }

    public transfBy(f: AffineTx): void {
        this.a.transfBy(f);
        this.b.transfBy(f);
        this.c.transfBy(f);
        this.d.transfBy(f);
    }

    public stroke(context: CanvasRenderingContext2D, sides: string): void {
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

    public strokeSvg(sides: string): string {
        let path = `<path d='`;
        switch (sides) {
            case 'a': // initial square
                path += `M${trunc(this.a.X)} ${trunc(this.a.Y)}L${trunc(this.b.X)} ${trunc(this.b.Y)}L${trunc(this.c.X)} ${trunc(this.c.Y)}L${trunc(this.d.X)} ${trunc(this.d.Y)}Z`;
                break;
            case 'r': // right
                path += `M${trunc(this.a.X)} ${trunc(this.a.Y)}L${trunc(this.b.X)} ${trunc(this.b.Y)}L${trunc(this.c.X)} ${trunc(this.c.Y)}L${trunc(this.d.X)} ${trunc(this.d.Y)}`;
                break;
            case 'u': //up
                path += `M${trunc(this.b.X)} ${trunc(this.b.Y)}L${trunc(this.c.X)} ${trunc(this.c.Y)}L${trunc(this.d.X)} ${trunc(this.d.Y)}L${trunc(this.a.X)} ${trunc(this.a.Y)}`;
                break;
            case 'l': // left
                path += `M${trunc(this.c.X)} ${trunc(this.c.Y)}L${trunc(this.d.X)} ${trunc(this.d.Y)}L${trunc(this.a.X)} ${trunc(this.a.Y)}L${trunc(this.b.X)} ${trunc(this.b.Y)}`;
                break;
            case 'd': // down
                path += `M${trunc(this.d.X)} ${trunc(this.d.Y)}L${trunc(this.a.X)} ${trunc(this.a.Y)}L${trunc(this.b.X)} ${trunc(this.b.Y)}L${trunc(this.c.X)} ${trunc(this.c.Y)}`;
                break;
            case 'ur': // up right
                path += `M${trunc(this.b.X)} ${trunc(this.b.Y)}L${trunc(this.c.X)} ${trunc(this.c.Y)}L${trunc(this.d.X)} ${trunc(this.d.Y)}`;
                break;
            case 'ul': // up left
                path += `M${trunc(this.c.X)} ${trunc(this.c.Y)}L${trunc(this.d.X)} ${trunc(this.d.Y)}L${trunc(this.a.X)} ${trunc(this.a.Y)}`;
                break;
            case 'dl': // down left
                path += `M${trunc(this.d.X)} ${trunc(this.d.Y)}L${trunc(this.a.X)} ${trunc(this.a.Y)}L${trunc(this.b.X)} ${trunc(this.b.Y)}`;
                break;
            case 'dr': // down right
                path += `M${trunc(this.a.X)} ${trunc(this.a.Y)}L${trunc(this.b.X)} ${trunc(this.b.Y)}L${trunc(this.c.X)} ${trunc(this.c.Y)}`;
        }
		return path + `'/>`;
    }

    public static transf(f: AffineTx, s: Square): Square {
        return new Square(Vector.transf(f, s.a), Vector.transf(f, s.b), Vector.transf(f, s.c), Vector.transf(f, s.d));
    }
}

export default Square;