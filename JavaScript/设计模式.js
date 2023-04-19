// 工厂模式：
// 缺点：对象使用字面量的形式创建，不知道对象具体的类
function CreatePerson(name, age) {
  const obj = {
    name,
    age,
    eating() {
      console.log("eating");
    },
  };
  return obj;
}
const p1 = CreatePerson("xiaoming", 18);
const p2 = CreatePerson("dagou", 8);

// 构造函数：
// 缺点：相同的方法会在每一次构造对象时重新生成，占用空间
function PersonFn(name, age) {
  this.name = name;
  this.age = age;
  this.eating = function () {
    console.log("eating");
  };
}
const p3 = new PersonFn("xiaohu", 22);
const p4 = new PersonFn("xiaoxia", 23);
console.log("构造函数: ", p3.eating === p4.eating);

// 类
class Person {
  constructor(name, age) {
    (this.name = name), (this.age = age);
  }
  eating() {
    console.log("eating");
  }
  #run() {
    console.log('run')
  }
}
const p5 = new Person("xiaohu", 22);
const p6 = new Person("xiaoxia", 23);
console.log("类: ", p5.eating === p6.eating);

// 对象有隐式原型[[Prototype]]（obj.__proto__），对应的时该构造函数的显示原型prototype
// 一个对象的属性或者方法在自身找不到，就会到原型链上去找，为什么不放在自身而是放在原型行？
// 是为了方便实现继承，节约空间占用
// 如果用上面构造函数 PersonFn 生成对象，他的 eating 方法会不断实现，浪费空间，如果放在原型上则不会出现这个问题

const obj = {name: 'xx'}
Object.defineProperty(obj,'color', {
  value: '12',
})
console.log(obj)

/**
 * 单例模式
 * 
 */
function getSingle(fn) {
  let result;
  return function() {
    result || (result = fn().apply(this, arguments) )
  }
}

function createModal() {
  const div = document.createElement('div');
  div.innerHTML = '弹框';
  div.style = 'width: 50px;height: 50px;background: red;display: none;positon: fixed;left: 50%; top: 50%;';
  document.body.appendChild(div);
  return div;
}

const createSingleModal = getSingle(createModal);

document.querySelector('body').addEventListener('click',() => {
  const modal = createSingleModal();
  modal.style.display = 'block'
})