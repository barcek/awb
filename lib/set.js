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

const createDocument = str => parser.parseFromString(str, 'text/html');

const extractDOMTree = document => document.body.firstElementChild;

const HTMLTreeify = (str = '<div></div>') =>
    pipe(
        createDocument,
        extractDOMTree
    )(str);

/*
    objTreeify
*/

const createRootElement = name => dom.window.document.createElement(name);

const setAttributes = attrs => element =>
    Object.keys(attrs).reduce((acc, key) => {
        key === 'cs'
            ? acc.classList.add(...attrs[key])
            : acc.setAttribute(key, attrs[key]);
        return acc;
    }, element);

const setTextContent = text => element => {
    element.textContent = text;
    return element;
};

const addDescendants = descs => element =>
    descs.reduce((acc, desc) => {
        acc.appendChild(objTreeify(desc));
        return acc;
    }, element);

const objTreeify = ({ n = 'div', as = {}, t = '', ds = [] } = {}) =>
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
