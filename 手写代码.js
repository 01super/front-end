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
