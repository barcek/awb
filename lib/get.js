/*
    Imports
*/

import beautify from 'js-beautify';

/*
    Functions
*/

const HTMLPrettify = (indent_size = 2) => str =>
    beautify.html(str, {
        indent_inner_html: true,
        indent_size
    });

/*
    Functions
*/

export {
    HTMLPrettify
};
