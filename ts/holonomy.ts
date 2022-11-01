"use strict";

import Vector from "./vector.js";
import Square from "./square.js";
import AffineTx from "./affineTx.js";

class Holonomy {
    private f: AffineTx;
    private g: AffineTx;
    private invF: AffineTx;
    private invG: AffineTx;

    public constructor(f: AffineTx, g: AffineTx) {
        this.f = f;
        this.g = g;
        this.invF = f.getInverse();
        this.invG = g.getInverse();
    }

    public get F() { return this.f; }
    public get G() { return this.g; }
    public get InvF() { return this.invF; }
    public get InvG() { return this.invG; }

    public develop(context: CanvasRenderingContext2D, iter: number, p: Vector, view: number[]): string {
        let sq = Square.getByAffineTx(this.f, this.g, p);
        let lsq = sq.copy();
        let rsq = sq.copy();
        let usq = sq.copy();
        let dsq = sq.copy();
        sq.stroke(context, 'a');
        let svg: string = sq.strokeSvg('a');
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