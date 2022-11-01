"use strict";
import Square from "./square.js";
class Holonomy {
    constructor(f, g) {
        this.f = f;
        this.g = g;
        this.invF = f.getInverse();
        this.invG = g.getInverse();
    }
    get F() { return this.f; }
    get G() { return this.g; }
    get InvF() { return this.invF; }
    get InvG() { return this.invG; }
    develop(context, iter, p, view) {
        let sq = Square.getByAffineTx(this.f, this.g, p);
        let lsq = sq.copy();
        let rsq = sq.copy();
        let usq = sq.copy();
        let dsq = sq.copy();
        sq.stroke(context, 'a');
        let svg = sq.strokeSvg('a');
        for (let i = 0; i < iter; i++) {
            rsq.transfBy(this.f);
            if (rsq.meetWith(view)) {
                rsq.stroke(context, 'r');
                svg += rsq.strokeSvg('r');
            }
            lsq.transfBy(this.invF);
            if (lsq.meetWith(view)) {
                lsq.stroke(context, 'l');
                svg += lsq.strokeSvg('l');
            }
            usq.transfBy(this.g);
            if (usq.meetWith(view)) {
                usq.stroke(context, 'u');
                svg += usq.strokeSvg('u');
            }
            dsq.transfBy(this.invG);
            if (dsq.meetWith(view)) {
                dsq.stroke(context, 'd');
                svg += dsq.strokeSvg('d');
            }
            let ursq = rsq.copy();
            let drsq = rsq.copy();
            let ulsq = lsq.copy();
            let dlsq = lsq.copy();
            for (let j = 0; j < iter; j++) {
                ursq.transfBy(this.g);
                if (ursq.meetWith(view)) {
                    ursq.stroke(context, 'ur');
                    svg += ursq.strokeSvg('ur');
                }
                drsq.transfBy(this.invG);
                if (drsq.meetWith(view)) {
                    drsq.stroke(context, 'dr');
                    svg += drsq.strokeSvg('dr');
                }
                ulsq.transfBy(this.g);
                if (ulsq.meetWith(view)) {
                    ulsq.stroke(context, 'ul');
                    svg += ulsq.strokeSvg('ul');
                }
                dlsq.transfBy(this.invG);
                if (dlsq.meetWith(view)) {
                    dlsq.stroke(context, 'dl');
                    svg += dlsq.strokeSvg('dl');
                }
            }
        }
        return svg;
    }
}
export default Holonomy;
