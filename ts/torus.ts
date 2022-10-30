'use strict';

import Holonomy from "./holonomy.js";
import *  as type1 from "./type1.js";
import *  as type2 from "./type2.js";
import *  as type3 from "./type3.js";
import *  as type4 from "./type4.js";
import *  as type5 from "./type5.js";
import { domGroups as dgs } from './elememts.js';

function onclickType(type: number) {
    switch (type) {
        case 1:
            type1.revealSubtypes();
            break;
        case 2:
            type2.revealSubtypes();
            break;
        case 3:
            type3.revealSubtypes();
            break;
        case 4:
            type4.revealSubtypes();
            break;
        default:
            type5.revealSubtypes();
    }
}

function onclickSubtype(type: number, subtype: number) {
    dgs.forEach(dg => dg.reset());
    switch (type) {
        case 1:
            if (subtype == 0)
                type1.displayI1a();
            else if (subtype == 1)
                type1.displayI1b();
            else
                type1.displayI2();
            break;
        case 2:
            if (subtype == 0)
                type2.displayII1();
            else if (subtype == 1)
                type2.displayII2();
            else
                type2.displayII3();
            break;
        case 3:
            if (subtype == 0)
                type3.displayIII1();
            else if (subtype == 1)
                type3.displayIII2();
            else
                type3.displayIII3();
            break;
        case 4:
            type4.displayIV();
            break;
        default:
            type5.displayV();
    }

}

function develop(domGroupIndex: number): void {
    let offset = 10;
    let canvas = document.getElementById('canvas') as HTMLCanvasElement;
    canvas.height = canvas.width = Math.min(window.innerWidth, window.innerHeight) - 2 * offset;
    let context = canvas.getContext('2d') as CanvasRenderingContext2D;
    context.strokeStyle = "#448";

    let unit = dgs[domGroupIndex].getUnit();
    let cenX = canvas.width / 2 + offset;
    let cenY = canvas.height / 2 + offset;
    context.setTransform(unit, 0, 0, -unit, cenX, cenY);
    context.lineWidth = 1 / unit;

    let hol = new Holonomy(dgs[domGroupIndex].F.getAffineTx(), dgs[domGroupIndex].G.getAffineTx());
    hol.develop(context, dgs[domGroupIndex].getIter(), dgs[domGroupIndex].getInit());
}

export { onclickType, onclickSubtype, develop };
