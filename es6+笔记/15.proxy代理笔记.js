//proxy代理
class Register {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    func1(){
        console.log("方法");
    }
}

// const register = new Register(3, '张三');
//对对象register进行代理        第一个参数就是需要代理的对象，第二个就是一个对象，放内置方法
const proxy = new Proxy(new Register(3, '张三'),{//可以让数据获取或者更新的时候通过代理来做一些操作
    set(target,key,value){
        // console.log("set",target,key,value);//set Register { id: 3, name: '张三' } id 20
        target[key] = value;
        // console.log(target[key]);//3 当前面使用了赋值，然后这里就不是之前默认的3了
        return Reflect.set(target,key,value);//防止在浏览器上发生报错
    },
    get(target,key){
        // console.log("get",target,key);
        // console.log(target[key]);
        return target[key];
    }
});
proxy.id = 20;//这时候自动调用代理里面的set方法
proxy.name = '大神';
proxy.func1();
// console.log(proxy.name);//大神

/*
    Proxy对象方法列表:
        apply(); //拦截Proxy实例作为函数调用的操作
        construct(); //拦截Proxy实例作为构造函数调用的操作
        defineProperty(); //拦截Object.defineProperty操作
        deleteProperty(); //拦截delete删除属性操作
        get(); //拦截属性的读取操作
        getOwnPropertyDescriptor(); //拦截Object.getOwnPropertyDescriptor操作
        getPrototype();//拦截获取原型对象的操作
        has(); // 拦截属性检查操作
        isExtensible(); //拦截Object.isExtensible操作
        ownKeys(); //拦截Object.getOwnPropertyNames操作
        preventExtensions操作();//拦截Object.preventExtensions操作
        set();//拦截属性赋值操作
        setPrototypeOf();//拦截Object.setPrototypeOf操作
        Proxy.revocable();// 创建一个可以取消的Proxy实例
*/