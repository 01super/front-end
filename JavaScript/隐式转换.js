const obj = {
  a: "test",
  valueOf: () => Date,
  toString: () => "2",
};

console.log(Number(obj));
