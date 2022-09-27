 /**
  * 对应名称
  * - prototype ： 原型
  * - __proty__ ： 原型链（链接点）
  * 
  * 从属关系
  * prototype -> 函数的一个属性： 对象 {}
  * __proto__ -> 对象Object的一个属性： 对象 {}
  * 对象的__proto__保存着该对象的构造函数的protytype
  */

 class People {
   name;
   constructor(name) {
     this.name = name;
   }
   eat() {
     console.log(`${this.name} eat......`);
   }
 }

 class Student extends People {
   num;
   constructor(num, name) {
     super(name);
     this.num = num;
   }
   study() {
     console.log("study");
   }
 }

 const xialuo = new Student(12, "xialuo");
 console.log(" xialuo instanceof Student: ", xialuo instanceof Student);

 console.log(" xialuo instanceof People: ", xialuo instanceof People);

 console.log(" xialuo instanceof Object: ", xialuo instanceof Object);

 xialuo.__proto__ === Student.prototype // true
 /**
  * 每个class都要显示原型prototype
  * 每个实例都有隐式原型__proto__
  * 实例的__proto__ 指向其对应class 的 prototype
  * 
  * 基于原型的执行规则：
  * 先在自身找属性和方法
  * 找不到再去__proto__去找
  */