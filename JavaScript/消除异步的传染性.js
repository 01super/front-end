// 消除异步的传染性 ==> 将异步函数改成同步函数
function getUser() {
  return fetch(
    "https://www.jianshu.com/shakespeare/v2/notes/fcab44989258/views_count"
  );
}

function m1() {
  const user = getUser();
  return user;
}

function m2() {
  const user = m1();
  return user;
}
function m3() {
  const user = m2();
  return user;
}

function main() {
  const user = m3();
  console.log(user);
}

function run(func) {
  let cache = {
    status: "pending",
    value: null,
  };
  const oldFetch = window.fetch;
  window.fetch = function (...args) {
    if (cache.status == "fulfilled") {
      return cache.value;
    } else if (cache.status == "rejected") {
      //之前的请求有问题
      throw cache.value;
    } else {
      // 1. 发送真是请求
      const promise = oldFetch(...args)
        .then((res) => res.json())
        .then(
          (res) => {
            cache.status = "fulfilled";
            cache.value = res;
          },
          (err) => {
            cache.status = "rejected";
            cache.value = err;
          }
        );
      // 2. 抛出错误
      throw promise;
    }
  };
  // 执行入口函数
  try {
    func();
  } catch (error) {
    if (error instanceof Promise) {
      // 不论成功还是失败都重新调用
      error.then(func, func).finally(() => {
        //恢复原来的值
        window.fetch = oldFetch;
      });
    }
  }
}
run(main);
