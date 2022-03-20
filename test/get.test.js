/*
  Imports
*/

import { assert } from 'chai';

import { vals } from './src.test.js';

import { HTMLPrettify } from '../lib/get.js';

/*
  Assertions
*/

describe('get.js', () => {

  describe('HTMLPrettify', () => {

    const HTMLPrettifyResult = HTMLPrettify();

    it('returns a function (HTMLPrettifyIndentDefault)', () => {
      assert.isFunction(HTMLPrettifyResult);
    });

    describe('HTMLPrettifyIndentZero (HTMLPrettify(0))', () => {

      it('returns an HTML string of indent 0 passed unchanged', () => {
        const HTMLPrettifyIndentZeroResult = HTMLPrettify(0)(vals.html.list);
        assert.equal(HTMLPrettifyIndentZeroResult, vals.html.list);
      });

      it('returns an HTML string of indent 2 passed without whitespace', () => {
        const HTMLPrettifyIndentZeroResult = HTMLPrettify(0)(vals.html.listIndent2);
        assert.equal(HTMLPrettifyIndentZeroResult, vals.html.list);
      });

      it('returns an HTML string of indent 4 passed without whitespace', () => {
        const HTMLPrettifyIndentZeroResult = HTMLPrettify(0)(vals.html.listIndent4);
        assert.equal(HTMLPrettifyIndentZeroResult, vals.html.list);
      });
    });

    describe('HTMLPrettifyIndentDefault (HTMLPrettify(), i.e. 2)', () => {

      it('returns an HTML string of indent 0 passed with an indent of 2', () => {
        const HTMLPrettifyIndentDefaultResult = HTMLPrettifyResult(vals.html.list);
        assert.equal(HTMLPrettifyIndentDefaultResult, vals.html.listIndent2);
      });

      it('returns an HTML string of indent 2 passed unchanged', () => {
        const HTMLPrettifyIndentDefaultResult = HTMLPrettifyResult(vals.html.listIndent2);
        assert.equal(HTMLPrettifyIndentDefaultResult, vals.html.listIndent2);
      });

      it('returns an HTML string of indent 4 passed with an indent of 2', () => {
        const HTMLPrettifyIndentDefaultResult = HTMLPrettifyResult(vals.html.listIndent4);
        assert.equal(HTMLPrettifyIndentDefaultResult, vals.html.listIndent2);
      });
    });

    describe('HTMLPrettifyIndentNonZeroNonDefault (HTMLPrettify(4))', () => {

      it('returns an HTML string of indent 0 passed with an indent of 4', () => {
        const HTMLPrettifyIndentNonZeroNonDefaultResult = HTMLPrettify(4)(vals.html.list);
        assert.equal(HTMLPrettifyIndentNonZeroNonDefaultResult, vals.html.listIndent4);
      });

      it('returns an HTML string of indent 2 passed with an indent of 4', () => {
        const HTMLPrettifyIndentNonZeroNonDefaultResult = HTMLPrettify(4)(vals.html.listIndent2);
        assert.equal(HTMLPrettifyIndentNonZeroNonDefaultResult, vals.html.listIndent4);
      });

      it('returns an HTML string of indent 4 passed unchanged', () => {
        const HTMLPrettifyIndentNonZeroNonDefaultResult = HTMLPrettify(4)(vals.html.listIndent4);
        assert.equal(HTMLPrettifyIndentNonZeroNonDefaultResult, vals.html.listIndent4);
      });
    });
  });
});
