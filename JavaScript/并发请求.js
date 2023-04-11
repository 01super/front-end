/**
 * 实现一个并发请求
 * 请求地址为一个数组，有一个最大并发数，每次发送请求数量不超过最大并发数，
 * 有一个结果数组，无论成功还是失败都要返回结果
 * 最后每一个请求所产生的结果归到一个数组里边去最终数组顺序要跟url数组顺序一样
 * @param {string[]} urls 待请求的url数组
 * @param {number} maxNum 最大并发数
 */
function concurRequest(urls, maxNum) {
  //1
  return new Promise((resolve) => {
    //2
    if (urls.length === 0) {
      resolve([]);
      return;
    }

    //3
    let index = 0; //下一个请求的下标
    //6
    let count = 0; //当前请求完成的数量

    const results = [];
    let i = index;

    //发送请求
    async function request() {
      if (index === urls.length) {
        //如果index等于数组长度说明没有请求可发
        return;
      }
      const url = urls[index];
      index++;
      try {
        const resp = await fetch(url);
        //resp加入到results
        results[i] = resp;
      } catch (error) {
        //err加入到results
        results[i] = error;
      } finally {
        //判断是否所有的请求都已完成
        count++;
        if (count === urls.length) {
          console.log("over");
          resolve(results);
        }
        //5
        request();
      }
    }
    const times = Math.min(maxNum, usrls.length);
    for (let i = 0; i < times; i++) {
      request();
    }
  });
}


async function sendRequest(requestList, limits, callback) {
  // 维护一个promise队列
  const promises = [];
  // 当前的并发池,用Set结构方便删除
  const pool = new Set(); // set也是Iterable<any>[]类型，因此可以放入到race里
  // 开始并发执行所有的任务
  for (let request of requestList) {
    // 开始执行前，先await 判断 当前的并发任务是否超过限制
    if (pool.size >= limits) {
      // 这里因为没有try catch ，所以要捕获一下错误，不然影响下面微任务的执行
      await Promise.race(pool).catch((err) => err);
    }
    const promise = request; // 拿到promise
    // 删除请求结束后，从pool里面移除
    const cb = () => {
      pool.delete(promise);
    };
    // 注册下then的任务
    promise.then(cb, cb);
    pool.add(promise);
    promises.push(promise);
  }
  // 等最后一个for await 结束，这里是属于最后一个 await 后面的 微任务
  // 注意这里其实是在微任务当中了，当前的promises里面是能确保所有的promise都在其中
  // (前提是await那里命中了if)
  Promise.allSettled(promises).then(callback, callback);
}

function createPromise() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        res(666);
      } else {
        rej("太小了");
      }
    }, 500);
  });
}

let promiseList = [];

Array.from({ length: 12 }).forEach((i) => {
  promiseList.push(createPromise());
});

sendRequest(promiseList, 3, (values) => {
  console.log("完了哟", values);
});
