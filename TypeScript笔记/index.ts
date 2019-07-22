//npm i typescript -g 安装到全局
let a:number = 10;//数字类型 包括浮点数  二进制数等
let b:string = "67352";//字符串类型
let c:boolean = false;//布尔类型
let d:void = null;//空类型
d = undefined;
let e:null = null;//null类型
let f:undefined = undefined;//undefined类型
let g:Array<string> = ["dad","dsads"];//数组
let h:string[] = ["das","das"];//数组
let j:[string,number] = ["dsads",22];//元组
let i:any = [232,"2223",false]; //任意类型 正常不建议使用
let q:object = {name:"liu",age:20};//对象类型
//type 类型 专门存放复杂或者重复的类型那些
type uType = {name:string,age:number,isMan:boolean,finally:string[]};
//点定义对象中每一个键所对应值的类型
let u:uType = {
    name:"wen",
    age:20,
    isMan:false,
    finally:["shu","du"]
}
interface uTypes{//接口定义数据类型的限制
    name:string,
    age:number,
    isMan:boolean,
    finally:[string]
}
//枚举类型 默认0,1,2...
enum enums{
    ONE,//默认0 
    TWO = 2,//设置
    THREE//自增1 这就是3
}
//函数
function func():number{
    return 20; //:number 表示返回值类型要是number
}
func();//返回值是20
function func2(value:string):void{
    console.log(value);//这里传入的value一定是字符串类型
}
func2("无返回值");
function func3(...arr:string[]):string[]{
            //传入多个数值 全是string类型 然后由arr字符串数组接收 并返回出去
    return arr;
}
func3("one","two","three","four");
//{name:string,age:number,isMan:boolean,finally:string[]} => uType
function func4(obj:uTypes):uType{
        //传入指定的对象 返回指定的对象
        obj.name = "ccc";
        obj.age = 18;
    return obj;
}
//never 是所有类型的子类型，但是却不能把其他类型赋值给这个类型 也不能把这个类型赋值给其他父类型
//当然本身就是never类型 可以赋值  通常使用在抛出异常，死循环上。
//never的使用场景
//死循环
function never01():never{
    while(true){

    }
}
//抛出异常
function never02():never{
    throw new Error("错误");
}
let returnValue:never = never01();
let returnValue2:never = never02();

//类型推断 union 也成联合类型
let infer:number|string|boolean = "200";
infer = false;

//类
class Person{
    //公共的 静态的 只能读取的 数字类型
    public static readonly PI:number = 3.1415926;
    public name:string;
    private age:number;
    //构造函数                          在这定义了一个私有的变量 到时候可以不用直接赋值 就可直接this.sex在内部使用
    constructor(name:string,age:number,private sex:string){
        this.name = name;
        this.age = age;
    }
    //set get 方法
    set setAge(age:number){
        this.age = age;
    }
    set setSex(sex:string){
        this.sex = sex;
    }
    get getAge():number{
        return this.age;
    }
    get getSex():string{
        return this.sex;
    }
    public tostring():void{
        console.log("对不住，我不想打印");
    }
}
//继承
class Student extends Person{
    private friends:string[];
    constructor(name:string,age:number,sex:string,friends:string[]){
        super(name,age,sex);
        this.friends = friends;
    }
    set setFriends(friends:string[]){
        this.friends = friends;
    }
    get getFriends():string[]{
        return this.friends;
    }
}
//定义接口
interface Wen{
    //?表示这个属性是可选的 可以不用重写
    _name?:string;
    _age:number;
    _sex:string;
    //表示这个属性只能读不能写
    readonly wen:string;
    toString():void;
}
class Liu implements Wen{
    _name:string;
    _age:number;
    _sex:string;
    wen:string;
    toString():void{
        console.log("什么鬼啊");
    };
}
//泛型函数 泛型类
//          这里<T> 也是为了见名知意
function paradigm<T>(value:T):T{
    console.log(typeof value);
    return value;
}
paradigm<string>("my is string");
function paradigm2<T>(value:T[]):T{
    console.log(typeof value);
    return value[0];
}
paradigm2<string>(["my is string one","my is string two"]);

//泛型类
class Person2<T>{
    constructor(public name:T,public sex:T){
        console.log("this.name is type "+typeof this.name);
    }
    //这里的泛型和上面的不同 所以用S表示
    public returnValue<S>(value:S):S{
        return value;
    }
}
//合并模块 模块名字相同时 里面的函数和变量等就不能相同
namespace X{
    export const PI:number = 3.1415926;
    export function calcCircle(radius:number):void{
        console.log("该圆的面积是:" + radius**2*PI);
    }
}
namespace X{
   export class Person{
        constructor(public name:string,public age:number){

        }
        get getName():string{
            return this.name;
        }
        get getNumber():number{
            return this.age;
        }
    }
}
console.log(X.PI);
X.calcCircle(10);
let person = new X.Person("Wen",18);

//导入ts文件方式
// / <reference path="index.ts" />

//symbols 唯一的 每次声明都是不一样的
let sym2:symbol = Symbol("key");
let sym3:symbol = Symbol("key");

sym2 === sym3; // false, symbols是唯一的

const getClassNameSymbol:symbol = Symbol();
const getClassNameSymbol2:symbol = Symbol();
class C {
    [getClassNameSymbol]():string{
       return "C";
    }
    [getClassNameSymbol2]():string{
        return "symbols";
    }
}
let classC = new C();
console.log(classC[getClassNameSymbol]());

//合并接口
interface Box {
    height: number;
    width: number;
}

interface Box {
    scale: number;
}

let box: Box = {height: 5, width: 6, scale: 10};

//类型断言
let bar:{a:number,b:number} = {
    a:11,
    b:33
};
let foo = bar.a as number;
// let foo = <number>bar;


//module模块的使用 es6的结构解析
// import name|{PI,...} from '路径';
// export default ... 默认导出 
// export 导出