/*
    Imports
*/

import { pipe, applyIfProp } from './utils.js';

/*
    Element handling
*/

const flattenIfDOMTree = applyIfProp('DOMTree')(obj => obj.DOMTree);

/*
    DOMTree handling
*/

const reduceSubtrees = handleElement => root => {
    return Array.from(root.children).reduce((acc, subtree) => {
        subtree = handleDOMTree(handleElement)(subtree);
        acc.appendChild(subtree);
        return acc;
    }, root);
};

const reduceIfSubtrees = pipe(reduceSubtrees, applyIfProp('children'));

const handleDOMTree = handleElement => root =>
    pipe(
        handleElement,
        flattenIfDOMTree,
        reduceIfSubtrees(handleElement)
    )(root);

/*
    Exports
*/

export {
    handleDOMTree,
    flattenIfDOMTree
};
