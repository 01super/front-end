function fn(a) {
  console.log("this: ", this);
  console.log("a: ", a);
}

Function.prototype.myBind = function (context) {
  const fn = this;
  return function () {
    const arg = arguments;
    return fn.apply(context, arg);
  };
};

const obj = {
  name: "obj",
};

const newFn = fn.myBind(obj);

newFn(666);
