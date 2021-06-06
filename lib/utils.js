/*
    Functions
*/

const pipe = (...fns) => (...values) =>
    /*
        Returns a function invoking each of 'fns' in
        sequence, from left to right, the first with
        'values', then each the last value returned.
    */
    fns.slice(1).reduce((acc, fn) => fn(acc), fns[0](...values));

const applyIfProp = prop => fn => obj =>
    /*
        Returns the result of 'fn' applied to 'obj'
        if 'obj' has property 'prop', else 'obj'.
    */
    obj[prop] ? fn(obj) : obj;

/*
    Exports
*/

export {
    pipe,
    applyIfProp
};
