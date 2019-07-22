//1.二进制和八进制表示法
// ES6 提供了二进制和八进制数值的新的写法，分别用前缀0b（或0B）和0o（或0O）表示。
0b111110111 === 503 // true
0o767 === 503 // true

//如果要将0b和0o前缀的字符串数值转为十进制，要使用Number方法。
Number('0b111');  // 7
Number('0o10');  // 8



// 2. Number.isFinite(), Number.isNaN()
//Number.isFinite()用来检查一个数值是否为有限的（finite），即不是Infinity。
//注意，如果参数类型不是数值，Number.isFinite一律返回false。

//Number.isNaN()用来检查一个值是否为NaN。
Number.isNaN(NaN); // true
Number.isNaN(15); // false
Number.isNaN('15'); // false
Number.isNaN(true); // false
Number.isNaN(9/NaN); // true
Number.isNaN('true'/ 0); /// true
Number.isNaN('true' / 'true'); /// true
// 如果参数类型不是NaN，Number.isNaN一律返回false。

/* 
它们与传统的全局方法isFinite()和isNaN()的区别在于，传统方法先调用Number()将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，Number.isFinite()对于非数值一律返回false, Number.isNaN()只有对于NaN才返回true，非NaN一律返回false。
*/


// 3.Number.parseInt(), Number.parseFloat()
//ES6 将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。

//4.Number.isInteger()用来判断一个数值是否为整数。
// JavaScript 内部，整数和浮点数采用的是同样的储存方法，所以 25 和 25.0 被视为同一个值。
Number.isInteger(25) // true
Number.isInteger(25.0) // true
Number.isInteger(25.1) // false
// 如果参数不是数值，Number.isInteger返回false。

Number.isInteger() // false
Number.isInteger(null) // false
Number.isInteger('15') // false
Number.isInteger(true) // false
/*
    如果一个数值的绝对值小于Number.MIN_VALUE（5E-324），即小于 JavaScript 能够分辨的最小值，会被自动转为 0。这时，Number.isInteger也会误判。

Number.isInteger(5E-324) // false
Number.isInteger(5E-325) // true
*/


//5.ES6 在Number对象上面，新增一个极小的常量Number.EPSILON。根据规格，它表示 1 与大于 1 的最小浮点数之间的差。
/* 
    对于 64 位浮点数来说，大于 1 的最小浮点数相当于二进制的1.00..001，小数点后面有连续 51 个零。这个值减去 1 之后，就等于 2 的 -52 次方。
    Number.EPSILON实际上是 JavaScript 能够表示的最小精度。误差如果小于这个值，就可以认为已经没有意义了，即不存在误差了。

    引入一个这么小的量的目的，在于为浮点数计算，设置一个误差范围。我们知道浮点数计算是不精确的。
    0.1 + 0.2 === 0.3 // false
*/
// Number.EPSILON的实质是一个可以接受的最小误差范围。
function withinErrorMargin (left, right) {
  return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
}

0.1 + 0.2 === 0.3 // false
withinErrorMargin(0.1 + 0.2, 0.3) // true

1.1 + 1.3 === 2.4 // false
withinErrorMargin(1.1 + 1.3, 2.4) // true

//6.安全整数和 Number.isSafeInteger()
//      JavaScript 能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），超过这个范围，无法精确表示这个值。
//      Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内。


//7.Math.trunc()
// Math.trunc方法用于去除一个数的小数部分，返回整数部分。

Math.trunc(4.1) // 4
Math.trunc(4.9) // 4
Math.trunc(-4.1) // -4
Math.trunc(-4.9) // -4
Math.trunc(-0.1234) // -0
// 对于非数值，Math.trunc内部使用Number方法将其先转为数值。

Math.trunc('123.456') // 123
Math.trunc(true) //1
Math.trunc(false) // 0
Math.trunc(null) // 0
// 对于空值和无法截取整数的值，返回NaN。

Math.trunc(NaN);      // NaN
Math.trunc('foo');    // NaN
Math.trunc();         // NaN
Math.trunc(undefined) // NaN

/* 
    8.Math.sign方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。

        它会返回五种值。

        参数为正数，返回+1；
        参数为负数，返回-1；
        参数为 0，返回0；
        参数为-0，返回-0;
        其他值，返回NaN。

    9.Math.cbrt() 
        Math.cbrt方法用于计算一个数的立方根。
    10.Math.clz32()方法将参数转为 32 位无符号整数的形式，然后返回这个 32 位值里面有多少个前导 0。
        Math.clz32(0) // 32
        Math.clz32(1) // 31
    11.Math.imul方法返回两个数以 32 位带符号整数形式相乘的结果，返回的也是一个 32 位的带符号整数。
    12.Math.fround方法返回一个数的32位单精度浮点数形式。
    13.Math.hypot方法返回所有参数的平方和的平方根。
        Math.hypot(3, 4);        // 5
        Math.hypot(3, 4, 5);     // 7.0710678118654755
        Math.hypot();            // 0
        Math.hypot(NaN);         // NaN
        Math.hypot(3, 4, 'foo'); // NaN
        Math.hypot(3, 4, '5');   // 7.0710678118654755
        Math.hypot(-3);          // 3
    14.Math.expm1(x)返回 ex - 1，即Math.exp(x) - 1。
    15.Math.log1p(x)方法返回1 + x的自然对数，即Math.log(1 + x)。如果x小于-1，返回NaN。
    16.Math.log10(x)返回以 10 为底的x的对数。如果x小于 0，则返回 NaN。
    17.Math.log2(x)返回以 2 为底的x的对数。如果x小于 0，则返回 NaN。

    18.双曲线函数
        Math.sinh(x) 返回x的双曲正弦（hyperbolic sine）
        Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）
        Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）
        Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）
        Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）
        Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）
    
        19.指数运算符
            ES2016 新增了一个指数运算符（**）。
            这个运算符的一个特点是右结合，而不是常见的左结合。多个指数运算符连用时，是从最右边开始计算的。
            // 相当于 2 ** (3 ** 2)
            2 ** 3 ** 2
            let a = 1.5;
            a **= 2;
            // 等同于 a = a * a;
*/