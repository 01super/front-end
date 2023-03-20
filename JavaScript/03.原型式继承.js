const obj = {
    name: 'obj'
}

function createObject1(o) {
    const newObj = {};
    Object.setPrototypeOf(newObj, o);
    return newObj
}

const info1 = createObject1(obj);
console.log(info1, info1.name, info1.__proto__)

function createObject2(o) {
    function Fn() {}
    Fn.prototype = o;
    const newObj = new Fn();
    return newObj
}

const info2 = createObject2(obj);
console.log(info2, info2.name, info2.__proto__)

const info3 = Object.create(obj);
console.log(info3, info3.name, info3.__proto__)