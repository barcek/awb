/*
    Imports
*/

import beautify from 'js-beautify';

/*
    Functions
*/

const HTMLPrettify = (indent_size = 2) => str =>
    /*
        Returns the HTML string 'str' with indentation
        by a number of spaces equal to 'indent_size'.
    */
    beautify.html(str, {
        indent_inner_html: true,
        indent_size
    });

/*
    Exports
*/

export {
    HTMLPrettify
};
