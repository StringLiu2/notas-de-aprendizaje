//set  里面不能有重复的数值，对象  可以存入NaN
const set1 = new Set([1,2,1,2,[1,2,3],[1,2,3],{"a":1},{"a":1}]);
console.log(set1);//{ 1, 2, [ 1, 2, 3 ], [ 1, 2, 3 ], { a: 1 }, { a: 1 } } 证明了set只能把基本类型重复的去掉，如果是引用类型 数组，对象就不用
console.log(set1.add(3)); //添加一个值进去set集合,返回一个布尔值确认成功否
// set1.has(2); //判断集合中是否有这个值 返回布尔数值
console.log([...set1.entries()]);//返回一个key和value一样的值,还有values,keys这两个内置方法
//entries values keys 方法获取后的值是一个迭代器iterator iterator有三个方法 next方法和指针一样
/* 
[
  [ 1, 1 ],
  [ 2, 2 ],
  [ [ 1, 2, 3 ], [ 1, 2, 3 ] ],
  [ [ 1, 2, 3 ], [ 1, 2, 3 ] ],
  [ { a: 1 }, { a: 1 } ],
  [ { a: 1 }, { a: 1 } ]
]
*/
console.log(set1.delete(2));//删除集合中的一个,返回一个布尔值确认成功否
set1.clear();//清空集合，无返回值
console.log([...set1]);
set1.add(1);
set1.add(2);
set1.add([3,3]);
// console.log(set1.size); size 属性 获取到set的长度
// set1.forEach((val)=>{//set自带的遍历方法foreach
//     console.log(val);
// });


//WeakSet集合 放入的对象必须是对象
const weakSet= new WeakSet();
let str = new String('字符串');
weakSet.add(str);
weakSet.add(new Number(12));
weakSet.add({"a":1,"b":2});
weakSet.add(new Object({"a":1,"b":2}));
//weakSet只有has，add，delete方法 ***
// str = null;//weakSet是弱引用，当str为空的时候，那样集合weakSet里面也没了 变成false
console.log(weakSet.has(str));