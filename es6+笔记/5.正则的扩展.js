// 1.ES6 改变了这种行为。如果RegExp构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符。而且，返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符。

new RegExp(/abc/ig, 'i').flags
// "i"
// 上面代码中，原有正则对象的修饰符是ig，它会被第二个参数i覆盖。

//  2.字符串的正则方法
/*
        字符串对象共有 4 个方法，可以使用正则表达式：match()、replace()、search()和split()。

        ES6 将这 4 个方法，在语言内部全部调用RegExp的实例方法，从而做到所有与正则相关的方法，全都定义在RegExp对象上。

        String.prototype.match 调用 RegExp.prototype[Symbol.match]
        String.prototype.replace 调用 RegExp.prototype[Symbol.replace]
        String.prototype.search 调用 RegExp.prototype[Symbol.search]
        String.prototype.split 调用 RegExp.prototype[Symbol.split]
*/
/*  3.u 修饰符
        ES6 对正则表达式添加了u修饰符，含义为“Unicode 模式”，用来正确处理大于\uFFFF的 Unicode 字符。也就是说，会正确处理四个字节的 UTF-16 编码。

        /^\uD83D/u.test('\uD83D\uDC2A') // false
        /^\uD83D/.test('\uD83D\uDC2A') // true

        （1）点字符
        点（.）字符在正则表达式中，含义是除了换行符以外的任意单个字符。对于码点大于0xFFFF的 Unicode 字符，点字符不能识别，必须加上u修饰符。
        
        2）Unicode 字符表示法
        ES6 新增了使用大括号表示 Unicode 字符，这种表示法在正则表达式中必须加上u修饰符，才能识别当中的大括号，否则会被解读为量词。

        /\u{61}/.test('a') // false
        /\u{61}/u.test('a') // true
        /\u{20BB7}/u.test('𠮷') // true
        上面代码表示，如果不加u修饰符，正则表达式无法识别\u{61}这种表示法，只会认为这匹配 61 个连续的u。

        (3）量词
        使用u修饰符后，所有量词都会正确识别码点大于0xFFFF的 Unicode 字符。

        /a{2}/.test('aa') // true
        /a{2}/u.test('aa') // true
        /𠮷{2}/.test('𠮷𠮷') // false
        /𠮷{2}/u.test('𠮷𠮷') // true
        （4）预定义模式

        u修饰符也影响到预定义模式，能否正确识别码点大于0xFFFF的 Unicode 字符。

        /^\S$/.test('𠮷') // false
        /^\S$/u.test('𠮷') // true
        利用这一点，可以写出一个正确返回字符串长度的函数。
        （5）i 修饰符

        有些 Unicode 字符的编码不同，但是字型很相近，比如，\u004B与\u212A都是大写的K。

        /[a-z]/i.test('\u212A') // false
        /[a-z]/iu.test('\u212A') // true
        上面代码中，不加u修饰符，就无法识别非规范的K字符。
*/
//例如下面 返回正确的字符串长度
function codePointLength(text) {
    var result = text.match(/[\s\S]/gu);
    return result ? result.length : 0;
}

var s = '𠮷𠮷';

s.length // 4
codePointLength(s) // 2
/*
    4.RegExp.prototype.unicode 属性
        正则实例对象新增unicode属性，表示是否设置了u修饰符。

        const r1 = /hello/;
        const r2 = /hello/u;

        r1.unicode // false
        r2.unicode // true
        上面代码中，正则表达式是否设置了u修饰符，可以从unicode属性看出来。

    5.y 修饰符
        除了u修饰符，ES6 还为正则表达式添加了y修饰符，叫做“粘连”（sticky）修饰符。

        y修饰符的作用与g修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。不同之处在于，g修饰符只要剩余位置中存在匹配就可，而y修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义。

        var s = 'aaa_aa_a';
        var r1 = /a+/g;
        var r2 = /a+/y;

        r1.exec(s) // ["aaa"]
        r2.exec(s) // ["aaa"]

        r1.exec(s) // ["aa"]
        r2.exec(s) // null
        上面代码有两个正则表达式，一个使用g修饰符，另一个使用y修饰符。这两个正则表达式各执行了两次，第一次执行的时候，两者行为相同，剩余字符串都是_aa_a。由于g修饰没有位置要求，所以第二次执行会返回结果，而y修饰符要求匹配必须从头部开始，所以返回null。

        y修饰符号隐含了头部匹配的标志^。
    6.RegExp.prototype.sticky 属性
        与y修饰符相匹配，ES6 的正则实例对象多了sticky属性，表示是否设置了y修饰符。
        var r = /hello\d/y;
        r.sticky // true

    7.RegExp.prototype.flags 属性
        ES6 为正则表达式新增了flags属性，会返回正则表达式的修饰符。

        // ES5 的 source 属性
        // 返回正则表达式的正文
        /abc/ig.source
        // "abc"

        // ES6 的 flags 属性
        // 返回正则表达式的修饰符
        /abc/ig.flags
        // 'gi'

    8. s修饰符：dotAll 模式
        因为.不匹配\n
        很多时候我们希望匹配的是任意单个字符，这时有一种变通的写法。
        /foo[^]bar/.test('foo\nbar')// true

        ES2018 引入s修饰符，使得.可以匹配任意单个字符。
        /foo.bar/s.test('foo\nbar') // true
*/
/*  9.后行断言
        “先行断言”指的是，x只有在y前面才匹配，必须写成/x(?=y)/。比如，只匹配百分号之前的数字，要写成/\d+(?=%)/。“先行否定断言”指的是，x只有不在y前面才匹配，必须写成/x(?!y)/。比如，只匹配不在百分号之前的数字，要写成/\d+(?!%)/。

        /\d+(?=%)/.exec('100% of US presidents have been male')  // ["100"]
        /\d+(?!%)/.exec('that’s all 44 of them')                 // ["44"]
        上面两个字符串，如果互换正则表达式，就不会得到相同结果。另外，还可以看到，“先行断言”括号之中的部分（(?=%)），是不计入返回结果的。

        “后行断言”正好与“先行断言”相反，x只有在y后面才匹配，必须写成/(?<=y)x/。比如，只匹配美元符号之后的数字，要写成/(?<=\$)\d+/。“后行否定断言”则与“先行否定断言”相反，x只有不在y后面才匹配，必须写成/(?<!y)x/。比如，只匹配不在美元符号后面的数字，要写成/(?<!\$)\d+/。

        /(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill')  // ["100"]
        /(?<!\$)\d+/.exec('it’s is worth about €90')                // ["90"]
        上面的例子中，“后行断言”的括号之中的部分（(?<=\$)），也是不计入返回结果。

        例子是使用后行断言进行字符串替换。
            const RE_DOLLAR_PREFIX = /(?<=\$)foo/g;
            '$foo %foo foo'.replace(RE_DOLLAR_PREFIX, 'bar');
            // '$bar %foo foo'

        /(?<=(\d+)(\d+))$/.exec('1053') // ["", "1", "053"]
        /^(\d+)(\d+)$/.exec('1053') // ["1053", "105", "3"]
        上面代码中，需要捕捉两个组匹配。没有“后行断言”时，第一个括号是贪婪模式，第二个括号只能捕获一个字符，所以结果是105和3。而“后行断言”时，由于执行顺序是从右到左，第二个括号是贪婪模式，第一个括号只能捕获一个字符，所以结果是1和053。
*/
/*     10.Unicode 属性类
            ES2018 引入了一种新的类的写法\p{...}和\P{...}，允许正则表达式匹配符合 Unicode 某种属性的所有字符。

            // 匹配所有空格
            \p{White_Space}

            // 匹配各种文字的所有字母，等同于 Unicode 版的 \w
            [\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Connector_Punctuation}\p{Join_Control}]

            // 匹配各种文字的所有非字母的字符，等同于 Unicode 版的 \W
            [^\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Connector_Punctuation}\p{Join_Control}]

            // 匹配 Emoji
            /\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu

            // 匹配所有的箭头字符
            const regexArrows = /^\p{Block=Arrows}+$/u;
            regexArrows.test('←↑→↓↔↕↖↗↘↙⇏⇐⇑⇒⇓⇔⇕⇖⇗⇘⇙⇧⇩') // true

    11.具名组匹配
        ES2018 引入了具名组匹配（Named Capture Groups），允许为每一个组匹配指定一个名字，既便于阅读代码，又便于引用。

        const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

        const matchObj = RE_DATE.exec('1999-12-31');
        const year = matchObj.groups.year; // 1999
        const month = matchObj.groups.month; // 12
        const day = matchObj.groups.day; // 31
        具名组没有匹配，那么对应的groups对象属性会是undefined。
        let {groups: {one, two}} = /^(?<one>.*):(?<two>.*)$/u.exec('foo:bar');
        one  // foo
        two  // bar

        replace方法的第二个参数也可以是函数，该函数的参数序列如下。

        '2015-01-02'.replace(re, (
                matched, // 整个匹配结果 2015-01-02
                capture1, // 第一个组匹配 2015
                capture2, // 第二个组匹配 01
                capture3, // 第三个组匹配 02
                position, // 匹配开始的位置 0
                S, // 原字符串 2015-01-02
                groups // 具名组构成的一个对象 {year, month, day}
            ) => {
            let {day, month, year} = groups;
            return `${day}/${month}/${year}`;
        });
*/
// 12.String.prototype.matchAll // matches
var regex = /t(e)(st(\d?))/g;
var string = 'test1test2test3';

var matches = [];
var match;
while (match = regex.exec(string)) {
  matches.push(match);
}

matches
// [
//   ["test1", "e", "st1", "1", index: 0, input: "test1test2test3"],
//   ["test2", "e", "st2", "2", index: 5, input: "test1test2test3"],
//   ["test3", "e", "st3", "3", index: 10, input: "test1test2test3"]
// ]