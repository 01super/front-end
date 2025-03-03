function callTest(a, b) {
  const r = a + b;
  console.log(r);
  console.log(this);
  return r;
}

Function.prototype.myCall = function (context, ...args) {
  const fn = this;
  if (context ?? false) {
    const cur = Object(context);
    // 生成唯一键，避免属性冲突
    const key = Symbol("fn");
    cur[key] = fn;
    const res = cur[key](...args);
    delete cur.fn;
    return res;
  }
  return fn(...args);
};

const res = callTest.myCall(null, 1, 2);
console.log({ res });
callTest.myCall(undefined, 1, 2);
callTest.myCall("111", 1, 2);
callTest.myCall({ name: "xxx" }, 1, 2);

const obj = { name: "obj" };

const objCall = callTest.call(obj, [1, 2]);
