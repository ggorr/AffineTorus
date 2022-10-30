'use strict';
import AffineTx from './affineTx.js';
import { evaluate } from './evaluator.js';
import Vector from './vector.js';
class DomGroup {
    constructor(div, f, g, init, iter, unit) {
        this.div = div;
        this.f = f;
        this.g = g;
        this.init = init;
        this.iter = iter;
        this.unit = unit;
    }
    get Div() { return this.div; }
    get F() { return this.f; }
    get G() { return this.g; }
    get Iter() { return this.iter; }
    get Unit() { return this.unit; }
    setVisible(tf) {
        this.div.style.display = tf ? 'block' : 'none';
    }
    getInit() {
        return new Vector(parseFloat(this.init[0].value), parseFloat(this.init[1].value));
    }
    setInit(v0, v1) {
        this.init[0].value = v0.toString();
        this.init[1].value = v1.toString();
    }
    getIter() {
        return parseInt(this.iter.value);
    }
    setIter(value) {
        this.iter.value = value.toString();
    }
    getUnit() {
        return parseInt(this.unit.value);
    }
    setUnit(value) {
        this.iter.value = value.toString();
    }
    reset() {
        this.setVisible(false);
        this.iter.value = '200';
        this.setInit(1, 1);
        this.F.reset();
        this.G.reset();
    }
}
class Transformation {
    constructor(m11, m21, m12, m22, a1, a2) {
        this.m = [m11, m21, m12, m22, a1, a2];
        this.el = [];
        for (let i = 0; i < 6; i++)
            this.m[i].addEventListener('mouseover', () => {
                this.m[i].setAttribute('title', evaluate(this.m[i].value).toString());
            });
    }
    get M11() { return this.m[0]; }
    get M21() { return this.m[1]; }
    get M12() { return this.m[2]; }
    get M22() { return this.m[3]; }
    get A1() { return this.m[4]; }
    get A2() { return this.m[5]; }
    setDom(m11, m21, m12, m22, a1, a2) {
        this.m = [m11, m21, m12, m22, a1, a2];
    }
    setValue(values) {
        for (let i = 0; i < 6; i++)
            this.m[i].value = values[i].toString();
    }
    setUsage(usages) {
        for (let i = 0; i < 6; i++)
            Transformation.setBackgroundColor(this.m[i], usages[i]);
    }
    reset() {
        this.clearEventListener();
        this.m.forEach(d => {
            d.style.color = Transformation.foreColorNormal;
        });
    }
    addRelation(i, j, negative = false) {
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
        }
        else {
            this.addEventListener(i, () => this.m[j].value = this.m[i].value);
            this.addEventListener(j, () => this.m[i].value = this.m[j].value);
        }
    }
    removeRelation(i, j) {
        this.removeEventListener(i);
        this.removeEventListener(j);
    }
    addEventListener(i, listener) {
        this.m[i].addEventListener('input', listener);
        this.el.push({ src: this.m[i], listener: listener });
    }
    removeEventListener(i) {
        for (let k = this.el.length - 1; k >= 0; k--)
            if (this.m[i] === this.el[k].src) {
                let pair = this.el.splice(k, 1)[0];
                pair.src.removeEventListener('input', pair.listener);
            }
    }
    clearEventListener() {
        for (let k = 0; k < this.el.length; k++)
            this.el[k].src.removeEventListener('input', this.el[k].listener);
        this.el = [];
    }
    avoid1(i) {
        this.addEventListener(i, () => {
            if (parseFloat(this.m[i].value) == 1)
                this.m[i].style.color = Transformation.foreColorAvoid;
            else
                this.m[i].style.color = Transformation.foreColorNormal;
        });
    }
    addRelationAvoid1(i, j) {
        this.addEventListener(i, () => {
            this.m[j].value = this.m[i].value;
            if (parseFloat(this.m[i].value) == 1) {
                this.m[i].style.color = Transformation.foreColorAvoid;
                this.m[j].style.color = Transformation.foreColorAvoid;
            }
            else {
                this.m[i].style.color = Transformation.foreColorNormal;
                this.m[j].style.color = Transformation.foreColorNormal;
            }
        });
        this.addEventListener(j, () => {
            this.m[i].value = this.m[j].value;
            if (parseFloat(this.m[j].value) == 1) {
                this.m[i].style.color = Transformation.foreColorAvoid;
                this.m[j].style.color = Transformation.foreColorAvoid;
            }
            else {
                this.m[i].style.color = Transformation.foreColorNormal;
                this.m[j].style.color = Transformation.foreColorNormal;
            }
        });
    }
    avoid1Equal(i, j) {
        let listener = () => {
            if (parseFloat(this.m[i].value) == parseFloat(this.m[j].value)) {
                this.m[i].style.color = Transformation.foreColorAvoid;
                this.m[j].style.color = Transformation.foreColorAvoid;
            }
            else if (parseFloat(this.m[i].value) == 1) {
                this.m[i].style.color = Transformation.foreColorAvoid;
                this.m[j].style.color = Transformation.foreColorNormal;
            }
            else if (parseFloat(this.m[j].value) == 1) {
                this.m[i].style.color = Transformation.foreColorNormal;
                this.m[j].style.color = Transformation.foreColorAvoid;
            }
            else {
                this.m[i].style.color = Transformation.foreColorNormal;
                this.m[j].style.color = Transformation.foreColorNormal;
            }
        };
        this.addEventListener(i, listener);
        this.addEventListener(j, listener);
    }
    getAffineTx() {
        return new AffineTx(evaluate(this.m[0].value), evaluate(this.m[1].value), evaluate(this.m[2].value), evaluate(this.m[3].value), evaluate(this.m[4].value), evaluate(this.m[5].value));
    }
    static setBackgroundColor(d, usage) {
        d.style.backgroundColor = usage === 'x' || usage === 'X' ? this.backColorFixed :
            usage === 'r' || usage === 'R' ? this.backColorRelated :
                this.backColorFree;
    }
}
Transformation.backColorFixed = '#D66';
Transformation.backColorRelated = '#DD6';
Transformation.backColorFree = '#FFF';
Transformation.foreColorNormal = '#000';
Transformation.foreColorAvoid = '#F00';
export { DomGroup, Transformation };