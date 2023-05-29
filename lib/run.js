/*
  Imports
*/

import Awb from './awb.js';

/*
  Functions
*/

const doFilterStatic    = key => !['name', 'length', 'prototype'].includes(key)
const doFilterPrototype = key => 'constructor' !== key

const getOutputHelp = path => {

  const methodsStatic    = Object.getOwnPropertyNames(Awb)
                                 .filter(doFilterStatic)
                                 .map(key => key.toString());
  const methodsPrototype = Object.getOwnPropertyNames(Awb.prototype)
                                 .filter(doFilterPrototype)
                                 .map(key => key.toString());

  const methodsAll = [...methodsStatic, ...methodsPrototype].join(', ');

  const outputInitial = 'Usage:';
  const outputViaCode = ` - code: import Awb from '${path}'\n` +
                        '         const output = Awb.of(DOMTree)/.sow([templateObj])\n' +
                        '                           ...\n' +
                        '                           .join()/.serialize([n])';
  const outputMethods = `Methods: ${methodsAll}`;
  const outputOptions = `Options:\n  --show NAME/all   show code for method NAME or all methods`;

  return [outputInitial, outputViaCode, outputMethods, outputOptions].join('\n');
}

const getOutputOptsShowAll = () => {

  const outputStatic    = Object.getOwnPropertyNames(Awb)
                                .filter(doFilterStatic)
                                .map(key => Awb[key].toString());
  const outputPrototype = Object.getOwnPropertyNames(Awb.prototype)
                                .filter(doFilterPrototype)
                                .map(key => Awb.prototype[key].toString());

  return [...outputStatic, ...outputPrototype].join('\n\n');
}

const getOutputOpts = args => {

  const sections = [];

  if(args.length > 3 && '--show' === args[2]) {

    const name = args[3];
    const text = 'all' === name
      ? getOutputOptsShowAll()
      : Awb[name] || Awb.prototype[name];

    sections.push(text ? text.toString() : `No method found for '${name}'`);
  }

  return sections.join('\n');
}

const run = (path, args, log = console.log) => {
  log(getOutputOpts(args) || getOutputHelp(path));
}

/*
  Exports
*/

export default run;
