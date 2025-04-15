function sum(a, b, c) {
  return a + b + c;
}

function curry(fn) {
  return function curryed(...args) {
    if (args.length === fn.length) {
      return fn(...args);
    } else {
      return function (...arg2) {
        const all = arg2.concat(...args);
        return curryed(...all);
      };
    }
  };
}

const curriedSum = curry(sum);

console.log(curriedSum(1)(2)(3)); // 6
