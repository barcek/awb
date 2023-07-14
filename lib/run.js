/*
  Imports
*/

import { promises as fs } from 'fs';
import { dirname, resolve } from 'path';

import Awb from './awb.js';

/*
  Defaults
*/

const linkName = 'awb';
const linkMode = '775';
const linkProg = '/bin/sh';

/*
  Functions
*/

const linkContentGet = path => `#!${linkProg}\n\n\$(command -v node) ${path} \$1 \$2 \$3`;
const createLinkFile = async (path, content, mode) => {
  try {
    await fs.writeFile(path, content);
  }
  catch(err) {
    return `Unable to create link file at '${path}'`;
  }
  try {
    await fs.chmod(path, mode);
  }
  catch(err) {
    return `Unable to set as executable link file created at '${path}'`;
  }
}

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
  const outputUsingSh = ' - sh: node path/to/awb PATH/TO/MODULE EXPORT[ INDENT]\n' +
                        `       ${linkName} PATH/TO/MODULE EXPORT[ INDENT] (via link file; cf. Options)`;
  const outputUsingJS = ` - JS: import Awb from '${path}'\n` +
                        '       const output = Awb.of(DOMTree)/.sow([HTMLStr/templateObj])\n' +
                        '                         .map(DOMTreeHandle) ...\n' +
                        '                         .join()/.serialize([indent])';
  const outputSummary = 'Summary:\n' +
                        ' - sh: Accepts an HTML string via stdin, applying map function EXPORT\n' +
                        '       from file MODULE and outputting optionally formatted w/ INDENT\n' +
                        ' - JS: Exports the Awb class to wrap a DOMTree initialized via of/sow,\n' +
                        '       transformed primarily via map and extracted via join/serialize'
  const outputMethods = `Methods: ${methodsAll}`;
  const outputOptions = 'Options:\n' +
                        ' -s, --show METHOD/all  show code for METHOD or all methods then exit\n' +
                        ` -l, --link [PATH]      create link file at path/to/awb/${linkName} or PATH\n` +
                        ' -v, --version          show name and version number then exit\n' +
                        ' -h, --help             show help text, incl. methods, then exit';

  return [outputInitial, outputUsingSh, outputUsingJS, outputSummary, outputMethods, outputOptions].join('\n');
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

const getOutputOpts = async (args, path, create) => {
  /*
    Returns a string for use of available options
  */
  const sections = [];

  if(args.length > 2 && ['--help', '-h'].includes(args[2])) {
    return getOutputHelp(path);
  }

  if(args.length > 2 && ['--version', '-v'].includes(args[2])) {
    const packageJSONPath = resolve(args[1], 'package.json');
    try {
      const packageJSONContent = await fs.readFile(packageJSONPath);
      const versionNumber = JSON.parse(packageJSONContent.toString()).version;
      return `awb v${versionNumber}`;
    }
    catch(err) {
      return `awb, version unknown - not extracted from '${packageJSONPath}'`;
    }
  }

  if(args.length > 2 && ['--link', '-l'].includes(args[2])) {
    const linkPath = args.length > 3
      ? args[3]
      : resolve(args[1], linkName);
    const linkContent = linkContentGet(args[1]);
    return await create(linkPath, linkContent, linkMode) || `Created link at '${linkPath}'`;
  }

  if(args.length > 3 && ['--show', '-s'].includes(args[2])) {
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
  const [modulePath, exportName, indent] = args.slice(2)

  if(!modulePath) return 'No module path provided'
  if(!exportName) return 'No export name provided'

  const module = await import(resolve(dirname(''), modulePath))
  const handle = module[exportName]

  return Awb.sow(seed).map(handle).serialize(indent)
}

const logOutput = async (log, seed, args, path, create) => {
  /*
    Logs a string being the output generated for either:
    - any HTML string
    - any options
    - help text
  */
  const output = seed
    ? await getOutputHTML(seed, args)
    : await getOutputOpts(args, path, create) || getOutputHelp(path);
  log(output);
}

const run = async (path, args, delay = 100, log = console.log, create = createLinkFile, input = process.stdin) => {
  /*
    Handles read from input and initiates output log
    with any delay
  */
  let seed = ''
  input.on('data', data => seed += data)

  delay
    ? setTimeout(async () => { await logOutput(log, seed, args, path, create); process.exit(0) }, delay)
    : await logOutput(log, seed, args, path, create);
}

/*
  Exports
*/

export default run;
