// 全部成功或者任意一个失败则完成
Promise.myAll = function (literalPromises) {
  const result = [];
  let index = 0;
  let count = 0;
  return new Promise((resolve, reject) => {
    for (let promise of literalPromises) {
      const curIndex = index++;
      console.log("curIndex: ", curIndex);
      if (!promise.then) {
        result[curIndex] = {
          result,
          status: "fulfiled",
        };
        if (++count === literalPromises.length) {
          resolve(result);
        }
      } else {
        promise
          .then((res) => {
            result[curIndex] = res;
          })
          .catch((err) => {
            reject(err);
          })
          .finally(() => {
            if (++count === literalPromises.length) {
              resolve(result);
            }
          });
      }
    }
  });
};

const p1 = Promise.resolve("p1");
const p2 = new Promise((res) => {
  setTimeout(() => {
    res("p2");
  }, 3000);
});
const p3 = new Promise((res) => {
  setTimeout(() => {
    res("p3");
  }, 1000);
});
const ps = [p1, p2, p3];

Promise.all(ps)
  .then((res) => {
    console.log("res: ", res);
  })
  .catch((err) => {
    console.log("err: ", err);
  });
Promise.myAll(ps)
  .then((res) => {
    console.log("res: ", res);
  })
  .catch((err) => {
    console.log("err: ", err);
  });

// 全部完成，不论成功失败，返回对应结果的数组
Promise.allSettled;
// 首个成功或者全部失败，返回成功或者全部失败的结果
Promise.any;
// 返回最先完成的结果，不论成功失败
Promise.race;
