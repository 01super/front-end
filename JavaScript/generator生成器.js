function* add() {
  const value1 = yield "first";
  console.log("value1: ", value1); // 22
  const value2 = yield "second";
  console.log("value2: ", value2); // 33
}

let result;
const gen = add();
result = gen.next(11);
console.log("result: ", result); // first
result = gen.next(22); // -> log value1
console.log("result: ", result); // second
result = gen.next(33); // -> log value2
console.log("result: ", result); // undefined

function* genID() {
  let i = 1;
  while (true) {
    yield i;
    i++;
  }
}

const idGen = genID();
console.log(idGen.next());
console.log(idGen.next());
console.log(idGen.next());
console.log(idGen.next());
