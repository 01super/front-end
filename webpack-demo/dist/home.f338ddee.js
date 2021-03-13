(() => {
  var o;
  console.log("home");
  console.log("a: ", 13),
    console.log("bbbbb"),
    console.log(null === (o = { a: "a" }.x) || void 0 === o ? void 0 : o.xx);
})();
