/*
  Imports
*/

import { assert } from 'chai';

import { vals } from './src.test.js';

import { HTMLTreeify, objTreeify } from '../lib/set.js';

/*
  Assertions
*/

describe('set.js', () => {

  describe('HTMLTreeify', () => {

    it('returns a single div if passed no arguments', () => {
      const HTMLTreeifyEmptyResult = HTMLTreeify();
      assert.equal('DIV', HTMLTreeifyEmptyResult.nodeName);
      assert.equal(0, HTMLTreeifyEmptyResult.children.length);
    });

    it('returns a DOM tree corresponding to an HTML string passed', () => {
      const HTMLTreeifyHTMLResult = HTMLTreeify(vals.html.list);
      assert.equal('UL', HTMLTreeifyHTMLResult.nodeName);
      assert.equal('test-list-1-id', HTMLTreeifyHTMLResult.id);
      assert.equal('test-class-1 test-class-2', HTMLTreeifyHTMLResult.classList.value);
      assert.equal('LI', HTMLTreeifyHTMLResult.children[0].nodeName);
      assert.equal('Test list 1 item 1 text.', HTMLTreeifyHTMLResult.children[0].textContent);
      assert.equal('UL', HTMLTreeifyHTMLResult.children[1].children[0].nodeName);
      assert.equal('test-list-2-id', HTMLTreeifyHTMLResult.children[1].children[0].id);
      assert.equal('LI', HTMLTreeifyHTMLResult.children[1].children[0].children[0].nodeName);
      assert.equal('Test list 2 item 1 text.', HTMLTreeifyHTMLResult.children[1].children[0].children[0].textContent);
    });
  });

  describe('objTreeify', () => {

    it('returns a single div if passed no arguments', () => {
      const objTreeifyEmptyResult = objTreeify();
      assert.equal('DIV', objTreeifyEmptyResult.nodeName);
      assert.equal(0, objTreeifyEmptyResult.children.length);
    });

    it('returns a DOM tree corresponding to a template object passed', () => {
      const objTreeifyTmplResult = objTreeify(vals.tmpl.list);
      assert.equal('UL', objTreeifyTmplResult.nodeName);
      assert.equal('test-list-1-id', objTreeifyTmplResult.id);
      assert.equal('test-class-1 test-class-2', objTreeifyTmplResult.classList.value);
      assert.equal('LI', objTreeifyTmplResult.children[0].nodeName);
      assert.equal('Test list 1 item 1 text.', objTreeifyTmplResult.children[0].textContent);
      assert.equal('UL', objTreeifyTmplResult.children[1].children[0].nodeName);
      assert.equal('test-list-2-id', objTreeifyTmplResult.children[1].children[0].id);
      assert.equal('LI', objTreeifyTmplResult.children[1].children[0].children[0].nodeName);
      assert.equal('Test list 2 item 1 text.', objTreeifyTmplResult.children[1].children[0].children[0].textContent);
    });
  });
});
