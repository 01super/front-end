var x = 1;
// 当参数有默认值时，会在外层作用域和函数作用域之外多形成一个参数作用域
function foo(x, y = function (){x = 3; console.log(x)}, w = 33) {  // 3
    const z = 12;
    debugger;
    console.log(x);  // undefined
    var x = 2;
    y();
    console.log(x); // 2
    console.log(z);
}
foo();
console.log(x)  // 1