const person = {
  first: "zhang",
  last: "san",
  get fullName() {
    return `${this.first} ${this.last}`;
  },
};

const proxy = new Proxy(person, {
  get(target, key, receiver) {
    console.log("target === person: ", target === person);
    console.log("getter");
    /**
     * getter 本应触发三次，但只触发一次，因为fullName中的this指向target（person）而不是proxy实例
     */
    // return target[key]; // 触发一次getter

    // receiver指的是proxy代理对象，如果Target[PropertyKey]是访问器属性，则在getter函数中用作this值的引用。
    return Reflect.get(target, key, receiver); // 触发一三次getter
  },
});

console.log(proxy.fullName);
