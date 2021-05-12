/*
    Imports
*/

import { assert } from 'chai';

import { vals, fns } from './src.test.js';

import Awb from '../lib/awb.js';

/*
    Assertions
*/

describe('Awb (constructor)', () => {

    const DOMTree = vals.tree.ify(vals.tmpl.list);
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
            const DOMTree = vals.tree.ify(vals.tmpl.list);
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

        it('has a serialize method', () => {
            assert.isFunction(awbResult.serialize);
        });

        describe('.map (method)', () => {

            it('returns an instance with no changes mapped ' +
                'to the DOMTree property if passed no function', () => {
                const DOMTree = vals.tree.ify(vals.tmpl.list);
                const awbMapEmptyResult = Awb.of(DOMTree).map();
                assert.equal(awbMapEmptyResult.DOMTree.outerHTML, vals.html.list);
            });

            it('returns an instance with the corresponding changes mapped ' +
                'to the DOMTree property if passed a function', () => {
                const DOMTree = vals.tree.ify(vals.tmpl.list);
                let awbMapResult = Awb.of(DOMTree).map(fns.cAdder);
                assert.equal(awbMapResult.DOMTree.outerHTML, vals.html.listCAdded);
            });
        });

        describe('.join (method)', () => {

            it('returns the DOMTree property', () => {
                const DOMTree = vals.tree.ify(vals.tmpl.list);
                const awbJoinResult = Awb.of(DOMTree).join();
                assert.equal(awbJoinResult, DOMTree);
            });
        });

        describe('.chain (method)', () => {

            it('returns an instance with no changes mapped ' +
                'to the DOMTree property if passed a function returning an instance', () => {
                const DOMTree = vals.tree.ify(vals.tmpl.list);
                const awbChainEmptyResult = Awb.of(DOMTree).chain();
                assert.equal(awbChainEmptyResult.DOMTree.outerHTML, vals.html.list);
            });

            it('returns an instance with the corresponding changes mapped ' +
                'to the DOMTree property if passed a function returning an instance', () => {
                const DOMTree = vals.tree.ify(vals.tmpl.list);
                const awbChainResult = Awb.of(DOMTree).chain(fns.liftCAdder);
                assert.equal(awbChainResult.DOMTree.outerHTML, vals.html.listLiftCAdded);
            });
        });

        describe('.serialize (method)', () => {

            it('returns the outer HTML of the DOMTree property ' +
                'without whitespace', () => {
                const DOMTree = vals.tree.ify(vals.tmpl.list);
                const awbSerializeDefaultResult = Awb.of(DOMTree).serialize();
                assert.equal(awbSerializeDefaultResult, vals.html.list);
            });

            it('returns the outer HTML of the DOMTree property ' +
                'with the indent passed (4)', () => {
                const DOMTree = vals.tree.ify(vals.tmpl.list);
                const awbSerializeIndent4Result = Awb.of(DOMTree).serialize(4);
                assert.equal(awbSerializeIndent4Result, vals.html.listIndent4);
            });
        });
    });
});
