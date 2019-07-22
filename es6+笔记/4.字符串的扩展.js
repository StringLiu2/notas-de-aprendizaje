// 1.字符串可以被for...of循环遍历。
for (let codePoint of 'foo') {
    console.log(codePoint);
}


//2.字符的 Unicode 表示法
"\u0061"// "a"
"\uD842\uDFB7"// "𠮷"
// ES2019 改变了JSON.stringify()的行为。如果遇到0xD800到0xDFFF之间的单个码点，或者不存在的配对形式，它会返回转义字符串，留给应用自己决定下一步的处理。
JSON.stringify('\u{D834}') // ""\\uD834""
JSON.stringify('\uDF06\uD834') // ""\\udf06\\ud834""


//3.模板字符串 可以直接换行 不用字符串拼接的方式在换行的字符串后面加上+
let string = `这就是
                字符串
                模板`;
$('#list').html(`
<ul>
    <li>first</li>
    <li>second</li>
</ul>
`);
//上面代码中，所有模板字符串的空格和换行，都是被保留的，比如<ul>标签前面会有一个换行。如果你不想要这个换行，可以使用trim方法消除它。
$('#list').html(`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`.trim());

//模板字符串中嵌入变量、常量、具体值、函数、表达式，需要将变量名写在${}之中

`${x} + ${y} = ${x + y}`;// "1 + 2 = 3"
function fn() {
    return "Hello World";
}
`foo ${fn()} bar` // foo Hello World bar



// 4.标签模板
alert`123`;
// 等同于
alert(123);
//例如传参
let a = 5;
let b = 10;

tag`Hello ${a + b} world ${a * b}`;
// 等同于
tag(['Hello ', ' world ', ''], 15, 50);//打印如下 最后还会打印 "OK"
function tag(s, v1, v2) {
    console.log(s[0]);// "Hello "
    console.log(s[1]);    // " world "
    console.log(s[2]);    // ""
    console.log(v1);    // 15
    console.log(v2);    // 50
    return "OK";    // "OK"
}
//“标签模板”的一个重要应用，就是过滤 HTML 字符串，防止用户输入恶意内容
//甚至可以使用标签模板，在 JavaScript 语言之中嵌入其他语言。



//5.字符串的新增方法

//5.1 String.fromCodePoint()
// ES5 提供String.fromCharCode()方法，用于从 Unicode 码点返回对应字符，但是这个方法不能识别码点大于0xFFFF的字符。
String.fromCharCode(0x20BB7);// "ஷ" 所以0x20BB7就发生了溢出，最高位2被舍弃了，最后返回码点U+0BB7对应的字符，而不是码点U+20BB7对应的字符。
//String.fromCharCode()不能识别大于0xFFFF的码点 超出的会被舍弃 从高位舍去
// ES6 提供了String.fromCodePoint()方法，可以识别大于0xFFFF的字符，弥补了String.fromCharCode()方法的不足。在作用上，正好与下面的codePointAt()方法相反。
String.fromCodePoint(0x20BB7);
// "𠮷"
String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y';
// true
// 如果String.fromCodePoint方法有多个参数，则它们会被合并成一个字符串返回。

//5.2 String.raw() 
// ES6 还为原生的 String 对象，提供了一个raw()方法。该方法返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，往往用于模板字符串的处理方法。
String.raw`Hi\n${2 + 3}!`;
// 返回 "Hi\\n5!"
String.raw`Hi\u000A!`;
// 返回 "Hi\\u000A!"
String.raw`Hi\\n`;
// 返回 "Hi\\\\n"
// 如果原字符串的斜杠已经转义，那么String.raw()会进行再次转义。

//可以作为正常的函数使用。这时，它的第一个参数，应该是一个具有raw属性的对象，且raw属性的值应该是一个数组。
String.raw({ raw: 'test' }, 0, 1, 2);
// 't0e1s2t'
// 等同于
String.raw({ raw: ['t', 'e', 's', 't'] }, 0, 1, 2);

// String.raw()的代码实现基本如下。
String.raw = function (strings, ...values) {
    let output = '';
    let index;
    for (index = 0; index < values.length; index++) {
        output += strings.raw[index] + values[index];
    }
    output += strings.raw[index];
    return output;
}

//5.3 实例方法：codePointAt()
/*
        JavaScript 内部，字符以 UTF-16 的格式储存，每个字符固定为2个字节。对于那些需要4个字节储存的字符（Unicode 码点大于0xFFFF的字符），JavaScript 会认为它们是两个字符。
        let s = "𠮷";

        s.length // 2
        s.charAt(0) // ''
        s.charAt(1) // ''
        s.charCodeAt(0) // 55362
        s.charCodeAt(1) // 57271

        ES6 提供了codePointAt()方法，能够正确处理 4 个字节储存的字符，返回一个字符的码点。
        s.codePointAt(0) // 134071 => 16进制的20BB7
        s.codePointAt(1) // 57271 => 𠮷后面的两个字节的十进制数
        s.codePointAt(2) // 97  => a的十进制数

        codePointAt()方法返回的是码点的十进制值，如果想要十六进制的值，可以使用toString()方法转换一下。
        s.codePointAt(0).toString(16); //20bb7

        for (let ch of s) {
            console.log(ch.codePointAt(0).toString(16));
        }
        // 20bb7
        // 61
*/

//5.4 实例方法：includes(), startsWith(), endsWith() 
// includes()：返回布尔值，表示是否找到了参数字符串。
// startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
// endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
let s = 'Hello world!';
s.startsWith('Hello'); // true
s.endsWith('!'); // true
s.includes('o'); // true
//这三个方法都支持第二个参数，表示开始搜索的位置。
s.startsWith('world', 6); // true
s.endsWith('Hello', 5); // true
s.includes('Hello', 6); // false

//5.5 实例方法：repeat()  repeat方法返回一个新字符串，表示将原字符串重复n次。
'x'.repeat(3); // "xxx"
'hello'.repeat(2); // "hellohello"
'na'.repeat(0); // ""
// 参数如果是小数，会被取整。
'na'.repeat(2.9); // "nana"
// 如果repeat的参数是负数或者Infinity，会报错。
'na'.repeat(Infinity);// RangeError
'na'.repeat(-1);// RangeError
//参数是 0 到-1 之间的小数，则等同于 0 参数NaN等同于 0。如果repeat的参数是字符串，则会先转换成数字。
'na'.repeat(-0.9); // ""
'na'.repeat(NaN); // ""
'na'.repeat('na'); // ""
'na'.repeat('3'); // "nanana"

//5.6 实例方法：padStart()，padEnd()  ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全。
'x'.padStart(5, 'ab'); // 'ababx'
'x'.padStart(4, 'ab'); // 'abax'
'x'.padEnd(5, 'ab'); // 'xabab'
'x'.padEnd(4, 'ab'); // 'xaba'
// 接受两个参数，第一个参数是字符串补全生效的最大长度，第二个参数是用来补全的字符串。
// 如果原字符串的长度，等于或大于最大长度，则字符串补全不生效，返回原字符串。
'xxx'.padStart(2, 'ab'); // 'xxx'
'xxx'.padEnd(2, 'ab'); // 'xxx'
//如果用来补全的字符串与原字符串，两者的长度之和超过了最大长度，则会截去超出位数的补全字符串。
'abc'.padStart(10, '0123456789');// '0123456abc'

//padStart()的常见用途是为数值补全指定位数。下面代码生成 10 位的数值字符串
'1'.padStart(10, '0') // "0000000001"
'12'.padStart(10, '0') // "0000000012"
'123456'.padStart(10, '0') // "0000123456"
// 另一个用途是提示字符串格式。
'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"

//5.7 实例方法：trimStart()，trimEnd()
//ES2019 对字符串实例新增了trimStart()和trimEnd()这两个方法。它们的行为与trim()一致，trimStart()消除字符串头部的空格，trimEnd()消除尾部的空格。它们返回的都是新字符串，不会修改原始字符串。
const s = '  abc  ';
s.trim() // "abc"
s.trimStart() // "abc  "
s.trimEnd() // "  abc"
//浏览器还部署了额外的两个方法，trimLeft()是trimStart()的别名，trimRight()是trimEnd()的别名。