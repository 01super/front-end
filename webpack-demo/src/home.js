import { test } from "./utils";
const r = test("333");
console.log("r: ", r);
console.log("home");
let a = 12;
const b = () => {
  a++;
  console.log('a: ', a);
  console.log("bbbbb");
};
b();
const c = { a: "a" };
console.log(c.x?.xx);
