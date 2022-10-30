'use strict';
import AffineTx from './affineTx.js';
class Group {
    constructor(div, f, g, iter, unit) {
        this.div = div;
        this.f = f;
        this.g = g;
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
    clearEventListener() {
        this.F.clearEventListener();
        this.G.clearEventListener();
    }
}
class Transformation {
    constructor(m11, m21, m12, m22, a1, a2) {
        this.m = [m11, m21, m12, m22, a1, a2];
        this.el = [];
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
    addRelation(i, j, negative = false) {
        if (negative) {
            this.addEventListener(i, () => this.m[j].value = (-parseFloat(this.m[i].value)).toString());
            this.addEventListener(j, () => this.m[i].value = (-parseFloat(this.m[j].value)).toString());
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
    getAffineTx() {
        return new AffineTx(parseFloat(this.m[0].value), parseFloat(this.m[1].value), parseFloat(this.m[2].value), parseFloat(this.m[3].value), parseFloat(this.m[4].value), parseFloat(this.m[5].value));
    }
    static setBackgroundColor(d, usage) {
        d.style.backgroundColor = usage === 'x' || usage === 'X' ? this.colorFixed :
            usage === 'r' || usage === 'R' ? this.colorRelated :
                this.colorFree;
    }
    static getIndex(rep) {
        switch (rep) {
            case 'm11':
                return 0;
            case 'm21':
                return 1;
            case 'm12':
                return 2;
            case 'm22':
                return 3;
            case 'a1':
                return 4;
            default: // 'a2'
                return 5;
        }
    }
}
Transformation.colorFixed = '#C44';
Transformation.colorRelated = '#CC4';
Transformation.colorFree = '#FFF';
export { Group, Transformation };
