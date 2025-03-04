// 颜色转换
const color = "rgb(0, 55, 255)";
function numToHex(num) {
  return Number(num).toString(16).padStart(2, "0");
}
function colorToHex(color) {
  const reg = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
  const rgbMatch = color.match(reg);
  const [, r, g, b] = rgbMatch || [];
  const rHex = numToHex(r);
  const gHex = numToHex(g);
  const bHex = numToHex(b);
  const result = `#${rHex}${gHex}${bHex}`;
  console.log(result);
}
colorToHex(color);

// sqrt函数
function sqrt(x) {
  if (x === 0 || x === 1) return x;
  let guess = x / 2;
  while (guess * guess !== x) {
    guess = (guess + x / guess) / 2;
  }
  return guess;
}
console.log(sqrt(9));

/**
 * 将多参数函数转换为柯里化函数
 * @param {Function} fn 要柯里化的函数
 * @returns {Function} 柯里化后的函数
 */
function curry(fn) {
  // 获取原函数的参数个数
  const arity = fn.length;

  // 返回一个闭包函数
  return function curried(...args) {
    // 如果传入的参数个数已经足够，则直接调用原函数
    if (args.length >= arity) {
      return fn(...args);
    }

    // 否则返回一个新函数，等待接收剩余参数
    return function (...moreArgs) {
      // 将已有参数和新参数合并，递归调用 curried
      return curried(...args, ...moreArgs);
    };
  };
}

// 柯里化函数
function curry(fn) {
  const length = fn.length;
  return function f(...args) {
    if (args.length >= length) {
      return fn(...args);
    }
    return function (...moreArgs) {
      return f(...moreArgs, ...args);
    };
  };
}

// 测试
const add = (a, b, c) => a + b + c;
console.log(curry(add)(1)(2)(3)); // 6
console.log(add(1, 2, 3)); // 6
console.log(curry(add)(1, 2)(3)); // 6
console.log(curry(add)(1)(2, 3)); // 6
