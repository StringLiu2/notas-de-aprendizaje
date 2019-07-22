// 1.属性的简洁表示法.
let a = 1;
const foo = {a}; // a:1

// 方法的简洁表示法
const obj = {
    success(){ //去掉冒号和function

    }
};

//2.对象新增的方法
//2.1 is方法
Object.is(-0,+0);//比较两个值是否相等
// 可以比较-0 +0 NaN和NaN 是相等的，替代了== === 无法判断值-0 +0和NaN NaN是否相等

//2.2 assign方法 合并多个或者一个对象,属性名是Symbol也会被拷贝
Object.assign(obj,{a:2},{c:3,a:4});//同时后面的会替代掉前面的相同的变量方法 合并到obj中 同时也返回一个合并后的obj
//当里面的值为一个时，会返回那个对象，或者不为对象，会转换成对象并返回
const obj2 = Object.assign({"aa":"对象"});
const obj3 = Object.assign("对象");//会转换成对象 
console.log(typeof obj3);//object

class Student{}
//assign 是浅拷贝 拷贝后的对象被更改之后，原来的对象也会被修改
Object.assign(Student,{x:1,y:3});//可以为对象添加属性
Object.assign(Student.prototype,{//可以给对象添加函数
    methodPrint(){
        console.log('添加的方法');
    }
});
console.log(Student.x);//1
const student = new Student();
console.log(student.x);//undefined
student.methodPrint();

//还有合并对象，拷贝对象的作用

//3.Object.getOwnPropertyDescriptors() es5的时候引入了Object.getOwnPropertyDescriptor()方法会返回某个对象属性的描述对象(descriptor)
// getOwnPropertyDescriptors ES7引入，返回某个对象自身的所有属性，（非继承属性）的描述对象
// const descriptor = Object.getOwnPropertyDescriptor(obj.a);//undefined
const descriptors = Object.getOwnPropertyDescriptors(obj);
// console.log(descriptor);
console.log(descriptors);
/* 
{ success:
   { value: [Function: success],
     writable: true,
     enumerable: true,
     configurable: true },
  a:
   { value: 4, writable: true, enumerable: true, configurable: true },
  c:
   { value: 3, writable: true, enumerable: true, configurable: true } }
*/
// 使用Object.getOwnPropertyDescriptors(obj) 可以正确拷贝对象
const obj4 = {
    ce:111
}
Object.defineProperties(obj4,Object.getOwnPropertyDescriptors(obj));//拷贝对象到obj4中
console.log('================================================');
// console.log(Object.getOwnPropertyDescriptors(obj4));

// Object.create();创建一个对象

// __proto__属性，用来读取或设置当前对象的prototype对象，目前ie11+都部署了这个属性
// Object.setPrototypeOf();写操作 Object.getPrototypeOf();写操作可以代替Object.create()


//4.Object.keys() Object.values() Object.entries(); 三个方法 获取对象的全部key，全部value，全部(key,value)
//前面keys，values可以把对象转换成set entries把对象转换成map

//5.Object.fromEntries();entries的逆操作，可以把map转换成对象