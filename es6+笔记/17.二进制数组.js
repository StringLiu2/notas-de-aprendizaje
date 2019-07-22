//ArrayBuffer对象
//TypedArray视图
//DataView视图

// ArrayBuffer对象代表原始的二进制数据，TypedArray视图用来读写简单类型的二进制数据，DataView视图用来读写复杂类型的二进制数据
function arrayBufferToBase64(buffer){
    let binary = '';
    const bytes = new Uint8Array(buffer);//将ArrayBuffer数据转换成Uint8Array八位无符号整数值的类型化数组
    const len = bytes.byteLength;//获取Uint8Array的字节长度
    for (let index = 0; index < len; index++) {
        binary += String.fromCharCode(bytes[i]);//fromCharCode字符串内置的方法，接受一个unicode值bytes[i],返回字符串
        // charCodeAt(); 就是返回一个unicode编码的对应的值0-65535
    }
    return window.btoa(binary);//将二进制字符串转换成base64编码字符串
}
const fileInput = document.getElementById('fileInput');
const file = fileInput.files[0];//获取上传的图片文件流
const reader = new FileReader();//创建一个文件读取流

reader.readAsArrayBuffer(file);//将文件转换成文件读取流
reader.onload = ()=>{//全部转换后
    const arrayBuffer = reader.result;//获取到ArrayBuffer数据
    const arrayBase = arrayBufferToBase64(arrayBuffer);//调用方法转成二进制流
    this.buffer = `data:image/png;base64,${arrayBase}`;//然后以base64的方式展示
}