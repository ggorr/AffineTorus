'use strict';
import { radio, label, domGroups as dgs } from './elememts.js';
function revealSubtypes() {
    radio.map(r => r.style.display = 'inline-block');
    label.map(l => l.style.display = 'inline-block');
    label[0].innerHTML = '&#8546;-1';
    label[1].innerHTML = '&#8546;-2';
    label[2].innerHTML = '&#8546;-3';
}
function displayIII1() {
    dgs[0].setVisible(true);
    dgs[0].setIter(50);
    dgs[0].F.setValue([1, 0, 0, 1.3, 0, 0]);
    dgs[0].F.setUsage('XXXAXX');
    dgs[0].F.avoid1(3);
    dgs[0].G.setValue([1, 0, 0, 1.2, 1, 0]);
    dgs[0].G.setUsage('XXXFFX');
    dgs[1].setVisible(true);
    dgs[1].setIter(50);
    dgs[1].F.setValue([1, 0, 0, 1.2, 0, 0]);
    dgs[1].F.setUsage('XXXAXX');
    dgs[1].F.avoid1(3);
    dgs[1].G.setValue([2, 0, 0, 3, 0, 0]);
    dgs[1].G.setUsage('AXXFXX');
    dgs[1].G.avoid1(0);
    dgs[2].setVisible(true);
    dgs[2].setIter(100);
    dgs[2].F.setValue([1, 0, 0, 1.1, 0, 0]);
    dgs[2].F.setUsage('XXXAXX');
    dgs[2].F.avoid1(3);
    dgs[2].G.setValue([1.2, 0, 0, 1.2, 2, 0]);
    dgs[2].G.setUsage('FXXFFX');
}
function displayIII2() {
    dgs[0].setVisible(true);
    dgs[0].setIter(30);
    dgs[0].F.setValue([1, 0, 0, 2, 1, 0]);
    dgs[0].F.setUsage('XXXAXX');
    dgs[0].F.avoid1(3);
    dgs[0].G.setValue([1, 0, 0, 1.2, 1.4, 0]);
    dgs[0].G.setUsage('XXXFFX');
}
function displayIII3() {
    dgs[0].setVisible(true);
    dgs[0].setIter(20);
    dgs[0].F.setValue([2, 0, 0, 1.5, 0, 0]);
    dgs[0].F.setUsage('AXXBXX');
    dgs[0].F.avoid1Equal(0, 3);
    dgs[0].G.setValue([1.2, 0, 0, 1.6, 0, 0]);
    dgs[0].G.setUsage('FXXFXX');
}
export { revealSubtypes, displayIII1, displayIII2, displayIII3 };
