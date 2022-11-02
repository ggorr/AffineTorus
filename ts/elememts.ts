'use strict';

import { DomGroup, Transformation } from './domGroup.js';

let radio: HTMLInputElement[] = [];
let label: HTMLLabelElement[] = [];
for (let i = 0; i < 3; i++) {
    radio[i] = document.getElementById('radio-sub' + i) as HTMLInputElement;
    label[i] = document.getElementById("label-sub" + i) as HTMLLabelElement;
}

let domGroups: DomGroup[] = [];
for (let i = 0; i < 4; i++)
    domGroups.push(new DomGroup(
        document.getElementById("group" + i) as HTMLDivElement,
        new Transformation(
            document.getElementById("g" + i + "-f_m11") as HTMLInputElement,
            document.getElementById("g" + i + "-f_m21") as HTMLInputElement,
            document.getElementById("g" + i + "-f_m12") as HTMLInputElement,
            document.getElementById("g" + i + "-f_m22") as HTMLInputElement,
            document.getElementById("g" + i + "-f_a1") as HTMLInputElement,
            document.getElementById("g" + i + "-f_a2") as HTMLInputElement),
        new Transformation(
            document.getElementById("g" + i + "-g_m11") as HTMLInputElement,
            document.getElementById("g" + i + "-g_m21") as HTMLInputElement,
            document.getElementById("g" + i + "-g_m12") as HTMLInputElement,
            document.getElementById("g" + i + "-g_m22") as HTMLInputElement,
            document.getElementById("g" + i + "-g_a1") as HTMLInputElement,
            document.getElementById("g" + i + "-g_a2") as HTMLInputElement),
        [document.getElementById("g" + i + "-init0") as HTMLInputElement,
        document.getElementById("g" + i + "-init1") as HTMLInputElement],
        document.getElementById("g" + i + "-iter") as HTMLInputElement,
        document.getElementById("g" + i + "-unit") as HTMLInputElement));

export { radio, label, domGroups };