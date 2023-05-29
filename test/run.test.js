/*
  Imports
*/

import { assert } from 'chai';

import { vals } from './src.test.js';

import run from '../lib/run.js';

/*
  Assertions
*/

describe('run.js', () => {

  describe('run', () => {

    let runLogResult;
    const runLog = (text) => { runLogResult = text };

    describe('runOutputHelp', () => {

      const headings = ['Usage:', 'Methods:', 'Options:'];

      it('logs a string being help output if no option flag is passed', () => {
        run(vals.data.path, [], runLog);
        for(let heading of headings) assert.include(runLogResult, heading);
        assert.include(runLogResult, vals.data.path);
        for(let methodIO of vals.code.methodsIO) assert.include(runLogResult, `.${methodIO}(`);
        for(let methodTx of vals.code.methodsTx) assert.include(runLogResult, methodTx);
        for(let flagLong of vals.code.flagsLong) assert.include(runLogResult, flagLong);
      });
    });

    describe('runOutputOptionShow', () => {

      it('logs a string indicating absence if no method matches the array items passed', () => {
        run(vals.data.path, ['prog', 'file', '--show', 'none'], runLog);
        assert.include(runLogResult, 'No method found for \'none\'');
      });

      const elements = [')', '{', '/*', '*/', '}'];

      it('logs a string being show option output for a single method if passed the corresponding array items', () => {
        run(vals.data.path, ['prog', 'file', '--show', 'of'], runLog);
        assert.include(runLogResult, 'of(');
        for(let element of elements) assert.include(runLogResult, element);
      });

      it('logs a string being show option output for all methods if passed the corresponding array items', () => {
        run(vals.data.path, ['prog', 'file', '--show', 'all'], runLog);
        for(let element of elements) assert.include(runLogResult, element);
        for(let methodIO of vals.code.methodsIO) assert.include(runLogResult, `${methodIO}(`);
        for(let methodTx of vals.code.methodsTx) assert.include(runLogResult, `${methodTx}(`);
      });
    });
  });
});
