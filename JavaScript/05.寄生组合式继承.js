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
Student.prototype = Object.create(Person.prototype);
Object.defineProperty(Student, 'constructor', {
    value: Student,
    enumerable: false,
    configurable: true,
    writable: true
});

Student.prototype.study = function () {
    console.log('study')
}

const s1 = new Student('math')
console.log(s1, s1 instanceof Student, s1 instanceof Person)



