//map 和object不一样 
const objkey1 = {};
const objkey2 = {};
const obj = {};
obj[objkey1] = 11;
obj[objkey2] = 1122;
console.log({...obj});//这时候objkey1 objkey2 都被转换成字符串，所以就覆盖了
//而map不会这样 map把所有的key都转换成hash值，不会重新覆盖 可以存入NaN
const mapDate = new Map();

mapDate.set(objkey1,11);
mapDate.set(objkey2,22);
let objval1 = mapDate.get(objkey1);
console.log(objval1);
console.log(mapDate.has(objkey1));
console.log([...mapDate]);//变成数组中的数组[ [ {}, 11 ], [ {}, 22 ] ]
//map和set一样 拥有着 values keys entries has delete clear forEach 这几个内置方法,size这个属性获取长度,唯一不同的是map是用set添加 有着对应的key value形式, get获取 通过key获取  而set只有add添加，没有查看的
console.log("------------------");
const mapDate2 = new Map([['one','111'],['two','222']]);//这时候 数组里面的数组的第一个是key 第二个是值
console.log(mapDate2.size);
console.log(...mapDate2);
console.log(mapDate2.get('one'));
const iterator = mapDate2.entries();//entries values keys 方法获取后的值是一个迭代器iterator iterator有三个方法 next方法和指针一样
// return返回值 throw返回是否有错误 return throw不知道怎么用
// console.log(iterator.next());
//遍历出来的iterator中带有两个属性 一个是获取到键值对、值、键之一的value属性 ,一个是获取是否迭代完毕的 done属性
// while(true){
//     let entries = iterator.next();
//     if(entries.done)break;
//     console.log(entries);
// }
for (const value of iterator) {
    console.log(value);
}
// console.log();



//weakmap  「 只接受对象为键名(key) 」 也是浅引用，浅拷贝，当对象被回收，那样weakMap里面的key也被回收
const weakMap = new WeakMap();
weakMap.set({},111);
//weakMap有set get delete 三个方法 除此之外没了 ***