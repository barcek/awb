/*
    Functions
*/

const pipe = (...fns) => value => fns.reduce((acc, fn) => fn(acc), value);

const applyIfProp = prop => fn => obj => obj[prop] ? fn(obj) : obj;

/*
    Exports
*/

export {
    pipe,
    applyIfProp
};
