/*
  Imports
*/

import { assert } from 'chai';

import { utils, vals, fns } from './src.test.js';

import Awb from '../lib/awb.js';

/*
  Assertions
*/

describe('awb.js', () => {

  describe('Awb (constructor)', () => {

    const DOMTree = vals.tree.ifyObj(vals.tmpl.list);
    const awbResult = new Awb(DOMTree);

    it('returns an instance with the argument in the DOMTree property', () => {
      assert.instanceOf(awbResult, Awb);
      assert.equal(awbResult.DOMTree, DOMTree);
    });

    it('has the of method', () => {
      assert.isFunction(Awb.of);
    });

    it('has a sow method', () => {
      assert.isFunction(Awb.sow);
    });

    describe('.of (method)', () => {

      it('returns an instance with the argument in the DOMTree property', () => {
        const DOMTree = vals.tree.ifyObj(vals.tmpl.list);
        const awbOfResult = Awb.of(DOMTree);
        assert.instanceOf(awbOfResult, Awb);
        assert.equal(awbOfResult.DOMTree, DOMTree);
      });
    });

    describe('.sow (method)', () => {

      it('returns an instance with a single div in the DOMTree property ' +
         'if passed no argument', () => {
        const awbSowEmptyResult = Awb.sow();
        assert.equal(awbSowEmptyResult.DOMTree.outerHTML, '<div></div>');
      });

      it('returns an instance with the corresponding DOMTree property ' +
         'if passed an HTML string', () => {
        const awbSowHTMLResult = Awb.sow(vals.html.list);
        assert.equal(awbSowHTMLResult.DOMTree.outerHTML, vals.html.list);
      });

      it('returns an instance with the corresponding DOMTree property ' +
         'if passed a template object', () => {
        const awbSowObjResult = Awb.sow(vals.tmpl.list);
        assert.equal(awbSowObjResult.DOMTree.outerHTML, vals.html.list);
      });
    });

    describe('awb (instance)', () => {

      it('has the map method', () => {
        assert.isFunction(awbResult.map);
      });

      it('has the join method', () => {
        assert.isFunction(awbResult.join);
      });

      it('has the chain method', () => {
        assert.isFunction(awbResult.chain);
      });

      it('has the ap method', () => {
        assert.isFunction(awbResult.ap);
      });

      it('has a liftAN method', () => {
        assert.isFunction(awbResult.liftAN);
      });

      it('has a serialize method', () => {
        assert.isFunction(awbResult.serialize);
      });

      describe('.map (method)', () => {

        it('returns an instance with no changes made ' +
           'to the DOMTree property if passed no arguments', () => {
          const DOMTree = vals.tree.ifyObj(vals.tmpl.list);
          const awbMapEmptyResult = Awb.of(DOMTree).map();
          assert.equal(awbMapEmptyResult.DOMTree.outerHTML, vals.html.list);
        });

        it('returns an instance with the corresponding changes made ' +
           'to the DOMTree property if passed a function only', () => {
          const DOMTree = vals.tree.ifyObj(vals.tmpl.list);
          const awbMapResult = Awb.of(DOMTree).map(fns.cAdder);
          assert.equal(awbMapResult.DOMTree.outerHTML, vals.html.listCAdded);
        });

        it('returns an instance with the corresponding changes made ' +
           'to the DOMTree property if passed a function and false', () => {
          const DOMTree = vals.tree.ifyObj(vals.tmpl.list);
          const awbMapResult = Awb.of(DOMTree).map(fns.cAdder, false);
          assert.equal(awbMapResult.DOMTree.outerHTML, vals.html.listCAddedNotTree);
        });

        it('returns a function if passed a curried function and false', () => {
          const DOMTree = vals.tree.ifyObj(vals.tmpl.list);
          const tAppender2 = utils.curryN(fns.tAppender, 1);
          const awbMapResult = Awb.of(DOMTree).map(tAppender2, false);
          assert.isFunction(awbMapResult.DOMTree);
        });
      });

      describe('.join (method)', () => {

        it('returns the DOMTree property', () => {
          const DOMTree = vals.tree.ifyObj(vals.tmpl.list);
          const awbJoinResult = Awb.of(DOMTree).join();
          assert.equal(awbJoinResult, DOMTree);
        });
      });

      describe('.chain (method)', () => {

        it('returns an instance with no changes made ' +
           'to the DOMTree property if passed a function returning an instance', () => {
          const DOMTree = vals.tree.ifyObj(vals.tmpl.list);
          const awbChainEmptyResult = Awb.of(DOMTree).chain();
          assert.equal(awbChainEmptyResult.DOMTree.outerHTML, vals.html.list);
        });

        it('returns an instance with the corresponding changes made ' +
           'to the DOMTree property if passed only a function returning an instance', () => {
          const DOMTree = vals.tree.ifyObj(vals.tmpl.list);
          const awbChainResult = Awb.of(DOMTree).chain(fns.liftCAdder);
          assert.equal(awbChainResult.DOMTree.outerHTML, vals.html.listLiftCAdded);
        });

        it('returns an instance with the corresponding changes made ' +
           'to the DOMTree property if passed a function returning an instance and false', () => {
          const DOMTree = vals.tree.ifyObj(vals.tmpl.list);
          const awbChainResult = Awb.of(DOMTree).chain(fns.liftCAdder, false);
          assert.equal(awbChainResult.DOMTree.outerHTML, vals.html.listLiftCAddedNotTree);
        });
      });

      describe('.ap (method)', () => {

        it('returns an instance with the corresponding changes made ' +
           'to the DOMTree property if holding a partially applied function & ' +
           'passed an instance', () => {
          const DOMTree = vals.tree.ifyObj(vals.tmpl.list);
          const instance = Awb.of(vals.tree.ifyObj(vals.tmpl.list));
          const tAppender2 = utils.curryN(fns.tAppender, 1);
          const awbApResult = Awb.of(DOMTree).map(tAppender2).ap(instance);
          assert.equal(awbApResult.DOMTree.outerHTML, vals.html.listTAppended2);
          vals.data.hasTAppended = false;
        });

        it('returns an instance with the corresponding changes made ' +
           'to the DOMTree property if holding a partially applied function & ' +
           'passed an instance and false', () => {
          const DOMTree = vals.tree.ifyObj(vals.tmpl.list);
          const instance = Awb.of(vals.tree.ifyObj(vals.tmpl.list));
          const tAppender2 = utils.curryN(fns.tAppender, 1)
          const awbApResult = Awb.of(DOMTree).map(tAppender2).ap(instance, false);
          assert.equal(awbApResult.DOMTree.outerHTML, vals.html.listTAppended2NotTree);
          vals.data.hasTAppended = false;
        });
      });

      describe('.liftAN (method)', () => {

        it('returns an instance with the corresponding changes made ' +
           'to the DOMTree property if passed a function & multiple instances', () => {
          const DOMTree = vals.tree.ifyObj(vals.tmpl.list);
          const instance1 = Awb.of(vals.tree.ifyObj(vals.tmpl.list));
          const instance2 = Awb.of(vals.tree.ifyObj(vals.tmpl.list));
          const tAppender3 = utils.curryN(fns.tAppender, 2);
          const awbLiftANResult = Awb.of(DOMTree).liftAN(tAppender3, instance1, instance2);
          assert.equal(awbLiftANResult.DOMTree.outerHTML, vals.html.listTAppended3);
          vals.data.hasTAppended = false;
        });

        it('returns an instance with the corresponding changes made ' +
           'to the DOMTree property if passed a function, multiple instances & false', () => {
          const DOMTree = vals.tree.ifyObj(vals.tmpl.list);
          const instance1 = Awb.of(vals.tree.ifyObj(vals.tmpl.list));
          const instance2 = Awb.of(vals.tree.ifyObj(vals.tmpl.list));
          const tAppender3 = utils.curryN(fns.tAppender, 2);
          const awbLiftANResult = Awb.of(DOMTree).liftAN(tAppender3, instance1, instance2, false);
          assert.equal(awbLiftANResult.DOMTree.outerHTML, vals.html.listTAppended3NotTree);
          vals.data.hasTAppended = false;
        });
      });

      describe('.serialize (method)', () => {

        it('returns the outer HTML of a DOMTree property treeified from an HTML string ' +
           'of indent 2 without whitespace', () => {
          const DOMTree = vals.tree.ifyHTML(vals.html.listIndent2);
          const awbSerializeDefaultResult = Awb.of(DOMTree).serialize();
          assert.equal(awbSerializeDefaultResult, vals.html.list);
        });

        it('returns the outer HTML of a DOMTree property treeified from an HTML string ' +
           'of indent 2 with the indent passed (4)', () => {
          const DOMTree = vals.tree.ifyHTML(vals.html.listIndent2);
          const awbSerializeIndent4Result = Awb.of(DOMTree).serialize(4);
          assert.equal(awbSerializeIndent4Result, vals.html.listIndent4);
        });

        it('returns the outer HTML of a DOMTree property treeified from a template object ' +
           'without whitespace', () => {
          const DOMTree = vals.tree.ifyObj(vals.tmpl.list);
          const awbSerializeDefaultResult = Awb.of(DOMTree).serialize();
          assert.equal(awbSerializeDefaultResult, vals.html.list);
        });

        it('returns the outer HTML of a DOMTree property treeified from a template object ' +
           'with the indent passed (4)', () => {
          const DOMTree = vals.tree.ifyObj(vals.tmpl.list);
          const awbSerializeIndent4Result = Awb.of(DOMTree).serialize(4);
          assert.equal(awbSerializeIndent4Result, vals.html.listIndent4);
        });
      });
    });
  });
});
