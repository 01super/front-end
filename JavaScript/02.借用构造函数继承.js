function Person(name, type, friends) {
    this.name = name;
    this.type = type;
    this.friends = friends;
}
Person.eating = function () {
    console.log('eating')
}
function Student(study, name, type, friends) {
    Person.call(this,name, type, friends)
    this.study = study
}

Person.study = function () {
    console.log('study')
}

const s1 = new Student('English', 'xiaohu', 'person', ['xiaohua,liuyifei'])
console.log('s1: ', s1)
console.log(s1 instanceof Student)
console.log(s1 instanceof Person)
// s1.eating(); // 没有

// 缺点：
// 生成多个Student 实例，Person 函数会被调用多次
// 不需要的属性依然存在
//