// 一句话统计字符串出现的频率
const str = "lorem ipsum dolor sit amet";

const result = [...str].reduce(
  (acc, char) => (acc[char]++ || (acc[char] = 1), acc),
  {}
);

console.log(result);
