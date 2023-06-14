/*
  Imports
*/

import path from 'path';

import Awb from './awb.js';

/*
  Functions
*/

const doFilterStatic    = key => !['name', 'length', 'prototype'].includes(key)
const doFilterPrototype = key => 'constructor' !== key

const getOutputHelp = path => {
  /*
    Returns a string being the generated help text
  */
  const methodsStatic    = Object.getOwnPropertyNames(Awb)
                                 .filter(doFilterStatic)
                                 .map(key => key.toString());
  const methodsPrototype = Object.getOwnPropertyNames(Awb.prototype)
                                 .filter(doFilterPrototype)
                                 .map(key => key.toString());

  const methodsAll = [...methodsStatic, ...methodsPrototype].join(', ');

  const outputInitial = 'Usage:';
  const outputUsingSh = ' - sh: node path/to/awb PATH/TO/MODULE METHOD[ INDENT]';
  const outputUsingJS = ` - JS: import Awb from '${path}'\n` +
                        '       const output = Awb.of(DOMTree)/.sow([templateObj])\n' +
                        '                         ...\n' +
                        '                         .join()/.serialize([n])';
  const outputMethods = `Methods: ${methodsAll}`;
  const outputOptions = `Options:\n  --show METHOD/all   show code for METHOD or all methods`;

  return [outputInitial, outputUsingSh, outputUsingJS, outputMethods, outputOptions].join('\n');
}

const getOutputOptsShowAll = () => {
  /*
    Returns a string being the text content of all
    primary Awb class properties newline-separated
  */
  const outputStatic    = Object.getOwnPropertyNames(Awb)
                                .filter(doFilterStatic)
                                .map(key => Awb[key].toString());
  const outputPrototype = Object.getOwnPropertyNames(Awb.prototype)
                                .filter(doFilterPrototype)
                                .map(key => Awb.prototype[key].toString());

  return [...outputStatic, ...outputPrototype].join('\n\n');
}

const getOutputOpts = args => {
  /*
    Returns a string for use of available options
  */
  const sections = [];

  if(args.length > 3 && '--show' === args[2]) {
    /*
      Provides text for either a single named or all
      primary Awb class properties or noting absence
    */
    const name = args[3];
    const text = 'all' === name
      ? getOutputOptsShowAll()
      : Awb[name] || Awb.prototype[name];

    sections.push(text ? text.toString() : `No method found for '${name}'`);
  }

  return sections.join('\n');
}

const getOutputHTML = async (seed, args) => {
  /*
    Returns an HTML string transformed via a
    handler imported per args and serialized
  */
  const [modulePath, methodName, indent] = args.slice(2)

  if(!modulePath) return 'No module path provided'
  if(!methodName) return 'No method name provided'

  const module = await import(path.resolve(path.dirname(''), modulePath))
  const handle = module[methodName]

  return Awb.sow(seed).map(handle).serialize(indent)
}

const logOutput = async (log, seed, args, path) => {
  /*
    Logs a string being the output generated for either:
    - any HTML string
    - any options
    - help text
  */
  const output = seed
    ? await getOutputHTML(seed, args)
    : getOutputOpts(args) || getOutputHelp(path);
  log(output);
}

const run = async (path, args, delay = 100, log = console.log, input = process.stdin) => {
  /*
    Handles read from input and initiates output log
    with any delay
  */
  let seed = ''
  input.on('data', data => seed += data)

  delay
    ? setTimeout(async () => { await logOutput(log, seed, args, path); process.exit(0) }, delay)
    : await logOutput(log, seed, args, path);
}

/*
  Exports
*/

export default run;
