"use strict";
import Vector from "./vector.js";
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
    develop(context, iter, p = new Vector(1, 1)) {
        let sq = Square.getByAffineTx(this.f, this.g, p);
        let lsq = sq.copy();
        let rsq = sq.copy();
        let usq = sq.copy();
        let dsq = sq.copy();
        sq.stroke(context, 'a');
        for (let i = 0; i < iter; i++) {
            rsq.transfBy(this.f);
            rsq.stroke(context, 'r');
            lsq.transfBy(this.invF);
            lsq.stroke(context, 'l');
            usq.transfBy(this.g);
            usq.stroke(context, 'u');
            dsq.transfBy(this.invG);
            dsq.stroke(context, 'd');
            let ursq = rsq.copy();
            let drsq = rsq.copy();
            let ulsq = lsq.copy();
            let dlsq = lsq.copy();
            for (let j = 0; j < iter; j++) {
                ursq.transfBy(this.g);
                ursq.stroke(context, 'ur');
                drsq.transfBy(this.invG);
                drsq.stroke(context, 'dr');
                ulsq.transfBy(this.g);
                ulsq.stroke(context, 'ul');
                dlsq.transfBy(this.invG);
                dlsq.stroke(context, 'dl');
            }
        }
    }
}
export default Holonomy;
