console.log(88);
import { test, wow } from "./utils";
const k = test("444");
console.log("k: ", k);
const obj = { name: 123, test: [{ hello: "world" }] };

const a = _.cloneDeep(obj);
console.log(a);
const c = wow(a);
console.log("c: ", c);
