/*
    Functions
*/

const pipe = (...fns) => (...values) => fns.slice(1).reduce((acc, fn) => fn(acc), fns[0](...values));

const applyIfProp = prop => fn => obj => obj[prop] ? fn(obj) : obj;

/*
    Exports
*/

export {
    pipe,
    applyIfProp
};
