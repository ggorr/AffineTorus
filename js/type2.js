'use strict';
import { radio, label, domGroups as dgs } from './elememts.js';
function revealSubtypes() {
    radio[0].style.display = 'inline-block';
    radio[1].style.display = 'inline-block';
    radio[2].style.display = 'inline-block';
    label[0].innerHTML = '&#8545;-1';
    label[1].innerHTML = '&#8545;-2';
    label[2].innerHTML = '&#8545;-3';
    label[0].style.display = 'inline-block';
    label[1].style.display = 'inline-block';
    label[2].style.display = 'inline-block';
}
function displayII1() {
    dgs[0].setVisible(true);
    dgs[0].setInit(0, -1);
    dgs[0].F.setValue([1, 0, 1, 1, 0, 0]);
    dgs[0].F.setUsage('XXXXXX');
    dgs[0].G.setValue([2, 0, 3, 2, 0, 0]);
    dgs[0].G.setUsage('RXFRXX');
    dgs[0].G.addRelationAvoid1(0, 3);
    dgs[1].setVisible(true);
    dgs[1].setInit(0, -1);
    dgs[1].F.setValue([1, 0, 1, 1, 0, 0]);
    dgs[1].F.setUsage('XXXXXX');
    dgs[1].G.setValue([2, 0, 1, 2, 1, 0]);
    dgs[1].G.setUsage('RXFRFX');
    dgs[1].G.addRelationAvoid1(0, 3);
    // dgs[2].setVisible(true); //degenerated
    // dgs[2].F.setValue([1, 0, 1, 1, 0, 0]);
    // dgs[2].F.setUsage('XXXXXX');
    // dgs[2].G.setValue([1, 0, 1, 1, 1, 0]);
    // dgs[2].G.setUsage('XXFXFX')
}
function displayII2() {
    dgs[0].setVisible(true);
    dgs[0].setIter(100);
    dgs[0].F.setValue([1, 0, 1, 1, 0, 1]);
    dgs[0].F.setUsage('XXXXXX');
    dgs[0].G.setValue([1, 0, 1, 1, 5, 1]);
    dgs[0].G.setUsage('XXRXFR');
    dgs[0].G.addRelation(2, 5);
}
function displayII3() {
    dgs[0].setVisible(true);
    dgs[0].setInit(0, -1);
    dgs[0].F.setValue([2, 0, 1, 2, 0, 0]);
    dgs[0].F.setUsage('RXXRXX');
    dgs[0].F.addRelationAvoid1(0, 3);
    dgs[0].G.setValue([1.1, 0, 1.2, 1.1, 0, 0]);
    dgs[0].G.setUsage('RXFRXX');
    dgs[0].G.addRelation(0, 3);
}
export { revealSubtypes, displayII1, displayII2, displayII3 };