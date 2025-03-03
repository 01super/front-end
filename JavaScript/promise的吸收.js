Promise.resolve()
  .then(() => {
    console.log("promise.then1");
    return Promise.resolve(1);
  })
  .then(() => {
    console.log("promise.then2");
  });

Promise.resolve()
  .then(() => {
    console.log("promise.then3");
  })
  .then(() => {
    console.log("promise.then4");
  });

// +1fn - +3fn
// 1fn()执行 log 1， 1fn 准备吸收
// 3fn()执行 log 3，+4fn
// 1fn() 吸收，+2fn
// 4fn()执行 log 4
// 2fn()执行 log 2
