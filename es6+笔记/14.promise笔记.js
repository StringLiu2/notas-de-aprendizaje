// promise 代替回调函数的一个方式,可以在多重嵌套的情况下,可简化代码的阅读性,解决小部分回调地狱问题
//                           resolve 执行后执行then reject执行后执行catch
const promise = new Promise((resolve,reject)=>{
    console.log("来了老弟");
    resolve(200);//里面可以传入各种类型的数据,例如string，object，boolean，number，array，Symbol等
    // reject(404);
});
promise.then(res=>{
    console.log(`成功${res}`);
}).catch((err)=>{
    console.log(`失败${err}`);
});

// Promise.all([数组这里放0-n个请求]);//数组里面的请求只要全部成功一个就执行Promise的then
// Promise.resolve();//成功,执行then
// Promise.reject();//失败,执行catch
// Promise.race([]);//数组里面的请求只要成功一个就执行Promise的then