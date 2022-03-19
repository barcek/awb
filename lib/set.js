/*
  Imports
*/

import { JSDOM } from 'jsdom';

import { pipe } from './utils.js';

/*
  Instances
*/

const dom = new JSDOM('');
const parser = new dom.window.DOMParser();

/*
  Functions
*/

/*
  HTMLTreeify
*/

const createDocument = str =>
  /*
    Returns an HTML document with content generated
    from the HTML string 'str' appended to the body.
  */
  parser.parseFromString(str, 'text/html');

const extractDOMTree = document =>
  /*
    Returns any DOMTree present as the first element
    of the body of the HTML document 'document'.
  */
  document.body.firstElementChild;

const HTMLTreeify = (str = '<div></div>') =>
  /*
    Returns a DOMTree generated from the HTML string
    'str' being the first such if one among siblings.
  */
  pipe(
    createDocument,
    extractDOMTree
  )(str);

/*
  objTreeify
*/

const createRootElement = name =>
  /*
    Returns an HTML element corresponding to 'name'.
  */
  dom.window.document.createElement(name);

const setAttributes = attrs => element =>
  /*
    Returns 'element' with an attribute set for each
    key-value pair in 'attrs', and 'cs' to classList.
  */
  Object.keys(attrs).reduce((acc, key) => {
    key === 'cs'
      ? acc.classList.add(...attrs[key])
      : acc.setAttribute(key, attrs[key]);
    return acc;
  }, element);

const setTextContent = text => element => {
  /*
    Returns 'element' with textContent set to 'text'.
  */
  element.textContent = text;
  return element;
};

const addDescendants = descs => element =>
  /*
    Returns 'element' with a DOMTree generated and
    appended recursively for each object in 'descs'.
  */
  descs.reduce((acc, desc) => {
    acc.appendChild(objTreeify(desc));
    return acc;
  }, element);

const objTreeify = ({ n = 'div', as = {}, t = '', ds = [] } = {}) =>
  /*
    Returns a DOMTree generated from an object
    with the following keys each of the given type:

    n    str   element name, e.g. 'div'
    as   obj   attributes as key-value pairs, incl.
               classes (KEY cs TYPE arr) (optional)
    t    str   text content (optional)
    ds   arr   dependents in this format (optional)

    {
      n: 'p',
      as: { id: 'id', cs: [ 'cls-1', 'cls-2' ] },
      t: 'A paragraph with an id & two classes.',
      ds: [] // no descendents; key unnecessary
    }
  */
  pipe(
    createRootElement,
    setAttributes(as),
    setTextContent(t),
    addDescendants(ds)
  )(n);

/*
  Exports
*/

export {
  HTMLTreeify,
  objTreeify
};
