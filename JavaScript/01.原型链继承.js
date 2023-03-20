function Person() {
    this.type = 'person';
    this.friends = [];
}
Person.prototype.eating = function () {
    console.log('eating')
}
function Student(study) {
    this.study = study
}
Student.prototype.study = function () {
    console.log('study')
}
// s1.__proto__ = new Person()
Student.prototype = new Person()
const s1 = new Student('语文');
console.log(s1)
console.log('s1 instanceof Person: ', s1 instanceof Person)
console.log('s1 instanceof Person: ', s1 instanceof Student)
// 缺点：
// 1.打印s1对象时，里面有些对象是看不到的，（type在原型链上）
// 2.相互影响
const s2 = new Student('数学');
s2.friends.push('xiaohua')
console.log(s1.friends, s2.friends, s1.friends === s2.friends)
// 这里不会影响
s1.type = 'dog';  // type 是在自身上新创建的，而不是改的原型链上的
console.log('s1: ', s1)
console.log('s1.type: ', s1.type)
console.log('s2.type: ', s2.type)
//3. 不好传递参数
// function Person(type) {
//     this.type = 'person';
//     this.friends = [];
// }