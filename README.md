# awb

A library exposing a monad to generate, transform and serialize DOM trees.

## Why?

To help automate web development. It can be used as part of a model-driven approach with [thru.js](https://github.com/barcek/thru.js), to generate content from HTML thru file methods.

It may also offer a fresh perspective on things, not least as an example of the monad. The top level code is simpler than might be imagined and worth a look if you're starting out with functional programming and interested in seeing another monad in practice. The module 'utils.js' also has an example of `pipe`.

## Getting started

If you're comfortable cloning repositories, installing dependencies with npm and using ES modules, skip to [Working with DOMTrees](#working-with-domtrees).

### Cloning the repository & installing dependencies

You'll need Git & npm installed.

First, enter the directory in which you'd like to store the library and run the Git command to clone the repository:

```shell
git clone https://github.com/barcek/awb.git
```

Next, enter the newly created 'awb' directory and run the npm command to install dependencies:

```shell
npm install
```

### Importing the library

Import `Awb` from wherever the library is stored - it's the default export. The following line assumes the library is in the same directory as the importing file.

```js
import Awb from './awb/index.js';
```

It also assumes the importing file is an ES module, not a CommonJS module, i.e. that the file extension is '.mjs' or the 'package.json' for the file has the following top-level key-value pair:

```json
"type": "module"
```

If your file is a CommonJS module, it's possible to use the dynamic import statement `import(path)`, which returns a `Promise`. The `Awb` function can be found on the `default` property of the resolved value.

```js
import('./awb/index.js')
  .then(value => {
    const Awb = value.default;
    ...
  });
```

### Working with DOMTrees

Seed a new tree with an HTML string or template object passed into the `.sow` method, or use the `.of` method to work with an existing tree.

With an HTML string:

```js
Awb.sow('<p id="seed">Planting a seed.</p>');
```

With a template object:

```js
Awb.sow({ n: 'p', as: { id: 'seed'}, t: 'Planting a seed.', ds: [] });
```

Here `n` is the element name, `as` any attributes to be set, `t` any text content and `ds` any dependents, nested in the same format. Classes can be added as an array of strings on the attribute object's  `cs` key.

With an existing DOM tree:

```js
Awb.of(DOMTree);
```

That done, transform away by chaining the `.map` method, passing in a function to be applied to every element in the tree.

```js
Awb.of(DOMTree).map(handleElement);
```

Use the `.serialize` method to get the final HTML as a string, passing in an integer for that number of spaces of indentation.

```js
const HTML = Awb.of(DOMTree).serialize(4);
```

## There's more...

### .join & .chain

The `.DOMTree` property can be accessed directly or via the `.join` method, which unwraps the value from the Awb instance.

The `.chain` method is built from `.map` and `.join` and can be used in place of `.map` where the mapping function instantiates an awb around an element in the DOM tree - the use of `.join` unwraps the value of each such instance once the mapping is complete. If that value is an element, not another level of instance, this flattens the whole tree bar the root element, which is wrapped as it was before the mapping.

### .ap & .liftAN

The `.ap` method can be used to work with two or more trees, when the value in the instance is a partially applied function requiring one or more additional trees to complete, for example following a use of `.map` with a curried handler. The value in the Awb instance passed to `.ap` becomes the next argument.

```js
Awb.of(DOMTree).map(useTrees).ap(instance);
```

The `.liftAN` method can combine multiple uses of `.ap` to apply a function to several additional instances. The function is the first argument to the method, followed by each instance to be passed to it.

```js
Awb.of(DOMTree).liftAN(useTrees, instance1, instance2);
```

To follow: handlers for the mapping methods and higher-level abstractions.

## Making changes

Running the tests after making changes and adding tests to cover new behaviour is recommended, as is a regular audit of dependencies.

### Test files

The npm packages `mocha` and `chai` are used for testing and the test files can be run with the following command:

```shell
mocha
```

This command along with the `--recursive` flag is the current content of the 'test' script in the 'package.json' file, which can be run with the following:

```shell
npm test
```

The command in the 'watch' script is set up to watch for and test on changes:

```shell
npm run watch
```

The files themselves are in the 'test' folder.

### npm audit

The `npm audit` command can be used to run a security audit on the dependencies used, with the process returning information on updates where available. The command `npm audit fix` can be used instead or thereafter to install compatible updates. See the npm documentation for [more detail](https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities).

## Repository tree

```
./
├── lib
│   ├── awb.js
│   ├── get.js
│   ├── index.js
│   ├── set.js
│   ├── use.js
│   └── utils.js
├── test
│   ├── awb.test.js
│   └── src.test.js
├── .gitignore
├── LICENSE.txt
├── README.md
├── index.js
├── package-lock.json
└── package.json
```
