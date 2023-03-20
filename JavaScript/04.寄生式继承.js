const obj = {
    name: 12,
    fn() {
        return 111;
    }
}

function createObj(name, age) {
    const s = Object.create(obj);
    s.name = name;
    s.age = age;
    return s;
}

const s = createObj('xxx', 23);