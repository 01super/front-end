// 1.
type Getters<T> = {
  [K in keyof T as `get${Capitalize<K & string>}`]: () => T[K];
};

interface Person {
  name: string;
  age: number;
  location: string;
}

type lazyPerson = Getters<Person>;

// {getName: () => Person["name"], getAge: () => Person["age"], getLocation: () => Person["location"]}

/**
 * 2.keyof: 用于返回对应类型所有 Key 的联合类型
 */
function getValue<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

/**
 * 3. Pick
 */
interface IUser {
  name: string;
  age: number;
  number: number;
}

interface IEditUser {
  name: string;
  age: number;
}

type EditUser = Pick<IUser, "name" | "age">;
// 实现
// extends 这里是约束类型。 第二个泛型输入的 Key 被约束在 T 的 key 内
type MyPick<T, K extends keyof T> = { [S in K]: T[S] };
type MyEditUser = MyPick<IUser, "name" | "age">;

/**
 * ReturnType 推断函数的返回值
 */
function fn() {
  return {
    name: "xiaoming",
    age: 18,
  };
}

type RT = ReturnType<typeof fn>;

/**
 * {[S in K]:T} 映射类型语法
 */
type InExample = "a" | "b" | "c" | "d";
type Obj = {
  [T in InExample]: string; // 遍历InExample，定义每一个key的类型为string
};

// 实现 Partial
type MyPartial<T> = { [K in keyof T]?: T[K] };
// 实现 Required
type MyRequired<T> = { [P in keyof T]-?: T[P] };
