/*
  Imports
*/

import beautify from 'js-beautify';

/*
  Options
*/

const prettifyOptsBase = {
  indent_inner_html: true
}

const prettifyOptsZero = {
  ...prettifyOptsBase,
  eol: ''
}

const prettifyOptsNonZero = {
  ...prettifyOptsBase,
  preserve_newlines: false,
  end_with_newline:  false
}

/*
  Functions
*/

const HTMLPrettify = (indent_size = 2) => str =>
  /*
    Returns the HTML string 'str' with indentation
    by a number of spaces equal to 'indent_size',
    without newlines if 'indent_size' is 0.
  */
  beautify.html(str, { indent_size, ...(indent_size ? prettifyOptsNonZero : prettifyOptsZero) });

/*
  Exports
*/

export {
  HTMLPrettify
};
