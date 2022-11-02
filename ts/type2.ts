'use strict';

import { radio, label, domGroups as dgs } from './elememts.js';

function revealSubtypes() {
    radio.map(r => r.style.display = 'inline-block');
    label.map(l => l.style.display = 'inline-block');

    label[0].innerHTML = '&#8545;-1';
    label[1].innerHTML = '&#8545;-2';
    label[2].innerHTML = '&#8545;-3';
}

function displayII1() {
    dgs[0].setVisible(true);
    dgs[0].setInit(0, -1);
    
    dgs[0].F.setValue([1, 0, 1, 1, 0, 0]);
    dgs[0].F.setUsage('XXXXXX');
    dgs[0].G.setValue([2, 0, 3, 2, 0, 0]);
    dgs[0].G.setUsage('AXFAXX');
    dgs[0].G.addRelationAvoid1(0, 3);

    dgs[1].setVisible(true);
    dgs[1].setInit(0, -1);

    dgs[1].F.setValue([1, 0, 1, 1, 0, 0]);
    dgs[1].F.setUsage('XXXXXX');
    dgs[1].G.setValue([2, 0, 1, 2, 1, 0]);
    dgs[1].G.setUsage('AXFAFX');
    dgs[1].G.addRelationAvoid1(0, 3);

    dgs[2].setVisible(true);
    dgs[2].setInit(0, -1);

    dgs[2].F.setValue([1, 0, 1, 1, 0, 0]);
    dgs[2].F.setUsage('XXXXXX');
    dgs[2].G.setValue([2, 0, 0, 2, 0, 0]);
    dgs[2].G.setUsage('AXFAFX');
    dgs[2].G.addRelationAvoid1(0, 3);


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
    dgs[0].G.setUsage('XXRXFR')
    dgs[0].G.addRelation(2, 5);
    
    dgs[1].setVisible(true);
    dgs[1].setIter(200);

    dgs[1].F.setValue([1, 0, 1, 1, 0, 1]);
    dgs[1].F.setUsage('XXXXXX');
    dgs[1].G.setValue([1, 0, 1, 1, 1, 1]);
    dgs[1].G.setUsage('XXRXFR')
    dgs[1].G.addRelation(2, 5);
}

function displayII3() {
    dgs[0].setVisible(true);    
    dgs[0].setInit(0, -1);

    dgs[0].F.setValue([2, 0, 1, 2, 0, 0]);
    dgs[0].F.setUsage('AXXAXX');
    dgs[0].F.addRelationAvoid1(0, 3);

    dgs[0].G.setValue([1.1, 0, 1.2, 1.1, 0, 0]);
    dgs[0].G.setUsage('RXFRXX')
    dgs[0].G.addRelation(0, 3);
    
    dgs[1].setVisible(true);    
    dgs[1].setInit(0, -1);
    dgs[1].setIter(100);

    dgs[1].F.setValue([2, 0, 1, 2, 0, 0]);
    dgs[1].F.setUsage('AXXAXX');
    dgs[1].F.addRelationAvoid1(0, 3);

    dgs[1].G.setValue([0.1, 0, 2, 0.1, 0, 0]);
    dgs[1].G.setUsage('RXFRXX')
    dgs[1].G.addRelation(0, 3);
}

export { revealSubtypes, displayII1, displayII2, displayII3 };