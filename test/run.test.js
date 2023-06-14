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
    const runInput = {
      on: (event, handle) => { handle(vals.html.list) }
    }

    describe('runOutputHelp', () => {

      const headings = ['Usage:', 'Methods:', 'Options:'];

      it('logs a string being help output if no option flag is passed', () => {
        run(vals.data.path, [], 0, runLog);
        for(let heading of headings) assert.include(runLogResult, heading);
        assert.include(runLogResult, vals.data.path);
        for(let methodIO of vals.code.methodsIO) assert.include(runLogResult, `.${methodIO}(`);
        for(let methodTx of vals.code.methodsTx) assert.include(runLogResult, methodTx);
        for(let flagLong of vals.code.flagsLong) assert.include(runLogResult, flagLong);
      });
    });

    describe('runOutputOptionShow', () => {

      it('logs a string indicating absence if no method matches the array items passed', () => {
        run(vals.data.path, ['prog', 'file', '--show', 'none'], 0, runLog);
        assert.include(runLogResult, 'No method found for \'none\'');
      });

      const elements = [')', '{', '/*', '*/', '}'];

      it('logs a string being show option output for a single method if passed the corresponding array items', () => {
        run(vals.data.path, ['prog', 'file', '--show', 'of'], 0, runLog);
        assert.include(runLogResult, 'of(');
        for(let element of elements) assert.include(runLogResult, element);
      });

      it('logs a string being show option output for all methods if passed the corresponding array items', () => {
        run(vals.data.path, ['prog', 'file', '--show', 'all'], 0, runLog);
        for(let element of elements) assert.include(runLogResult, element);
        for(let methodIO of vals.code.methodsIO) assert.include(runLogResult, `${methodIO}(`);
        for(let methodTx of vals.code.methodsTx) assert.include(runLogResult, `${methodTx}(`);
      });
    });

    describe('runOutputStdin', async () => {

      it('logs a string indicating absence if passed input and no module path is included in the array items passed', async () => {
        await run(vals.data.path, ['prog', 'file'], 0, runLog, runInput);
        assert.include(runLogResult, 'No module path provided');
      });

      it('logs a string indicating absence if passed input and no method name is included in the array items passed', async () => {
        await run(vals.data.path, ['prog', 'file', 'test/src.test.js'], 0, runLog, runInput);
        assert.include(runLogResult, 'No method name provided');
      });

      it('logs an HTML string mapped with no indent if passed the corresponding array items and input', async () => {
        await run(vals.data.path, ['prog', 'file', 'test/src.test.js', 'cAdder'], 0, runLog, runInput);
        assert.equal(runLogResult, vals.html.listCAdded);
      });

      it('logs an HTML string mapped with an indent if passed the corresponding array items and input', async () => {
        await run(vals.data.path, ['prog', 'file', 'test/src.test.js', 'ignore', '2'], 0, runLog, runInput);
        assert.equal(runLogResult, vals.html.listIndent2);
      });
    });
  });
});
