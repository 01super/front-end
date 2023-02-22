// ====================== 数组去重 ======================
function uniqueEs5(arr) {
  return arr.filter((item, index, array) => array.indexOf(item) === index);
}

const uniqueEs6 = (arr) => [...new Set(arr)];

uniqueEs6([1, 2, 3, 3, 4, 465, 656, 5, 6, 2, 1, 345]);

// ====================== 扁平化数组 ======================
function flatten(arr, res = []) {
  if (!Array.isArray(arr)) return;
  arr.forEach((i) => {
    if (Array.isArray(i)) {
      flatten(i, res);
    } else {
      res.push(i);
    }
  });
  return res;
}

function flatten2(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
}
flatten([1, [2, [3]]]);

// ====================== 深拷贝 ======================
function cloneDeep(obj) {
  if (typeof obj !== "object") {
    return;
  }
  const newObj = obj instanceof Array ? [] : {};
  for (item in obj) {
    if (obj.hasOwnProperty(item)) {
      newObj[item] = typeof item === "object" ? cloneDeep(item) : obj[item];
    }
  }
  return newObj;
}

// ====================== 图片懒加载 ======================
let imgList = [...document.querySelectorAll("img")];
let length = imgList.length;

const imgLazyLoad = function () {
  let count = 0;
  return (function () {
    let deleteIndexList = [];
    imgList.forEach((img, index) => {
      let rect = img.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        img.src = img.dataset.src;
        deleteIndexList.push(index);
        count++;
        if (count === length) {
          document.removeEventListener("scroll", imgLazyLoad);
        }
      }
    });
    imgList = imgList.filter((img, index) => !deleteIndexList.includes(index));
  })();
};

// 这里最好加上防抖处理
document.addEventListener("scroll", imgLazyLoad);

// ====================== 实现 map ======================
function myMap(cb, ctx) {
  const res = [];
  for (let i = 0; i < this.length; i++) {
    if (this.hasOwnProperty(i)) {
      res[i] = cb.call(ctx, this[i], i, this);
    }
  }
  return res;
}
Array.prototype.myMap = myMap;

// ====================== debounce ======================
// leading 为是否在进入时立即执行一次，原理是利用定时器，如果在规定时间内再次触发事件会将上次的定时器清除，即不会执行函数并重新设置一个新的定时器，直到超过规定时间自动触发定时器中的函数
// 同时通过闭包向外暴露了一个 cancel 函数，使得外部能直接清除内部的计数器
function debounce(
  func,
  time = 17,
  options = {
    immediately: true,
    context: null,
  }
) {
  let timer;
  const _debounce = function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    if (options.immediately && !timer) {
      timer = setTimeout(null, time);
      func.apply(options.context, args);
    } else {
      timer = setTimeout(() => {
        func.apply(options.context, args);
        timer = null;
      }, time);
    }
  };

  _debounce.cancel = function () {
    clearTimeout(timer);
    timer = null;
  };
  return _debounce;
}

function debounce(fn, delay = 100) {
  // 定时器，用来 setTimeout
  var timer;

  // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
  return function () {
    // 保存函数调用时的上下文和参数，传递给 fn
    var context = this;
    var args = arguments;

    // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
    clearTimeout(timer);

    // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
    // 再过 delay 毫秒就执行 fn
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}
function log() {
  console.log(new Date().getTime());
}
window.onscroll = debounce(log);

// ====================== 创建十个 a 标签，点击弹出对应的序号 ======================
let a;
for (let i = 0; i < 10; i++) {
  a = document.createElement("a");
  a.innerHTML = i + "<br>";
  a.addEventListener("click", function (e) {
    e.preventDefault();
    console.log(i);
  });
  document.body.appendChild(a);
}

// ====================== 手写bind ======================
Function.prototype.bind1 = function () {
  const args = Array.from(arguments);
  const _this = args.shift();
  const self = this;
  return () => {
    return self.apply(_this, args);
  };
};
const obj = {
  name: "my name is object",
};
function fn(a, b, c) {
  console.log("a,b,c: ", a, b, c);
  console.log(this.name);
}
const f = fn.bind1(obj, 1, 2, 3);
f();

// ====================== 作用域 ======================
function scope() {
  const num = 12;
  scope1();
}
const num = 21;
function scope1() {
  console.log("num: ", num);
  // 打印 21
  // 所有自由变量的查找，是在函数定义的地方向上级作用域查找，不是在执行的地方！
}
scope();

// ====================== 加载图片 ======================
function loadImg(src) {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.onload = () => {
      resolve(img);
    };
    img.onerror = (e) => {
      reject(e);
    };
    img.src = src;
  });
}

// ====================== promise async setTimeout 执行顺序 ======================
async function async1() {
  console.log("async1 start"); // 4
  await async2();
  console.log("async1 end"); // 6
}

async function async2() {
  console.log("async2"); //5
}

console.log("script start"); // 1

setTimeout(function () {
  console.log("setTimeout"); // 8
}, 0);

async1();

new Promise(function (resolve) {
  console.log("promise1"); // 2
  resolve();
}).then(function () {
  console.log("promise2"); // 7
});

console.log("script end"); // 3


async function testB () {
   return {
     then (cb) {
       cb();
      }
    };
 }
 
 testB().then(() => console.log(1));
 Promise.resolve()
    .then(() => console.log(2))
    .then(() => console.log(3));
 
 // (等待一个then)最终结果👉: 2 1 3