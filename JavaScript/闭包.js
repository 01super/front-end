// 函数作为返回值
function create() {
  let a = 200;
  return function () {
    console.log(a);
  };
}
let a = 100;
const fn = create();
fn(); // 200
/**
 * 自由变量的查找是在函数定义的地方向上级作用域查找
 * 而不是在函数执行的地方！！！
 */
// 函数作为参数
function print(fn) {
  let b = 1;
  fn();
}
let b = 2;
function con() {
  console.log(b);
}
print(con); // 2
