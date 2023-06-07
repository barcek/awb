/*
  Imports
*/

import { assert } from 'chai';

import { vals, fns } from './src.test.js';

import { handleDOMTree, flattenIfDOMTree } from '../lib/use.js';

/*
  Assertions
*/

describe('use.js', () => {

  describe('handleDOMTree', () => {

    const handleDOMTreeResult = handleDOMTree(fns.liftCAdder);

    it('returns a function (handleDOMTreeForHandleRootElementPassed)', () => {
      assert.isFunction(handleDOMTreeResult);
    });

    describe('handleDOMTreeForHandleRootElementPassed', () => {

      it('returns the DOMTree passed with the corresponding changes made and subtrees flattened', () => {
        const DOMTree = vals.tree.ifyObj(vals.tmpl.list);
        const handleDOMTreeForHandleRootElementPassedResult = handleDOMTreeResult(DOMTree);
        assert.equal(handleDOMTreeForHandleRootElementPassedResult.outerHTML, vals.html.listLiftCAdded);
      });
    });
  });

  describe('flattenIfDOMTree', () => {

    it('returns the object passed if no DOMTree property is present', () => {
      const flattenIfDOMTreeEmptyResult = flattenIfDOMTree(vals.objs.empty);
      assert.equal(flattenIfDOMTreeEmptyResult, vals.objs.empty);
    });

    it('returns the DOMTree property if present on the object passed', () => {
      const flattenIfDOMTreeWithDOMTreeResult = flattenIfDOMTree(vals.objs.withDOMTree);
      assert.equal(flattenIfDOMTreeWithDOMTreeResult, vals.objs.withDOMTree.DOMTree);
    });
  });
});
