/*
  Imports
*/

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { run } from './lib/index.js';

/*
  CLI use
*/

const pathHere = fileURLToPath(import.meta.url);
const pathUsed = process.argv[1];

if( dirname(pathHere) === pathUsed || pathHere === pathUsed ) run(pathHere, process.argv);

/*
  Exports
*/

export { default } from './lib/index.js';
