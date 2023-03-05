# 类型转换

## 强制类型转换

- Number():

```
   1. 参数为原始值类型
      - 字符串：如果可以被解析为数值，则转换为相应的数值 Number('324') => 324
      - 字符串：如果不可以被解析为数值，返回 NaN Number('324abc') => NaN
      - 字符串：Number('') => 0
      - Number(undefined) => NaN
      - Number(null) => 0
      - Number(false) => 0
      - Number(true) => 1
   2. 参数为原始值对象
      1. 先调用对象的 valueOf，如果为原始值，则执行转换
      2. 如果 valueOf 返回 Object，则调用参数 toString，如果返回原始值，执行转换，否则报错
```

- String()

```
  1. 参数为原始值类型
  2. 参数为原始值对象
     1. 先调用对象的 toString，如果返回原始值则执行转换
     2. 如果 toString 返回对象，则调用参数 valueOf，如果返回原始值，执行转换，否则报错
```

- Boolean(),可以将任意类型的值转为布尔值

```
   除这五个值转换为false，其他全为true：undefined, null, 0(+0, -0), NaN, ''(空字符串)
```

## 自动转换（隐式类型转换）

- 会发生自动转换的场景

```
  1. 不同类型运算： 123 + '123'
  2. 对非布尔值类型的数据求布尔值，内部会对内部参数调用 Boolean() 方法： if ('abc') { console.log('hello') }
  3. 对非数值类型的值使用一元运算符（即+和-）： + {foo: 'bar'} // NaN， - [1, 2, 3] // NaN
  4. == 的运算
```

- 自动转换为字符串: 加法运算时,当一个值为字符串，另一个值为非字符串，则后者转为字符串。
- 一元运算符也会把运算子转成数值：+'abc' // NaN，'abc' // NaN，+true // 1，-false // 0

# 杂

## 事件 event.target 和 event.currentTarget 的区别

```
event.target返回触发事件的元素
event.currentTarget返回绑定事件的元素
```

## typeof 能判断的类型

```
1. 所有的值类型，包括 Symbol
2. 函数类型
3. 引用数据类型，都识别为 object，包括 null
```

## async 和 Promise

``` JavaScript
   // async 函数返回一个 Promise 对象
   async function() {
      return 100; // 相当于 return Promise.resolve(100)
   }
   !(async function() {
      const res = await 100; // 相当于 await Promise.resolve(100)
      console.log(res);  // 100
      const p = Promise.resolve(200);
      const res1 = await p;  // await 相当于 Promise 的 then
      console.log('res1: ', res1); // 200
   })()
```

## 箭头函数和普通函数的区别

- 箭头函数没有arguments 
- 箭头函数不能通过bind、call、apply改变this指向
- 箭头函数不适用对象方法
- 无法作为构造函数使用，没有自身的prototype
- 箭头函数不会创建自身的this，只会从上一级继承this,箭头函数的this在定义的时候就已经确认了，之后不会改变。

``` JavaScript
const obj = {
   name: '01super',
   getName: () => this.name // 无法获取到name
}
```
- 箭头函数不适用于原型方法
- 箭头函数不能作为构造函数
- 箭头函数不能用于动态上下文中的回调函数
``` JavaScript
   const $btn = document.querySeletor('#btn');
   $btn.addEventListener('click', () => {
      this.innerHTML = 'clicked';  // 这里也是不行的
   })
```

## for in 和 for of

- for in 用于**可枚举**数据，如对象、数组、字符串，得到key
   Object.getOwnPropertyDescriptors(obj) 可查看obj属性的 
   configurable、enumerable、value、writable
   enumerable 为 true，则该对象为可枚举的

- for of 用于**可迭代**数据，如数组、字符串、Map、Set，得到value

``` JavaScript
   const arr = [1,2,3];
   const iterator = arr[Symbol.iterator]();  // 可迭代
   iterator.next();
   iterator.next();
```  

## for await of

``` JavaScript
   function createPromise(delay){
      return new Promise((res, rej)=> {
         setTimeout(()=>res(Math.random()), delay);
      });
   }
   (async () =>{
   const p1 = createPromise(1000);
   const p2 = createPromise(2000);
   const list = [p1, p2];
   for await (let res of list) {
      console.log(res);
   }
   })();
```

## HTTP 跨域请求时为何发送 options 请求
   - options 请求是跨域请求之前的预检查
   - 浏览器自行发起的，无需认为干预
   - 不会影响实际功能

## jsonp
``` JavaScript
   <script>
      window.callbackFn = function(data) {
         console.log(data);
      }
   </script>
   // http://www.abc.com/api/getData 返回字符串 'callbackFn({data: 123})'
   // 就会执行预先定义的 callbackFn 函数
   <script src='http://www.abc.com/api/getData'></script>
```

## 闭包和作用域
js中自由变量的查找是**在函数定义的地方**，向上级作用域查找，**不是在执行的地方**  
```javascript
// 函数作为返回值
function create() {
  let a = 100;
  return function () {
    console.log(a);
  };
}

const fn = create();
const a = 200;
fn(); // 100

// 函数作为参数被传递
function print(fb) {
  const b = 200;
  fb();
}
const b = 100;
function fb() {
  console.log(b);
}
print(fb); // 100

```