// iterator遍历器，也叫迭代器
const arr = [1, 2, 3, "das", 423, [1222, 233], {}];
const iteratorArr = arr[Symbol.iterator]();//使用Symbol里面的iterator把一个数组直接变成一个遍历器
// console.log(...iteratorArr); // 1 2 3 'das' 423 [ 1222, 233 ] {}

// while(true){
//     const val = iteratorArr.next();
//     if(val.done) break;
//     console.log(val.value);
// }
for (const iterator of iteratorArr) {
    console.log(iterator);
}
console.log("===================================");
const obj = {
    arr: [1, 2, 3, [44, 44], { "key": "value" }],
    [Symbol.iterator]() {
        const slef = this;
        slef.arr.reverse();//倒序一波 把数组换了过来
        return {
            next() {
                // console.log("数组:",slef.arr);
                return {
                    done: slef.arr.length < 1 ? true : false,
                    value: slef.arr.pop()
                }
            }
        }
    }
}
const iterator2 = obj[Symbol.iterator]();
while (true) {
    const val = iterator2.next();
    if (val.done) break;
    console.log(val.value);
}
