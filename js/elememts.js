'use strict';
import { DomGroup, Transformation } from './domGroup.js';
let radio = [];
let label = [];
for (let i = 0; i < 5; i++) {
    radio[i] = document.getElementById('radio-sub' + i);
    label[i] = document.getElementById("label-sub" + i);
}
let domGroups = [];
for (let i = 0; i < 4; i++)
    domGroups.push(new DomGroup(document.getElementById("group" + i), new Transformation(document.getElementById("g" + i + "-f_m11"), document.getElementById("g" + i + "-f_m21"), document.getElementById("g" + i + "-f_m12"), document.getElementById("g" + i + "-f_m22"), document.getElementById("g" + i + "-f_a1"), document.getElementById("g" + i + "-f_a2")), new Transformation(document.getElementById("g" + i + "-g_m11"), document.getElementById("g" + i + "-g_m21"), document.getElementById("g" + i + "-g_m12"), document.getElementById("g" + i + "-g_m22"), document.getElementById("g" + i + "-g_a1"), document.getElementById("g" + i + "-g_a2")), [document.getElementById("g" + i + "-init0"),
        document.getElementById("g" + i + "-init1")], document.getElementById("g" + i + "-iter"), document.getElementById("g" + i + "-unit")));
export { radio, label, domGroups };
