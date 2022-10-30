'use strict';
import { radio, label, domGroups as dgs } from './elememts.js';
function revealSubtypes() {
    radio[0].style.display = 'inline-block';
    radio[1].style.display = 'inline-block';
    radio[2].style.display = 'inline-block';
    label[0].innerHTML = '&#8544;-1-a';
    label[1].innerHTML = '&#8544;-1-b';
    label[2].innerHTML = '&#8544;-2';
    label[0].style.display = 'inline-block';
    label[1].style.display = 'inline-block';
    label[2].style.display = 'inline-block';
}
function displayI1a() {
    dgs[0].setVisible(true);
    dgs[0].setIter(50);
    dgs[0].F.setValue([1, 0, 0, 1, 1, 0]);
    dgs[0].F.setUsage('XXXXXX');
    dgs[0].G.setValue([1, 0, 0, 1, 0, 1]);
    dgs[0].G.setUsage('XXXXXX');
    dgs[1].setVisible(true);
    dgs[1].F.setValue([1, 0, 0, 1, 1, 0]);
    dgs[1].F.setUsage('XXXXXX');
    dgs[1].G.setValue([1, 0, 1, 1, 0, 1]);
    dgs[1].G.setUsage('XXXXXF');
    dgs[2].setVisible(true);
    dgs[2].F.setValue([1, 0, 0, 1, 1, 0]);
    dgs[2].F.setUsage('XXXXXX');
    dgs[2].G.setValue([1, 0, 1, 1, 2, -1]);
    dgs[2].G.setUsage('XXFXFF');
    // dgs[3].setVisible(true); // degenearted
    // dgs[3].F.setValue([1, 0, 0, 1, 1, 0]);
    // dgs[3].F.setUsage('XXXXXX');
    // dgs[3].G.setValue([1, 0, 1, 1, 0, 0]);
    // dgs[3].G.setUsage('XXXXXX')
}
function displayI1b() {
    dgs[0].setVisible(true);
    dgs[0].setIter(30);
    dgs[0].setInit(0, -1);
    dgs[0].F.setValue([1, 0, 0, 1, 1, 0]);
    dgs[0].F.setUsage('XXXXXX');
    dgs[0].G.setValue([1, 0, 0, 2, 1, 0]);
    dgs[0].G.setUsage('XXXFFX');
    dgs[0].G.avoid1(3);
    dgs[1].setVisible(true);
    dgs[1].setIter(100);
    dgs[1].F.setValue([1, 0, 0, 1, 1, 0]);
    dgs[1].F.setUsage('XXXXXX');
    dgs[1].G.setValue([1, 0, -1, 2, 1, 2]);
    dgs[1].G.setUsage('XXFFFF');
    dgs[1].G.avoid1(3);
}
function displayI2() {
    dgs[0].setVisible(true);
    dgs[0].setIter(500);
    dgs[0].setInit(0, -1);
    dgs[0].F.setValue([2, 0, 0, 2, 0, 0]);
    dgs[0].F.setUsage('RXXRXX');
    dgs[0].F.avoid1(0);
    dgs[0].F.avoid1(3);
    dgs[0].F.addRelation(0, 3);
    dgs[0].G.setValue([1, 0, 1, 1, 0, 0]);
    dgs[0].G.setUsage('FFFFXX');
    dgs[1].setVisible(true);
    dgs[1].setIter(6);
    dgs[1].setInit(1, 0);
    dgs[1].F.setValue([2, 0, 0, 2, 0, 0]);
    dgs[1].F.setUsage('RXXRXX');
    dgs[1].F.avoid1(0);
    dgs[1].F.avoid1(3);
    dgs[1].F.addRelation(0, 3);
    dgs[1].G.setValue(['cos(pi/6)', 'sin(pi/6)', '-sin(pi/6)', 'cos(pi/6)', '0', '0']);
    dgs[1].G.setUsage('RRRRXX');
    dgs[1].G.addRelation(0, 3);
    dgs[1].G.addRelation(1, 2, true);
    dgs[2].setVisible(true);
    dgs[2].setIter(12);
    dgs[2].setInit(1, 0);
    dgs[2].F.setValue([2, 0, 0, 2, 0, 0]);
    dgs[2].F.setUsage('RXXRXX');
    dgs[2].F.avoid1(0);
    dgs[2].F.avoid1(3);
    dgs[2].F.addRelation(0, 3);
    dgs[2].G.setValue(['2cos(pi/6)', '2sin(pi/6)', '-2sin(pi/6)', '2cos(pi/6)', '0', '0']);
    dgs[2].G.setUsage('RRRRXX');
    dgs[2].G.addRelation(0, 3);
    dgs[2].G.addRelation(1, 2, true);
    dgs[3].setVisible(true);
    dgs[3].setIter(50);
    dgs[3].F.setValue([2, 0, 0, 2, 0, 0]);
    dgs[3].F.setUsage('RXXRXX');
    dgs[3].F.avoid1(0);
    dgs[3].F.avoid1(3);
    dgs[3].F.addRelation(0, 3);
    dgs[3].G.setValue([1.1, 1.3, -1.2, 1.5, 0, 0]);
    dgs[3].G.setUsage('FFFFXX');
}
export { revealSubtypes, displayI1a, displayI1b, displayI2 };
