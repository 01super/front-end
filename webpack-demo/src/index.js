console.log(88);
import { test } from "./utils";
const k = test("444");
console.log("k: ", k);
import { cloneDeep } from "lodash";
const obj = { name: 123, test: [{ hello: "world" }] };

const a = cloneDeep(obj);
console.log(a);
