'use strict';

import AffineTx from './affineTx.js';
import { evaluate } from './evaluator.js';
import Vector from './vector.js';

class DomGroup {
    private div: HTMLDivElement;
    private f: Transformation;
    private g: Transformation;
    private init: [HTMLInputElement, HTMLInputElement];
    private iter: HTMLInputElement;
    private unit: HTMLInputElement;

    public constructor(div: HTMLDivElement, f: Transformation, g: Transformation,
        init: [HTMLInputElement, HTMLInputElement], iter: HTMLInputElement, unit: HTMLInputElement) {
        this.div = div;
        this.f = f;
        this.g = g;
        this.init = init;
        this.iter = iter;
        this.unit = unit;
    }

    public get Div() { return this.div; }
    public get F() { return this.f; }
    public get G() { return this.g; }
    public get Iter() { return this.iter; }
    public get Unit() { return this.unit; }

    public setVisible(tf: boolean): void {
        this.div.style.display = tf ? 'block' : 'none';
    }

    public getInit(): Vector {
        return new Vector(parseFloat(this.init[0].value), parseFloat(this.init[1].value));
    }

    public setInit(v0: number, v1: number): void {
        this.init[0].value = v0.toString();
        this.init[1].value = v1.toString();
    }

    public getIter(): number {
        return parseInt(this.iter.value);
    }

    public setIter(value: number): void {
        this.iter.value = value.toString();
    }

    public getUnit(): number {
        return parseInt(this.unit.value);
    }

    public setUnit(value: number): void {
        this.iter.value = value.toString();
    }

    public reset(): void {
        this.setVisible(false);
        this.iter.value = '200';
        this.setInit(1, 1);
        this.F.reset();
        this.G.reset();
    }
}

class Transformation {
    public static readonly backColorFixed = '#B66';
    public static readonly backColorAvoid1 = '#DD6';
    public static readonly backColorAvoid2 = '#CC7';
    public static readonly backColorRelated1 = '#8B8';
    public static readonly backColorRelated2 = '#9A9';
    public static readonly backColorFree = '#DDD';
    public static readonly foreColorNormal = '#000';
    public static readonly foreColorAvoid = '#F00';

    private m: HTMLInputElement[];
    private el: { src: HTMLInputElement, listener: EventListener }[];

    public constructor(m11: HTMLInputElement, m21: HTMLInputElement, m12: HTMLInputElement, m22: HTMLInputElement, a1: HTMLInputElement, a2: HTMLInputElement) {
        this.m = [m11, m21, m12, m22, a1, a2];
        this.el = [];
        this.m.forEach(v =>
            v.addEventListener('mouseover', () => {
                v.setAttribute('title', evaluate(v.value).toString())
            })
        );
    }

    public get M11() { return this.m[0]; }
    public get M21() { return this.m[1]; }
    public get M12() { return this.m[2]; }
    public get M22() { return this.m[3]; }
    public get A1() { return this.m[4]; }
    public get A2() { return this.m[5]; }

    public setDom(m11: HTMLInputElement, m21: HTMLInputElement, m12: HTMLInputElement, m22: HTMLInputElement, a1: HTMLInputElement, a2: HTMLInputElement): void {
        this.m = [m11, m21, m12, m22, a1, a2];
    }

    public setValue(values: string[] | number[]): void {
        this.m.forEach((d, i) => d.value = values[i].toString());
    }

    public setUsage(usages: string): void {
        this.m.forEach((d, i) => Transformation.setBackgroundColor(d, usages[i]));
    }

    public reset(): void {
        this.clearEventListener();
        this.m.forEach(d => d.style.color = Transformation.foreColorNormal);
    }

    public addRelation(i: number, j: number, negative: boolean = false): void {
        if (negative) {
            this.addEventListener(i, () => {
                if (evaluate('-' + this.m[i].value) == -evaluate(this.m[i].value))
                    this.m[j].value = `-${this.m[i].value}`;
                else
                    this.m[j].value = `-(${this.m[i].value})`;
            });
            this.addEventListener(j, () => {
                if (evaluate('-' + this.m[j].value) == -evaluate(this.m[j].value))
                    this.m[i].value = `-${this.m[j].value}`;
                else
                    this.m[i].value = `-(${this.m[j].value})`;
            });
        } else {
            this.addEventListener(i, () => this.m[j].value = this.m[i].value);
            this.addEventListener(j, () => this.m[i].value = this.m[j].value);
        }
    }

    public removeRelation(i: number, j: number): void {
        this.removeEventListener(i);
        this.removeEventListener(j);
    }

    public addEventListener(i: number, listener: EventListener): void {
        this.m[i].addEventListener('input', listener);
        this.el.push({ src: this.m[i], listener: listener });
    }

    public removeEventListener(i: number): void {
        for (let k = this.el.length - 1; k >= 0; k--)
            if (this.m[i] === this.el[k].src) {
                let pair = this.el.splice(k, 1)[0];
                pair.src.removeEventListener('input', pair.listener);
            }
    }

    public clearEventListener(): void {
        this.el.forEach(e => e.src.removeEventListener('input', e.listener));
        this.el = [];
    }

    public avoid1(i: number): void {
        this.addEventListener(i, () => {
            if (parseFloat(this.m[i].value) == 1)
                this.m[i].style.color = Transformation.foreColorAvoid;
            else
                this.m[i].style.color = Transformation.foreColorNormal;
        });
    }

    public addRelationAvoid1(i: number, j: number): void {
        this.addEventListener(i, () => {
            this.m[j].value = this.m[i].value;
            if (parseFloat(this.m[i].value) == 1) {
                this.m[i].style.color = Transformation.foreColorAvoid;
                this.m[j].style.color = Transformation.foreColorAvoid;
            } else {
                this.m[i].style.color = Transformation.foreColorNormal;
                this.m[j].style.color = Transformation.foreColorNormal;
            }
        });
        this.addEventListener(j, () => {
            this.m[i].value = this.m[j].value;
            if (parseFloat(this.m[j].value) == 1) {
                this.m[i].style.color = Transformation.foreColorAvoid;
                this.m[j].style.color = Transformation.foreColorAvoid;
            } else {
                this.m[i].style.color = Transformation.foreColorNormal;
                this.m[j].style.color = Transformation.foreColorNormal;
            }
        });
    }

    public avoid1Equal(i: number, j: number) {
        let listener: EventListener = () => {
            if (parseFloat(this.m[i].value) == parseFloat(this.m[j].value)) {
                this.m[i].style.color = Transformation.foreColorAvoid;
                this.m[j].style.color = Transformation.foreColorAvoid;
            } else if (parseFloat(this.m[i].value) == 1) {
                this.m[i].style.color = Transformation.foreColorAvoid;
                this.m[j].style.color = Transformation.foreColorNormal;
            } else if (parseFloat(this.m[j].value) == 1) {
                this.m[i].style.color = Transformation.foreColorNormal;
                this.m[j].style.color = Transformation.foreColorAvoid;
            } else {
                this.m[i].style.color = Transformation.foreColorNormal;
                this.m[j].style.color = Transformation.foreColorNormal;
            }
        };
        this.addEventListener(i, listener);
        this.addEventListener(j, listener);
    }

    public getAffineTx(): AffineTx {
        return new AffineTx(
            evaluate(this.m[0].value), evaluate(this.m[1].value),
            evaluate(this.m[2].value), evaluate(this.m[3].value),
            evaluate(this.m[4].value), evaluate(this.m[5].value));
    }

    private static setBackgroundColor(d: HTMLInputElement, usage: string) {
        switch (usage) {
            case 'x':
            case 'X':
                d.style.backgroundColor = this.backColorFixed;
                break;
            case 'a':
            case 'A':
                d.style.backgroundColor = this.backColorAvoid1;
                break;
            case 'b':
            case 'B':
                d.style.backgroundColor = this.backColorAvoid2;
                break;
            case 'r':
            case 'R':
                d.style.backgroundColor = this.backColorRelated1;
                break;
            case 's':
            case 'S':
                d.style.backgroundColor = this.backColorRelated2;
                break;
            default: // 'f', 'F'
                d.style.backgroundColor = this.backColorFree;
        }
    }
}

export { DomGroup, Transformation };