//Symbol 新的引用变量，可以创建出一个个完全唯一的Symbol值
const symbol1 = Symbol();
const symbol2 = Symbol(222);
//实例化后的symbol有两个方法 一个是toString 转换成字符串的方法 还有一个就是valueOf方法 不清楚用处，好像就只是把自身打印出来
console.log(symbol2.toString());
console.log(symbol2.valueOf());
console.log(symbol2);

// Symbol内置了不少的方法，属性，如

console.log(typeof symbol2);//判断一下类型
const obj = {
    "a": "aaaa",
    toString() {
        return this.a
    }
}
const symbol3 = Symbol(obj);
console.log(symbol3);//Symbol([object Object]). 当对象有toString方法时，就会默认调用对象的toString方法,打印出Symbol(aaaa)

//Symbol可以转换成字符串
let str = String(symbol3);
console.log(str, typeof str);

//Symbol可以转换成布尔类型
let bool = Boolean(symbol3);
console.log(bool, typeof bool);

const symbol4 = Symbol('foo');
// symbol4.description;//foo es2019的提案


//Symbol还能作为一个函数、变量的属性名 然后使用的时候不能用. 只能用[]
//作为变量名
let obj2 = {};
obj2[symbol4] = 100;
// console.log(obj2.symbol4);//错误、会报错
console.log(obj2[symbol4]);
//做为函数名
obj2[symbol3] = () => console.log('function');
obj2[symbol3]();


//Object
const symbolName = Object.getOwnPropertySymbols(obj2);
console.log(symbolName);//[ Symbol(foo), Symbol(aaaa) ] 获取到了一个symbol作为key的数组

//Symbol的for方法 会被登记到全局变量中
console.log(Symbol.for('foo') === Symbol.for('foo'));//可以判断两个Symbol是否相等
// Symbol.keyFor(Symbol.for('foo'));//foo 返回一个被for登记后的Symbol的key