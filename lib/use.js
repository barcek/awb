/*
    Imports
*/

import { pipe, applyIfProp } from './utils.js';

/*
    Element handling
*/

const flattenIfDOMTree = obj =>
    applyIfProp('DOMTree')(obj => obj.DOMTree)(obj);

const reduceSubtrees = reduceSubtree => root =>
    Array.from(root.children).reduce(reduceSubtree, root);

/*
    DOMTree handling
*/

const handleDOMTree = handleRootElement => root => {

    const handleSubtrees = reduceSubtrees((acc, subtree) => {
            subtree = handleDOMTree(handleRootElement)(subtree);
            acc.appendChild(subtree);
            return acc;
        });

    const handleAnySubtrees = applyIfProp('children')(handleSubtrees);

    return pipe(
        handleRootElement,
        flattenIfDOMTree,
        handleAnySubtrees
    )(root);
};

/*
    Exports
*/

export {
    handleDOMTree,
    flattenIfDOMTree
};
