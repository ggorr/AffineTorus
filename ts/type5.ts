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

function displayV() {
    dgs[0].setVisible(true);
    dgs[0].F.setValue([1, 0, 0.1, 1.1, 0, 0]);
    dgs[0].F.setUsage('FFFFFF');

    dgs[0].G.setValue([1.2, 0, 0, 1.2, 2, 0]);
    dgs[0].G.setUsage('FFFFFF')

    dgs[1].setVisible(true);
    dgs[1].setInit(0, 1);
    dgs[1].F.setValue([2, 0, -0.5, 1.5, 0, 0]);
    dgs[1].F.setUsage('FFFFFF');

    dgs[1].G.setValue([1.2, 0, 0.4, 1.6, 0, 0]);
    dgs[1].G.setUsage('FFFFFF')

    dgs[2].setVisible(true);
    dgs[2].F.setValue([1, 0, 0, 1, 1, 0])
    dgs[2].F.setUsage('FFFFFF');

    dgs[2].G.setValue([1, 0, 0, 1, 0, 1]);
    dgs[2].G.setUsage('FFFFFF')
}

export { revealSubtypes, displayV };