/*
  Imports
*/

import { assert } from 'chai';

import { vals, fns } from '../test/src.test.js';

import { pipe, applyIfProp } from '../lib/utils.js';

/*
  Assertions
*/

describe('utils.js', () => {

  describe('pipe', () => {

    const pipeResultFns1 = pipe(fns.incrementBy1);
    const pipeResultFns2 = pipe(fns.incrementBy1, fns.double);
    const pipeResultFns3 = pipe(fns.incrementBy1, fns.double, fns.square);

    it('returns a function (pipeForFns)', () => {
      assert.isFunction(pipeResultFns1);
      assert.isFunction(pipeResultFns2);
      assert.isFunction(pipeResultFns3);
    });

    describe('pipeForFns (incrementBy1, incrementBy1Double, incrementBy1DoubleSquare)', () => {

      it('returns the result of a value transformed by each argument to pipe in order', () => {
        const incrementBy1Result = pipeResultFns1(1);
        const incrementBy1DoubleResult = pipeResultFns2(1);
        const incrementBy1DoubleSquareResult = pipeResultFns3(1);
        assert.equal(incrementBy1Result, 2);
        assert.equal(incrementBy1DoubleResult, 4);
        assert.equal(incrementBy1DoubleSquareResult, 16);
      });
    });
  });

  describe('applyIfProp', () => {

    const applyIfPropResult = applyIfProp('n');

    it('returns a function (applyIfPropForPropPassed)', () => {
      assert.isFunction(applyIfPropResult);
    });

    describe('applyIfPropForPropPassed', () => {

      const applyIfPropForPropPassedResult = applyIfPropResult(fns.incrementPropNBy1);

      it('returns a function (applyIfPropForPropFnPassed)', () => {
        assert.isFunction(applyIfPropForPropPassedResult);
      });

      describe('applyIfPropForPropFnPassed', () => {

        it('returns the object passed if no property name matches the first argument to applyIfProp', () => {
          const obj = {};
          const applyIfPropForPropFnPassedResult = applyIfPropForPropPassedResult(obj);
          assert.equal(applyIfPropForPropFnPassedResult, obj);
        });

        it('returns the result of the second argument to applyIfProp invoked with the object passed ' +
           'if a property name matches the first argument', () => {
          const objWProp = { n: 1 };
          const applyIfPropForPropFnPassedResult = applyIfPropForPropPassedResult(objWProp);
          assert.equal(applyIfPropForPropFnPassedResult, objWProp);
          assert.equal(applyIfPropForPropFnPassedResult.n, 2);
        });
      });
    });
  });
});
