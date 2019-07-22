//Decorator 修饰器，装饰器 (游戏的装备一样，给自己加一开始没有的东西)
// function chooseCourse(target){
//     console.log('调用了');
//     target.course = '物理';
// }
// function setStudy(target){
//     console.log('学习');
// }
function roomclass(roomname){
    return target => {
        target.roomname = roomname;
        target.func = ()=>{
            console.log('这是一个方法,直接赋值给target');
        }
    }
}
// @chooseCourse
// @roomclass('科室')//可以传参
class Student{//修饰器只能用于类和类的方法，不能使用函数，会导致函数提升而发生错误
    // @setStudy//这里表示修饰这个方法
    exam(){
        console.log('考试');
    }
}
// Student.setStudy();//然后里面有这些方法

//代理就是隐藏本来的对象，然后使用代理后的对象，而装饰器就是给对象加上一些东西，修饰对象，给对象添加东西