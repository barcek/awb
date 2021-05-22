/*
    Imports
*/

import Awb from '../lib/awb.js';
import { objTreeify } from '../lib/set.js';

/*
    Test values
*/

const vals = {

    html: {

        list: '<ul id="test-list-1-id" class="test-class-1 test-class-2"><li>Test list 1 item 1 text.</li><li><ul id="test-list-2-id"><li>Test list 2 item 1 text.</li></ul></li></ul>',
        listCAdded: '<ul id="test-list-1-id" class="test-class-1 test-class-2 test-class-3"><li>Test list 1 item 1 text.</li><li><ul id="test-list-2-id" class="test-class-3"><li>Test list 2 item 1 text.</li></ul></li></ul>',
        listCAddedNotTree: '<ul id="test-list-1-id" class="test-class-1 test-class-2 test-class-3"><li>Test list 1 item 1 text.</li><li><ul id="test-list-2-id"><li>Test list 2 item 1 text.</li></ul></li></ul>',
        listLiftCAdded: '<ul id="test-list-1-id" class="test-class-1 test-class-2"><li>Test list 1 item 1 text.</li><li><ul id="test-list-2-id" class="test-class-3"><li>Test list 2 item 1 text.</li></ul></li></ul>',
        listLiftCAddedNotTree: '<ul id="test-list-1-id" class="test-class-1 test-class-2"><li>Test list 1 item 1 text.</li><li><ul id="test-list-2-id"><li>Test list 2 item 1 text.</li></ul></li></ul>',
        listIndent4: '<ul id="test-list-1-id" class="test-class-1 test-class-2">\n    <li>Test list 1 item 1 text.</li>\n    <li>\n        <ul id="test-list-2-id">\n            <li>Test list 2 item 1 text.</li>\n        </ul>\n    </li>\n</ul>'
    },

    tmpl: {

        list: {

            n: 'ul',
            as: {
                id: 'test-list-1-id',
                cs: ['test-class-1', 'test-class-2']
            },
            ds: [
                {
                    n: 'li',
                    t: 'Test list 1 item 1 text.'
                },
                {
                    n: 'li',
                    ds: [
                        {
                            n: 'ul',
                            as: {
                                id: 'test-list-2-id'
                            },
                            ds: [
                                {
                                    n: 'li',
                                    t: 'Test list 2 item 1 text.'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },

    tree: {

        ify: objTreeify
    }
};

/*
    Test functions
*/

const cAdder = element => {
    if (element.nodeName === 'UL') {
        element.classList.add('test-class-3');
    };
    return element;
};

const liftCAdder = element => {
    if (element.id === 'test-list-2-id') {
        return Awb.of(element).map(element => cAdder(element));
    };
    return element;
}

const tAppender = DOMTree1 => element => {};

const fns = {
    cAdder,
    liftCAdder,
    tAppender
};

export {
    vals,
    fns
};
