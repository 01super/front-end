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
// 实现Exclude
type MyExclude<T, U> = T extends U ? never : T
type NotA = MyExclude<InExample, 'a'>
type NotA1 = Exclude<InExample, 'a'>

/**
 * extends 条件类型  T extends U ? X : Y
 */
type TypeCheck<T> = T extends string
    ? 'string'
    : T extends number
        ? 'number'
        : T extends boolean
            ? 'boolean'
            : T extends undefined
                ? 'undefined'
                : T extends Function
                    ? 'function'
                    : 'object';
type T0 = TypeCheck<string>; // "string"
type T1 = TypeCheck<'a'>; // "string"
type T2 = TypeCheck<true>; // "boolean"
type T3 = TypeCheck<() => void>; // "function"
type T4 = TypeCheck<string[]>; // "object"

/**
 * Extract 用于从联合类型中提取特定类型 type Extract<T, U> = T extends U ? T : never;
 * Extract 的功能，与 Exclude 相反，它是 提取 T 中可以赋值给 U 的类型。
 */
interface IPerson {
  name: string,
  age: number,
  sex: 0 | 1,
}
interface IMan {
  name: string,
  age: number,
}
type Man = Extract<IPerson, IMan> // 等效于 type Man = IPerson

type Fruits = "apple" | "banana"  | 'peach' | 'orange';
type DislikeFruits = "apple" | "banana";
type FloveFruits = Extract<Fruits, DislikeFruits> // 等效于 type FloveFruits = "apple" | "banana"


















