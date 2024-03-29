//1.Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。

let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};
// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']
// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
Array.from({ length: 3 });
// [ undefined, undefined, undefined ]
//对于还没有部署该方法的浏览器，可以用Array.prototype.slice方法替代。
const toArray = (() =>
  Array.from ? Array.from : obj => [].slice.call(obj)
)();


//Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);
Array.from([1, 2, 3], x => x * x)
// [1, 4, 9]


let spans = document.querySelectorAll('span.name');
// map()
let names1 = Array.prototype.map.call(spans, s => s.textContent);
// Array.from()
let names2 = Array.from(spans, s => s.textContent)

//2.Array.of()
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1

//3.数组实例的 copyWithin() 
/* 
    数组实例的copyWithin方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。

    Array.prototype.copyWithin(target, start = 0, end = this.length)
    它接受三个参数。
    target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
    start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示倒数。
    end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。
    这三个参数都应该是数值，如果不是，会自动转为数值。

    [1, 2, 3, 4, 5].copyWithin(0, 3)
    // [4, 5, 3, 4, 5]
    上面代码表示将从 3 号位直到数组结束的成员（4 和 5），复制到从 0 号位开始的位置，结果覆盖了原来的 1 和 2。

    下面是更多例子。

    // 将3号位复制到0号位
    [1, 2, 3, 4, 5].copyWithin(0, 3, 4)
    // [4, 2, 3, 4, 5]

    // -2相当于3号位，-1相当于4号位
    [1, 2, 3, 4, 5].copyWithin(0, -2, -1)
    // [4, 2, 3, 4, 5]

    // 将3号位复制到0号位
    [].copyWithin.call({length: 5, 3: 1}, 0, 3)
    // {0: 1, 3: 1, length: 5}

    // 将2号位到数组结束，复制到0号位
    let i32a = new Int32Array([1, 2, 3, 4, 5]);
    i32a.copyWithin(0, 2);
    // Int32Array [3, 4, 5, 4, 5]

    // 对于没有部署 TypedArray 的 copyWithin 方法的平台
    // 需要采用下面的写法
    [].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
    // Int32Array [4, 2, 3, 4, 5]

5.数组实例的 find() 和 findIndex()
    数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。
    数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置
    回调函数有三个参数：value, index, arr 数组值、索引值、原数组

6.实例 fill 方法使用给定值，填充一个数组
    ['a', 'b', 'c'].fill(7)
    // [7, 7, 7]
    new Array(3).fill(7)
    // [7, 7, 7]

    ['a', 'b', 'c'].fill(7, 1, 2)
    // ['a', 7, 'c']
    上面代码表示，fill方法从 1 号位开始，向原数组填充 7，到 2 号位之前结束。
    注意，如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象。
    let arr = new Array(3).fill({name: "Mike"});
    arr[0].name = "Ben";
    arr
    // [{name: "Ben"}, {name: "Ben"}, {name: "Ben"}]

    let arr = new Array(3).fill([]);
    arr[0].push(5);
    arr
    // [[5], [5], [5]]


7.entries()，keys()和values()
    ES6 提供三个新的方法——entries()，keys()和values()——用于遍历数组
    可以用for...of循环进行遍历，唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。

    如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历。
    let letter = ['a', 'b', 'c'];
    let entries = letter.entries();
    console.log(entries.next().value); // [0, 'a']
    console.log(entries.next().value); // [1, 'b']
    console.log(entries.next().value); // [2, 'c']

8.数组实例的 includes()
    第一个参数是需要查找的值
    该方法的第二个参数表示搜索的起始位置
    [1, 2, 3].includes(3, -1); // true

    indexOf方法有两个缺点，一是不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于-1，表达起来不够直观。二是，它内部使用严格相等运算符（===）进行判断，这会导致对NaN的误判。


9.数组实例的 flat()，flatMap()
    嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。
    [1, 2, [3, [4, 5]]].flat(2)
    // [1, 2, 3, 4, 5]
    上面代码中，flat()的参数为2，表示要“拉平”两层的嵌套数组。
    如果不管有多少层嵌套，都要转成一维数组，可以用Infinity关键字作为参数。
    [1, [2, [3]]].flat(Infinity)
    // [1, 2, 3]
    如果原数组有空位，flat()方法会跳过空位。
    [1, 2, , 4, 5].flat()

    flatMap()方法对原数组的每个成员执行一个函数（相当于执行Array.prototype.map()），然后对返回值组成的数组执行flat()方法。该方法返回一个新数组，不改变原数组。
    // 相当于 [[2, 4], [3, 6], [4, 8]].flat()
    [2, 3, 4].flatMap((x) => [x, x * 2])
    // [2, 4, 3, 6, 4, 8]
    flatMap()只能展开一层数组。

10.数组的空位指，数组的某一个位置没有任何值。比如，Array构造函数返回的数组都是空位。
        Array(3) // [, , ,]
        上面代码中，Array(3)返回一个具有 3 个空位的数组。

        注意，空位不是undefined，一个位置的值等于undefined，依然是有值的。空位是没有任何值，in运算符可以说明这一点。
        forEach(), filter(), reduce(), every() 和some()都会跳过空位。
        map()会跳过空位，但会保留这个值
        join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。

    ES6
        ES6 则是明确将空位转为undefined。
        Array.from方法会将数组的空位，转为undefined，也就是说，这个方法不会忽略空位。
        Array.from(['a',,'b'])
        // [ "a", undefined, "b" ]
        扩展运算符（...）也会将空位转为undefined。
        [...['a',,'b']]
        // [ "a", undefined, "b" ]
        copyWithin()会连空位一起拷贝。
        [,'a','b',,].copyWithin(2,0) // [,"a",,"a"]
        fill()会将空位视为正常的数组位置。

        new Array(3).fill('a') // ["a","a","a"]
        for...of循环也会遍历空位。

        entries()、keys()、values()、find()和findIndex()会将空位处理成undefined。
*/