# Awb

A library exposing a monad to generate, transform and serialize DOM trees.

# Why?

To help automate web development. It can be used as part of a model-driven approach with [thru.js](https://github.com/barcek/thru.js), to generate code in HTML thru file methods.

It also offers a fresh perspective on things, not least as an example of the monad. The top level code is simpler than might be imagined and worth a look if you're starting out with functional programming and interested in seeing another monad in practice. The module 'utils.js' also has an example of `pipe`.

## Getting started

Import `Awb` - it's the default export.

Seed a new tree with an HTML string or template object passed into the `.sow` method, or use the `.of` method to work with an existing tree.

With an HTML string:

```js
Awb.sow('<p id="seed">Planting a seed.</p>')
```

With a template object:

```js
Awb.sow({ n: 'p', as: { id: 'seed'}, t: 'Planting a seed.'}, ds: [])
```

Here `n` is the element name, `as` any attributes to be set, `t` any text content and `ds` any dependents in the same format. Classes can be added as an array of strings on the attribute object's  `cs` key.

With an existing DOM tree:

```js
Awb.of(DOMTree);
```

That done, transform away by chaining the `.map` method, passing in a function to be applied to every element in the tree.

Use the `.serialize` method to get the final HTML as a string, passing in an integer for that number of spaces of indentation.

## There's more...

The `.DOMTree` property can be accessed directly or via the `.join` method, which is used to unpack the value from any Awb instance at each element on the tree.

The `.chain` method is built from `.map` and `.join` and can be used in place of `.map` where the mapping function instantiates new awbs in the DOM tree, to flatten the whole back to a single instance.

More element handlers for `.map` and `.chain` to follow.

## Test files

The npm packages `mocha` and `chai` are used for testing and the test files can be run with the following command:

```shell
mocha
```

This command along with the `--recursive` flag is the current content of the 'test' script in the 'package.json' file, which can be run with the following:

```shell
npm test
```
