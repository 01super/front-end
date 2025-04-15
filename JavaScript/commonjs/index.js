// console.clear();
// console.log("require.cache", require.length);
// console.log(arguments[0] === module.exports);
// console.log(arguments[1] === require);
// console.log(arguments[2] === module);
// console.log(arguments[3] === __filename);
// console.log(arguments[4] === __dirname);
// console.log(arguments);
// require 实现的伪代码
function _require(path) {
  let cache = false;
  // 判断模块是否有缓存（是否运行过）
  if (cache) {
    return cache; // 缓存结果
  }
  function _run(exports, require, module, __filename, __dirname) {
    // 模块的代码在这里执行
    // 因为函数有如下参数
    // exports, require, module, __filename, __dirname，
    // 所以在commonjs代码里面才能直接使用这些东西

    exports.a = 1;
    exports.b = 1;
    // 为啥使用 exports.a 后不能使用 module.exports 的原因， module.exports 会把 exports.x 的值都覆盖了
    module.exports = { a: 1, b: 1 };
  }

  const module = {
    exports: {},
  };

  _run.call(
    module.exports,
    module.exports,
    require,
    module,
    __filename,
    __dirname
  );
}

// const curry = _require("./函数柯里化.js");
// curry();

const vm = require("vm");
const fs = require("fs");
const path = require("path");
const filename = path.resolve(__dirname, "./函数柯里化.js");
const code = fs.readFileSync(filename, "utf-8");

const Module = {
  wrap: (code) => `(function (code) {
  return function(export, require, __filename, __dirnem) {
    ${code}\n
}
  })()`,
};

const wrapper = Module.wrap(code);
console.log("wrapper: ", wrapper);

const compiledWrapper = vm.runInThisContext(wrapper, {
  filename,
});
console.log("compiledWrapper: ", compiledWrapper);
// compiledWrapper();
