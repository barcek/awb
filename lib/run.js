/*
  Imports
*/

import Awb from './awb.js';

/*
  Functions
*/

const getOutputHelp = path => {

  const methodsStatic    = Object.getOwnPropertyNames(Awb)
                                 .filter(key => !['name', 'length', 'prototype'].includes(key))
                                 .map(key => key.toString()).join(', ');
  const methodsPrototype = Object.getOwnPropertyNames(Awb.prototype)
                                 .filter(key => 'constructor' !== key)
                                 .map(key => key.toString()).join(', ');

  const outputInitial = 'Usage:';
  const outputViaCode = ` - code: import Awb from '${path}'\n` +
                        '         const output = Awb.of(DOMTree)/.sow([templateObj])\n' +
                        '                           ...\n' +
                        '                           .join()/.serialize([n])';
  const outputMethods = `Methods: ${methodsStatic}, ${methodsPrototype}`;
  const outputOptions = `Options:\n  --show NAME   show code for method NAME`;

  return [outputInitial, outputViaCode, outputMethods, outputOptions].join('\n');
}

const getOutputOpts = args => {

  if(args.length > 3 && '--show' === args[2]) {
    const name = args[3];
    const text = Awb[name] || Awb.prototype[name];
    return text ? text.toString() : ""
  }
}

const run = (path, args) => {
  console.log(getOutputOpts(args) || getOutputHelp(path));
}

/*
  Exports
*/

export default run;
