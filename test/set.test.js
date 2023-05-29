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
      assert.equal(HTMLTreeifyEmptyResult.nodeName, 'DIV');
      assert.equal(HTMLTreeifyEmptyResult.children.length, 0);
    });

    it('returns a DOM tree corresponding to an HTML string passed', () => {
      const HTMLTreeifyHTMLResult = HTMLTreeify(vals.html.list);
      assert.equal(HTMLTreeifyHTMLResult.nodeName, 'UL');
      assert.equal(HTMLTreeifyHTMLResult.id, 'test-list-1-id');
      assert.equal(HTMLTreeifyHTMLResult.classList.value,'test-class-1 test-class-2');
      assert.equal(HTMLTreeifyHTMLResult.children[0].nodeName, 'LI');
      assert.equal(HTMLTreeifyHTMLResult.children[0].textContent, 'Test list 1 item 1 text.');
      assert.equal(HTMLTreeifyHTMLResult.children[1].children[0].nodeName, 'UL');
      assert.equal(HTMLTreeifyHTMLResult.children[1].children[0].id, 'test-list-2-id');
      assert.equal(HTMLTreeifyHTMLResult.children[1].children[0].children[0].nodeName, 'LI');
      assert.equal(HTMLTreeifyHTMLResult.children[1].children[0].children[0].textContent, 'Test list 2 item 1 text.');
    });
  });

  describe('objTreeify', () => {

    it('returns a single div if passed no arguments', () => {
      const objTreeifyEmptyResult = objTreeify();
      assert.equal(objTreeifyEmptyResult.nodeName, 'DIV');
      assert.equal(objTreeifyEmptyResult.children.length, 0);
    });

    it('returns a DOM tree corresponding to a template object passed', () => {
      const objTreeifyTmplResult = objTreeify(vals.tmpl.list);
      assert.equal(objTreeifyTmplResult.nodeName, 'UL');
      assert.equal(objTreeifyTmplResult.id, 'test-list-1-id');
      assert.equal(objTreeifyTmplResult.classList.value, 'test-class-1 test-class-2');
      assert.equal(objTreeifyTmplResult.children[0].nodeName, 'LI');
      assert.equal(objTreeifyTmplResult.children[0].textContent, 'Test list 1 item 1 text.');
      assert.equal(objTreeifyTmplResult.children[1].children[0].nodeName, 'UL');
      assert.equal(objTreeifyTmplResult.children[1].children[0].id, 'test-list-2-id');
      assert.equal(objTreeifyTmplResult.children[1].children[0].children[0].nodeName, 'LI');
      assert.equal(objTreeifyTmplResult.children[1].children[0].children[0].textContent, 'Test list 2 item 1 text.');
    });
  });
});
