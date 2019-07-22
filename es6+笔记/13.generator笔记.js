// generator函数语法，
// 1.在关键字和函数名之间有个* 
// 2.函数体可以使用yield语句
// 3.函数调用后不会立即执行，返回的是一个遍历器对象。
function* generator() {
    yield "这是第一个yield";
    //先运行括号中的yield 然后输出console.log的内容  然后后面拼接的变成了nudefined
    console.log("这是console.log:" + (yield "输出的yield"));//当gener.next("我是注入的yield"); //这时候就会出现=>这是console.log:我是注入的yield 这句话了
    yield "这是第二个yield";
    yield "这是第三个yield";
    return "end";
}
const gener = generator();//返回的是一个iterator迭代器,可以遍历
// console.log(gener);//Object [Generator] {}
// console.log([...gener]);//[ '这是第一个yield', '这是第二个yield', '这是第三个yield' ]
for (const val of gener) {
    console.log(val);
}
// console.log(gener.next());//{ value: undefined, done: true }

console.log("=================================");
function* generCalc(num) {
    let x = 2 * (yield num);
    console.log("x1:" + x);
    let y = yield x * 3;
    console.log('y：' + y);
    console.log(x,y);
}
const calc = generCalc(3);
for (const val of calc) {
    console.log(val);
}
/*  结果：
3
x1:NaN
NaN
y：undefined
NaN undefined
*/
console.log("第二种方式");
const calc2 = generCalc(3);
console.log(calc2.next());//执行第一个yield 
console.log(calc2.next(3));//2 * 3  =>  x1:6//执行一个人yield下面的全部 比如 let x 的赋值，后面的打印，同时也执行了第二个yield
console.log(calc2.next());//6 * 3 =>{ value: 18, done: false }//执行第二个yield后面的 如果有第三个就执行第三个 不然就是{ value: undefined, done: true }结尾
/* 结果
{ value: 3, done: false }
x1:6
{ value: 18, done: false }
y：undefined
6 undefined
{ value: undefined, done: true }
*/

//异步执行方式
let async;//当采用这个(方法二)的时候，就不会出现两个yield同时执行
/* 就不会发生抢占式的执行
    3000 on
    time13000
    1000 on
    time21000
*/
function times(time) {
    setTimeout(()=>{
        console.log(time + ' on');
        async.next(time);//当第一个yield执行完毕后才会执行第二个yield 然后就是第三个... 传参后执行结果f1 f2就会出现该值
    },time);
}
function *generAsync() {
    let f1 = yield times(3000);
    console.log('time1'+f1);
    let f2 = yield times(1000);
    console.log('time2'+f2);
}
async = generAsync();
// let async = generAsync();
async.next();
// async.next();
// async.next();
// 执行结果
/* 
    time1
    time2
    1000 on
    3000 on
    //可以看出这是一个异步的，第一个yield执行后第二个yield马上执行，不会等待
*/