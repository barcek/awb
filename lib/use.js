/*
    Imports
*/

import { pipe, applyIfProp } from './utils.js';

/*
    Element handling
*/

const flattenIfDOMTree = obj =>
    /*
        Returns 'obj'.DOMTree if present, else 'obj'
    */
    applyIfProp('DOMTree')(obj => obj.DOMTree)(obj);

const reduceSubtrees = reduceSubtree => root =>
    /*
        Returns 'root' with 'reduceSubtree' applied
        for each element child of 'root'
    */
    Array.from(root.children).reduce(reduceSubtree, root);

/*
    DOMTree handling
*/

const handleDOMTree = handleRootElement => root => {
    /*
        Returns 'root' with 'handleElement' applied
        to 'root' and any subtrees, and any DOMTree
        property on each node in the tree unwrapped
    */

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
