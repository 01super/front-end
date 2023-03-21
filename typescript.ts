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
type MyExclude<T, U> = T extends U ? never : T;
type NotA = MyExclude<InExample, "a">;
type NotA1 = Exclude<InExample, "a">;

/**
 * extends 条件类型  T extends U ? X : Y
 */
type TypeCheck<T> = T extends string
  ? "string"
  : T extends number
  ? "number"
  : T extends boolean
  ? "boolean"
  : T extends undefined
  ? "undefined"
  : T extends Function
  ? "function"
  : "object";
type T0 = TypeCheck<string>; // "string"
type T1 = TypeCheck<"a">; // "string"
type T2 = TypeCheck<true>; // "boolean"
type T3 = TypeCheck<() => void>; // "function"
type T4 = TypeCheck<string[]>; // "object"

/**
 * Extract 用于从联合类型中提取特定类型 type Extract<T, U> = T extends U ? T : never;
 * Extract 的功能，与 Exclude 相反，它是 提取 T 中可以赋值给 U 的类型。
 */
interface IPerson {
  name: string;
  age: number;
  sex: 0 | 1;
}
interface IMan {
  name: string;
  age: number;
}
type Man = Extract<IPerson, IMan>; // 等效于 type Man = IPerson

type Fruits = "apple" | "banana" | "peach" | "orange";
type DislikeFruits = "apple" | "banana";
type FloveFruits = Extract<Fruits, DislikeFruits>; // 等效于 type FloveFruits = "apple" | "banana"

/**
 * NonNullable  用于删除联合类型中的 null和 undefined
 * type NonNullable<T> = T extends null | undefined ? never : T;
 */
type A = NonNullable<string | null | undefined | number>;

/**
 * Record
 */

type MyRecord<K extends keyof any, T> = {
  [P in K]: T;
};

type keyType = keyof any; // string | number | symbol

/**
 * Omit 用来 删除 符合类型 T 中不需要的属性 K，生成新的类型
 */
type newPerson = Omit<Person, "name">; // {sex:string}
type MyOmit<T, K extends keyof any> = { [P in Exclude<keyof T, K>]: T[P] };
type newPerson1 = MyOmit<Person, "name">; // {sex:string}

type MyOmit1<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};
type newPerson2 = MyOmit<Person, "name">; // {sex:string}

/**
 * as 语句的作用：会对映射类型中的键进行重新映射
 * as 语句后面新映射类型必须是 string|number|symbol 联合类型的子类型。
 */
interface User {
  name?: string;
  age?: number;
  hobby: string;
}
// 把其中某个属性修改为必填
type CustomRequired<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: T[P]; // 映射类型
};
type SpecialUser = CustomRequired<User, "name">;
const user: SpecialUser = {
  name: "1",
  hobby: "xx",
};

/**
 * infer 的英文意思：推断。可以结合 extends条件语句推断待推断的类型。
 */
type Uuids = number[];
type Names = string[];
type Unpacked<T> = T extends (infer K)[] ? K : unknown;
type UuidType = Unpacked<Uuids>; // UuidType 的类型为 number
type NameType = Unpacked<Names>; // NameType 的类型为 string

// 使用 infer 获取 Promise<xxx> 类型中 xxx 类型
type Res = Promise<number[]>;
type Unpacked1<T> = T extends Promise<infer R> ? R : unknown;
type resType = Unpacked<Res>; // resType 类型为number[]

// TypeScript 的逆变、协变、双向协变、不变
interface Father {
  name: string;
  age: number;
}

interface Son extends Father{
  name: string;
  age: number;
  hobbies: string[];
}

let son1: Son = {
  age: 18,
  name: 'xxx',
  hobbies: ['xxx']
}

let father1: Father = {
  age: 18,
  name: 'xxx',
}
// 子类型可以赋值给父类型，叫做协变
father1 = son1

let printHobbies: (son: Son) => void;
printHobbies = son => {
  console.log(son.hobbies);
}
let printName: (father: Father) => void;
printName = (father) => {
  console.log(father.name);
}
// 父类型可以赋值给子类型，叫做逆变。
printHobbies = printName

// 双向协变
// 子类型赋值给父类型可能会出现问题
// 但在 ts2.x 之前支持这种赋值，也就是父类型可以赋值给子类型，子类型可以赋值给父类型，既逆变又协变，叫做“双向协变”。
// 配置"strictFunctionTypes": false, 后下面这句赋值语句才不会报错
printName = printHobbies

// 如何确定父子关系的？
// 通过结构，更具体的那个是子类型

/**
 * Person {
 *    name: string;
 *    age: number;
 * }
 * 
 * Son {
 *    name: string;
 *    age: number;
 *    hobbies: string[];
 * }
 * Son 描述得更具体，所以Son是子类型
 * type As = 'a' | 'b';
 * type Bs = 'a' | 'b' | 'c';
 * As 描述得比 Bs 更具体，所以 As 是 Bs 的子类
 */

type StringKeys<T> = {
  [P in keyof T]: P extends string ? P : never
}[keyof T]

type C = StringKeys<Person>

type StringValues<T> = {
  [P in keyof T]: T[P] extends string ? T[P] : never
}[keyof T]

type V = StringValues<Person>

type DictArrar<T> = {
  [P in keyof T]: P extends string ? {text: T[P]; code: P} : never
}[keyof T][]

type Ar = DictArrar<Person>