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
    by a number of spaces equal to 'indent_size',
    without newlines if 'indent_size' is 0.
  */
  indent_size == 0
    ? beautify.html(str, {
        indent_inner_html: true,
        indent_size,
        eol: ''
      })
    : beautify.html(str, {
        indent_inner_html: true,
        indent_size,
        preserve_newlines: false,
        end_with_newline: false
      });

/*
  Exports
*/

export {
  HTMLPrettify
};
