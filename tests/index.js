// const obj =require('../lib/main');

function test(){}

class Test {
    constructor() {
        this.x = 1;
    }
}
try {
    class a{};
}catch (e) {
    console.log(e);
}
let isClass = function (target) {
    console.log();
    if (typeof target === 'function') {
        const keys = Reflect.ownKeys(target)
        // class or arrow function
        if (!keys.includes('arguments') && !keys.includes('caller')) {
            // class
            if (keys.includes('prototype')) {
                return true
            }
        }
    }
    return false
}

/**
 * Checks if an object could be an instantiable class.
 * @param {any} obj
 * @returns {obj is new (...args: any[]) => any}
 */
function couldBeClass(obj) {
    if (typeof obj != "function") return false;

    // async function or arrow function
    if (obj.prototype === undefined)
        return false;

    // generator function and malformed inheritance
    if (obj.prototype.constructor !== obj)
        return false;

    // has own prototype properties
    if (Object.getOwnPropertyNames(obj.prototype).length >= 2)
        return true;

    var str = String(obj);

    // ES6 class
    if (str.slice(0, 5) == "class")
        return true;

    // anonymous function
    if (/^function\s*\(|^function anonymous\(/.test(str))
        return false;

    var hasThis = /(call|apply|_classCallCheck)\(this(, arguments)?\)|\bthis(.\S+|\[.+?\])\s*(=|\()|=\s*this[,;]/.test(str);

    // Upper-cased first char of the name and has `this` in the body, or it's
    // a native class in ES5 style.
    if (/^function\s+[A-Z]/.test(str) && (hasThis ||
        (/\[native code\]/.test(str) &&
            obj.name !== "BigInt" && // ES6 BigInt and Symbol is not class
            obj.name !== "Symbol"
        )
    )) {
        return true;
    }

    // TypeScript anonymous class to ES5 with default export
    if (hasThis && obj.name === "default_1")
        return true;

    return false;
}

console.log(test.prototype.constructor, Test.prototype);
console.log(isClass(test), isClass(Test), couldBeClass(test), couldBeClass(Test));

let arrow = (d, a) => {
    let x = d;
    let p = a;
}
let f =  () => {
    return () => {}
}

class cs {

}
console.log(/^\([\w\s\,]*\)\s* \=>\s*\{[\s\S]*\}$/.test(arrow.toLocaleString()), String(Function), String(Int8Array), arrow, arrow.$2, f.name);
// console.log(arrow.toLocaleString(), f.toLocaleString(),cs.toLocaleString())