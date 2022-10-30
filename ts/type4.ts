'use strict';

import { radio, label, domGroups as dgs } from './elememts.js';

function revealSubtypes() {
    radio[0].style.display = 'none';
    radio[1].style.display = 'none';
    radio[2].style.display = 'none';
    label[0].style.display = 'none';
    label[1].style.display = 'none';
    label[2].style.display = 'none';
}

function displayIV() {
    dgs[0].setVisible(true);
    dgs[0].setIter(12);
    dgs[0].setInit(1, 0);

    dgs[0].F.setValue(['cos(pi/6)', '-sin(pi/6)', 'sin(pi/6)', 'cos(pi/6)', '0', '0']);
    dgs[0].F.setUsage('RRRRXX');
    dgs[0].F.addRelation(0, 3);
    dgs[0].F.addRelation(1, 2, true);

    dgs[0].G.setValue([2, 0, 0, 2, 0, 0]);
    dgs[0].G.setUsage('RRRRXX');
    dgs[0].G.addRelation(0, 3);
    dgs[0].G.addRelation(1, 2, true);

    dgs[1].setVisible(true);
    dgs[1].setIter(12);
    dgs[1].setInit(1, 0);

    dgs[1].F.setValue(['2cos(pi/6)', '-2sin(pi/6)', '2sin(pi/6)', '2cos(pi/6)', '0', '0']);
    dgs[1].F.setUsage('RRRRXX');
    dgs[1].F.addRelation(0, 3);
    dgs[1].F.addRelation(1, 2, true);

    dgs[1].G.setValue(['2cos(pi/6)', '2sin(pi/6)', '-2sin(pi/6)', '2cos(pi/6)', '0', '0']);
    dgs[1].G.setUsage('RRRRXX');
    dgs[1].G.addRelation(0, 3);
    dgs[1].G.addRelation(1, 2, true);

    dgs[2].setVisible(true);
    dgs[2].setIter(100);

    dgs[2].F.setValue([2, -1, 1, 2, 0, 0]);
    dgs[2].F.setUsage('RRRRXX');
    dgs[2].F.addRelation(0, 3);
    dgs[2].F.addRelation(1, 2, true);

    dgs[2].G.setValue([2, 1, -1, 2, 0, 0]);
    dgs[2].G.setUsage('RRRRXX');
    dgs[2].G.addRelation(0, 3);
    dgs[2].G.addRelation(1, 2, true);

}

export { revealSubtypes, displayIV };