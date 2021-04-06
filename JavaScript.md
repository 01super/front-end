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
```

- 自动转换为字符串: 加法运算时,当一个值为字符串，另一个值为非字符串，则后者转为字符串。
- 一元运算符也会把运算子转成数值：+'abc' // NaN，'abc' // NaN，+true // 1，-false // 0

# 杂

## 事件 event.target 和 event.currentTarget 的区别

```
event.target返回触发事件的元素
event.currentTarget返回绑定事件的元素
```
