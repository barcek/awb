/*
    Imports
*/

import { HTMLTreeify, objTreeify } from './set.js';
import { handleDOMTree, flattenIfDOMTree } from './use.js';
import { HTMLPrettify } from './get.js';

/*
    Constructor
*/

const Awb = function(DOMTree) {
    this.DOMTree = DOMTree;
};

/*
    Static methods
*/

Awb.of = DOMTree => {
    return new Awb(DOMTree);
};

Awb.sow = (seed = '<div></div>') => {
    return typeof seed === 'string'
        ? Awb.of(HTMLTreeify(seed))
        : Awb.of(objTreeify(seed));
};

/*
    Prototype
*/

Awb.prototype.map = function(handleElement = x => x, asTree = true) {
    return asTree
        ? Awb.of(handleDOMTree(handleElement)(this.DOMTree))
        : Awb.of(handleElement(this.DOMTree));
};

Awb.prototype.join = function() {
    return handleDOMTree(flattenIfDOMTree)(this.DOMTree);
};

Awb.prototype.chain = function(handleElement = x => Awb.of(x), asTree = true) {
    return Awb.of(this.map(handleElement, asTree).join());
};

Awb.prototype.ap = function(instance, asTree = true) {
    return instance.map(this.DOMTree, asTree);
};

Awb.prototype.serialize = function(indent = 0) {
    return indent > 0
        ? HTMLPrettify(indent)(this.DOMTree.outerHTML)
        : this.DOMTree.outerHTML;
};

/*
    Exports
*/

export default Awb;
