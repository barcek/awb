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

  afterEach(() => {
    process.stdin.removeAllListeners();
  })

  describe('run', () => {

    let runLogResult;
    let runCreateResult;

    const runLog = (text) => { runLogResult = text };
    const runCreate = (path, content, mode) => { runCreateResult = [path, content, mode] };
    const runInput = {
      on: (event, handle) => { handle(vals.html.list) }
    }

    const headings = ['Usage:', 'Summary:', 'Methods:', 'Options:'];

    const assertOutputHelp = () => {
      for(let heading of headings) assert.include(runLogResult, heading);
      assert.include(runLogResult, vals.data.path);
      for(let methodIO of vals.code.methodsIO) assert.include(runLogResult, `.${methodIO}(`);
      for(let methodTx of vals.code.methodsTx) assert.include(runLogResult, methodTx);
      for(let flagWord of vals.code.flagsWord) assert.include(runLogResult, flagWord);
      for(let flagChar of vals.code.flagsChar) assert.include(runLogResult, flagChar);
    }

    describe('runOutputHelp', () => {

      it('logs a string being help output if no option flag is passed', async () => {
        await run(vals.data.path, [], 0, runLog);
        assertOutputHelp();
      });

      it('logs a string being help output if a help option flag is passed', async () => {

        await run(vals.data.path, ['prog', 'file', '--help'], 0, runLog);
        assertOutputHelp();

        await run(vals.data.path, ['prog', 'file', '-h'], 0, runLog);
        assertOutputHelp();
      });
    });

    const assertOutputOptionVersion = () => {
      const name = runLogResult.slice(0, 3);
      const versionPartCount = runLogResult.slice(5).split('.').length;
      assert.equal(name, 'awb');
      assert.equal(versionPartCount, 3);
    }

    describe('runOutputOptionVersion', () => {

      it('logs a string indicating absence if no version number is found', async () => {
        await run(vals.data.path, ['prog', 'file', '--version'], 0, runLog);
        assert.include(runLogResult, 'awb, version unknown - not extracted from');
        assert.include(runLogResult, 'package.json');
      });

      it('logs a string being version output if a version option flag is passed', async () => {

        await run(vals.data.path, ['prog', './', '--version'], 0, runLog);
        assertOutputOptionVersion();

        await run(vals.data.path, ['prog', './', '-v'], 0, runLog);
        assertOutputOptionVersion();
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

      it('logs a string indicating absence if no method matches the array items passed', async () => {
        await run(vals.data.path, ['prog', 'file', '--show', 'none'], 0, runLog);
        assert.include(runLogResult, 'No method found for \'none\'');
      });

      it('logs a string being show option output for a single method if passed the corresponding array items', async () => {

        await run(vals.data.path, ['prog', 'file', '--show', 'of'], 0, runLog);
        assertOutputOptionShowOne();

        await run(vals.data.path, ['prog', 'file', '-s', 'of'], 0, runLog);
        assertOutputOptionShowOne();
      });

      it('logs a string being show option output for all methods if passed the corresponding array items', async () => {

        await run(vals.data.path, ['prog', 'file', '--show', 'all'], 0, runLog);
        assertOutputOptionShowAll();

        await run(vals.data.path, ['prog', 'file', '-s', 'all'], 0, runLog);
        assertOutputOptionShowAll();
      });
    });

    describe('runOutputOptionLink', () => {

      it('creates a link file and logs a string indicating success if no path passed', async () => {

        await run(vals.data.path, ['prog', 'file', '--link'], 0, runLog, runCreate);

        assert.include(runCreateResult[0], vals.code.linkItems.name);
        assert.include(runCreateResult[1], vals.code.linkItems.text.prog);
        assert.include(runCreateResult[1], vals.code.linkItems.text.subs);
        assert.include(runCreateResult[1], vals.code.linkItems.text.args);
        assert.equal(runCreateResult[2], vals.code.linkItems.mode);

        assert.include(runLogResult, 'Created link at \'');
        assert.include(runLogResult, 'awb\'');
      });

      it('creates a link file and logs a string indicating success if path passed', async () => {

        await run(vals.data.path, ['prog', 'file', '--link', 'alt/test/path'], 0, runLog, runCreate);

        assert.equal(runCreateResult[0], 'alt/test/path');
        assert.include(runCreateResult[1], vals.code.linkItems.text.prog);
        assert.include(runCreateResult[1], vals.code.linkItems.text.subs);
        assert.include(runCreateResult[1], vals.code.linkItems.text.args);
        assert.equal(runCreateResult[2], vals.code.linkItems.mode);

        assert.equal(runLogResult, 'Created link at \'alt/test/path\'');
      });
    });

    describe('runOutputStdin', () => {

      it('logs a string indicating absence if passed input and no module path is included in the array items passed', async () => {
        await run(vals.data.path, ['prog', 'file'], 0, runLog, runCreate, runInput);
        assert.include(runLogResult, 'No module path provided');
      });

      it('logs a string indicating absence if passed input and no export name is included in the array items passed', async () => {
        await run(vals.data.path, ['prog', 'file', 'test/src.test.js'], 0, runLog, runCreate, runInput);
        assert.include(runLogResult, 'No export name provided');
      });

      it('logs an HTML string mapped with no indent if passed the corresponding array items and input', async () => {
        await run(vals.data.path, ['prog', 'file', 'test/src.test.js', 'cAdder'], 0, runLog, runCreate, runInput);
        assert.equal(runLogResult, vals.html.listCAdded);
      });

      it('logs an HTML string mapped with an indent if passed the corresponding array items and input', async () => {
        await run(vals.data.path, ['prog', 'file', 'test/src.test.js', 'ignore', '2'], 0, runLog, runCreate, runInput);
        assert.equal(runLogResult, vals.html.listIndent2);
      });
    });
  });
});
