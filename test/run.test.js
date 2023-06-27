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

    const headings = ['Usage:', 'Methods:', 'Options:'];

    const assertOutputHelp = () => {
      for(let heading of headings) assert.include(runLogResult, heading);
      assert.include(runLogResult, vals.data.path);
      for(let methodIO of vals.code.methodsIO) assert.include(runLogResult, `.${methodIO}(`);
      for(let methodTx of vals.code.methodsTx) assert.include(runLogResult, methodTx);
      for(let flagWord of vals.code.flagsWord) assert.include(runLogResult, flagWord);
      for(let flagChar of vals.code.flagsChar) assert.include(runLogResult, flagChar);
    }

    describe('runOutputHelp', () => {

      it('logs a string being help output if no option flag is passed', () => {
        run(vals.data.path, [], 0, runLog);
        assertOutputHelp()
      });

      it('logs a string being help output if a help option flag is passed', () => {

        run(vals.data.path, ['prog', 'file', '--help'], 0, runLog);
        assertOutputHelp()

        run(vals.data.path, ['prog', 'file', '-h'], 0, runLog);
        assertOutputHelp()
      });
    });

    const elements = [')', '{', '/*', '*/', '}'];

    const assertOutputOptionShowOne = () => {
      assert.include(runLogResult, 'of(');
      for(let element of elements) assert.include(runLogResult, element);
    }

    const assertOutputOptionShowAll = () => {
      for(let element of elements) assert.include(runLogResult, element);
      for(let methodIO of vals.code.methodsIO) assert.include(runLogResult, `${methodIO}(`);
      for(let methodTx of vals.code.methodsTx) assert.include(runLogResult, `${methodTx}(`);
    }

    describe('runOutputOptionShow', () => {

      it('logs a string indicating absence if no method matches the array items passed', () => {
        run(vals.data.path, ['prog', 'file', '--show', 'none'], 0, runLog);
        assert.include(runLogResult, 'No method found for \'none\'');
      });

      it('logs a string being show option output for a single method if passed the corresponding array items', () => {

        run(vals.data.path, ['prog', 'file', '--show', 'of'], 0, runLog);
        assertOutputOptionShowOne()

        run(vals.data.path, ['prog', 'file', '-s', 'of'], 0, runLog);
        assertOutputOptionShowOne()
      });

      it('logs a string being show option output for all methods if passed the corresponding array items', () => {

        run(vals.data.path, ['prog', 'file', '--show', 'all'], 0, runLog);
        assertOutputOptionShowAll()

        run(vals.data.path, ['prog', 'file', '-s', 'all'], 0, runLog);
        assertOutputOptionShowAll()
      });
    });

    describe('runOutputStdin', async () => {

      it('logs a string indicating absence if passed input and no module path is included in the array items passed', async () => {
        await run(vals.data.path, ['prog', 'file'], 0, runLog, runInput);
        assert.include(runLogResult, 'No module path provided');
      });

      it('logs a string indicating absence if passed input and no export name is included in the array items passed', async () => {
        await run(vals.data.path, ['prog', 'file', 'test/src.test.js'], 0, runLog, runInput);
        assert.include(runLogResult, 'No export name provided');
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
