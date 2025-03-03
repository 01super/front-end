// /**
//  * 笛卡尔积实现SKU算法
//  * @param {Array<Array>} arrays - 需要进行笛卡尔积的数组集合
//  * @returns {Array<Array>} - 笛卡尔积结果
//  */
function cartesianProduct(arrays) {
  return arrays.reduce(
    (pre, cur) => {
      const ret = pre.flatMap((a) => cur.map((b) => [...a, b]));
      console.log({ pre, cur, ret });
      return ret;
    },
    [[]]
  );
}

// 示例数据
const colors = ["红色", "蓝色"];
const sizes = ["S", "M", "L"];
const materials = ["棉", "涤纶"];

const skuAttributes = [colors, sizes, materials];
// console.log("skuAttributes: ", skuAttributes);
const skus = cartesianProduct(skuAttributes);
console.log("skus: ", skus);
// function cartesianProduct(arrays) {
//   // 初始值是一个包含空数组的数组
//   let result = [[]];

//   // 遍历每一个属性数组
//   for (let array of arrays) {
//     let temp = [];

//     // 遍历当前结果集中的每一个组合
//     for (let item of result) {
//       // 将当前属性数组中的每一个值添加到每一个组合中
//       for (let value of array) {
//         temp.push([...item, value]);
//       }
//     }

//     // 更新结果集
//     result = temp;
//   }

//   return result;
// }
// const skus1 = cartesianProduct(skuAttributes);
// console.log("skus1: ", skus1);

// const attrs = [
//   ["红色", "蓝色"],
//   ["S", "M", "L"],
//   ["棉", "涤纶"],
// ];
// function d(attrs) {
//   let result = [[]];
//   attrs.forEach((attr) => {
//     const tmp = [];
//     result.forEach((r) => {
//       tmp.push([...attr, r]);
//     });
//     result = tmp;
//   });
//   return result;
// }
// console.log(d(attrs));

// skuAttributes.reduce((pre, cur) => {
//   const ret = pre.flatMap((a) => cur.map((b) => [...a, b]));
//   console.log({ pre, cur, ret });
//   return ret;
// });
