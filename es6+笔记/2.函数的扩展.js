/*
    ES6 新增书写函数的新方式 箭头函数 参数默认值 指定参数传值 解构赋值
*/
// 1. 箭头函数
//es5 的时候 定义一个函数
function func (){
    console.log("es5的函数定义");
}
const func6 = () => {
    console.log("es6的函数定义");
}

ajax(function(){});

ajax(()=>{});

//当只有一个return时 可以省略 {} return 
const calc = (x,y)=>x+y;


// 2.参数默认值
function func2 (x = 0,y = 1){}
func2();

// 3.指定参数传值
let x = 10;
let y = -10;
func2(y = y,x = x);

const func3 = ({x = 10,y = 0}) => {}
func3({
    x:10,
    y:-10,
    z:"111"
});