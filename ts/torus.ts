'use strict';

import Holonomy from "./holonomy.js";
import *  as type1 from "./type1.js";
import *  as type2 from "./type2.js";
import *  as type3 from "./type3.js";
import *  as type4 from "./type4.js";
import *  as type5 from "./type5.js";
import { domGroups as dgs } from './elememts.js';

let type: number = -1;
let subtype: number = -1;

function onclickType(_type: number) {
    type = _type;
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

function onclickSubtype(_subtype: number) {
    subtype = _subtype;
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
    (document.getElementById('choice') as HTMLDivElement).style.height = 'fit-content';
    resize();
}

function resize() {
    // let leftHeight = document.getElementById('left').clientHeight;
    let windowHeight = window.innerHeight;
    let titleHeight = (document.getElementById('title') as HTMLDivElement).scrollHeight;
    let authorHeight = (document.getElementById('author') as HTMLDivElement).scrollHeight;
    let choiceHeight = (document.getElementById('choice') as HTMLDivElement).scrollHeight;
    let height = Math.min(choiceHeight, windowHeight - titleHeight - authorHeight - 52);
    if (height < choiceHeight / 2)
        height = choiceHeight;
    (document.getElementById('choice') as HTMLDivElement).style.height = height + 'px';
    // console.log(leftHeight + ', ' + titleHeight + ', ' + authorHeight + ', ' + choiceHeight + ', ' + windowHeight);
}

let svg: string | null = null;
let unit: number = 0;
let view: number[] = [];

function develop(domGroupIndex: number): void {
    let offset = 10;
    let canvas = document.getElementById('canvas') as HTMLCanvasElement;
    canvas.height = canvas.width = Math.min(window.innerWidth, window.innerHeight);
    let context = canvas.getContext('2d') as CanvasRenderingContext2D;
    context.strokeStyle = "#448";

    unit = dgs[domGroupIndex].getUnit();
    let cenX = canvas.width / 2;
    let cenY = canvas.height / 2;
    context.setTransform(unit, 0, 0, -unit, cenX, cenY);
    context.lineWidth = 1 / unit;
    view = [-canvas.width, -canvas.height, canvas.width, canvas.height]
        .map(x => x / (2 * unit));

    let hol = new Holonomy(dgs[domGroupIndex].F.getAffineTx(), dgs[domGroupIndex].G.getAffineTx());
    svg = hol.develop(context, dgs[domGroupIndex].getIter(), dgs[domGroupIndex].getInit(), view);
    setSvgFile(domGroupIndex);
}

function setSvgFile(domGroupIndex: number): void {
    const typeStr = ['I', 'II', 'III', 'IV', 'V'];
    (document.getElementById('svg-file') as HTMLInputElement).value = `${typeStr[type - 1]}${subtype + 1}-${domGroupIndex + 1}.svg`;;
}

function downloadSvg(): void {
    if (svg == null)
        return;
    let canvas = document.getElementById('canvas') as HTMLCanvasElement;
    let fullSvg = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" 
    baseProfile="full" 
    transform="matrix(1 0 0 -1 0 0)"
    width="${canvas.width}" height="${canvas.height}" 
    viewBox="${view[0]} ${view[1]} ${view[2] - view[0]} ${view[3] - view[1]}"
    stroke="#448" 
    stroke-width="${1 / unit}" 
    fill="transparent">
    ${svg}
    </svg>`;

    let blob = new Blob([fullSvg], { type: 'image/svg+xml' });
    let link = document.createElement("a");
    link.download = (document.getElementById('svg-file') as HTMLInputElement).value;
    link.href = window.URL.createObjectURL(blob);
    link.click();
}
export { onclickType, onclickSubtype, resize, develop, downloadSvg };
