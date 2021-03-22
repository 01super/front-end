const a = (x, y) => {
  x * y;
};

Promise.resolve(100).then(function (params) {
  console.log("params: ", params);
});
