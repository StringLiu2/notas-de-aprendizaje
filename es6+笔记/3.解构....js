/*
    ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。
    在数组 对象中 ...必须是最后的
*/
// 1.数组解构赋值
let [a, b, c] = [1, 2, 3];
let [foo, [[bar], baz]] = [1, [[2], 3]];
let [, , third] = ["foo", "bar", "baz"];
let [x, , y] = [1, 2, 3];
let [head, ...tail] = [1, 2, 3, 4];
let [x, y, z] = new Set(['a', 'b', 'c']);
//这时候右边左边都是[] 一定是数组 
// 本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值

// 2.默认值
let [x, y = 'b'] = ['a'];

// 3.对象解构赋值 同时有默认值
const obj = { a: 10, b: 20, c: 30 };
let { a = a, b = 3, e = 10 } = obj;//obj没e  所以e使用了默认的值10
let { a, ...bc } = obj;
// 4.数组对象的混合使用...和解构                d:[1,2,3,{a:11}]
let [a, { b, c }, ...d] = [{ a: "1", b: "2" }, { b: "3", c: "4" }, 1, 2, 3, { a: 11 }];
//字符串的解构赋值
const [a, b, c, d, e] = 'hello';
let { length: len } = 'hello';
len // 5
//解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。 除了undefined和null
let { toString: s } = 123;
s === Number.prototype.toString // true

let { toString: s } = true;
s === Boolean.prototype.toString // true

// 正确的写法
let x;//先声明变量的时候
({ x } = { x: 1 });

//还有其他的写法
var { x: y = 3 } = { x: 5 };
//这个x是key 下面的0也是key也就是数组的索引
var { 0: y = 3 } = [11, 1, 2, 3];
// 等等等

// 5. 对象 数组的合并
let arr2 = [1, 2, 3];
let arr3 = [4, 5, 6, 7];
let arr1 = [...arr2, ...arr3, 8, 9];//[1, 2, 3, 4, 5, 6, 7, 8, 9] 这时候...解构的时候顺序怎么都可以

let obj2 = { a: 10, b: 11 };
let obj3 = { c: 12, d: 13, e: 14 };

let obj1 = { ...obj2, ...obj3, e: 200 }; //这时候的e会覆盖掉obj3的e的值 可以做到替换并合并

// 6.在函数中的使用
const func = (...a) => {
    console.log(a);//[1,2,3,4,5,6,"12"]
}
func(1, 2, 3, 4, 5, 6, "12");

//对对象进行解构
const func2 = ({ a, b, ...c }) => {
    console.log(c);//{c: 30, d: 40}
}
const obj = { a: 10, b: 20, c: 30, d: 40 };
func2(obj);
//对数组进行解构  ...集合参数的时候 必须是最后一个 
const func3 = ([a, b, c, ...d]) => {
    console.log(d);
}
const arr = [1, 2, 3, 5, 6, 6, 5, 65];
func3(arr);
//...解构后赋值

const func4 = (a, b, c, ...d) => {
    console.log(a, b, c, d);//1 2 3 (5) [5, 6, 6, 5, 65]
}
func4(...arr);

//解构和...也可以用在一些map，filter、foreach等方法中
//7.用途 
//交换变量的值
let x = 1;
let y = 2;

[x, y] = [y, x];
//返回多个值 对象也一样可以
function example() {
    return [1, 2, 3];
}
let [a, b, c] = example();

//用来外部引入模块的时候也可以使用
//es5的引入
const {Route} = require('react-router-dom');
//es6的引入
import {Route} from 'react-router-dom';
/*  8.补充
        扩展运算符与正常的函数参数可以结合使用，非常灵活。

        function f(v, w, x, y, z) { }
        const args = [0, 1];
        f(-1, ...args, 2, ...[3]);
        扩展运算符后面还可以放置表达式。

        const arr = [
        ...(x > 0 ? ['a'] : []),
        'b',
        ];
        如果扩展运算符后面是一个空数组，则不产生任何效果。

        [...[], 1]
        // [1]
        注意，只有函数调用时，扩展运算符才可以放在圆括号中，否则会报错。

      由于扩展运算符可以展开数组，所以不再需要apply方法，将数组转为函数的参数了。

        // ES5 的写法
        Math.max.apply(null, [14, 3, 77])

        // ES6 的写法
        Math.max(...[14, 3, 77])

        // 等同于
        Math.max(14, 3, 77);

        // ES5的 写法
        var arr1 = [0, 1, 2];
        var arr2 = [3, 4, 5];
        Array.prototype.push.apply(arr1, arr2);

        // ES6 的写法
        let arr1 = [0, 1, 2];
        let arr2 = [3, 4, 5];
        arr1.push(...arr2);

        // ES5
        new (Date.bind.apply(Date, [null, 2015, 1, 1]))
        // ES6
        new Date(...[2015, 1, 1]);
*/
/* 9.扩展运算符...的运用
        （1）复制数组 是一种深拷贝方式、不是浅拷贝 拷贝后的数组改变不会改变原来的数组
         (2) 合并数组
         (3）与解构赋值结合
        （4）字符串 字符串分解成数组
         (5) 实现了 Iterator 接口的对象
            任何定义了遍历器（Iterator）接口的对象（参阅 Iterator 一章），都可以用扩展运算符转为真正的数组。
            let nodeList = document.querySelectorAll('div');
            let array = [...nodeList];
        （6）Map 和 Set 结构，Generator 函数
            let map = new Map([
                [1, 'one'],
                [2, 'two'],
                [3, 'three'],
            ]);
            let arr = [...map.keys()]; // [1, 2, 3]

            const go = function*(){
                yield 1;
                yield 2;
                yield 3;
            };
            [...go()] // [1, 2, 3]
*/