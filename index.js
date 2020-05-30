const BaseType = [Number, String, Boolean, Array, BigInt, Symbol, Function];

function isBaseType(val) {
    for (let i in BaseType) {
        if (BaseType[i].name.toLowerCase() === typeof val)
            return true;
    }
    return false;
}

function isFunction(cxs) {
    if (typeof cxs != "function")
        return false;
    if (cxs.prototype === undefined)
        return true;
    let str = String(cxs);

    // has own prototype properties
    if (Object.getOwnPropertyNames(cxs.prototype).length >= 2)
        return false;

    if (str.slice(0, 5) === "class")
        return false;
    return true;
}

function isClass(obj) {
    if (typeof obj != "function") {
        return false;
    }

    // async function or arrow function
    if (typeof obj.prototype === 'undefined') {
        return false;
    }


    // generator function and malformed inheritance
    if (obj.prototype.constructor !== obj) {
        return false;
    }

    // has own prototype properties
    if (Object.getOwnPropertyNames(obj.prototype).length >= 2)
        return true;

    let str = String(obj);

    // ES6 class
    if (str.slice(0, 5) == "class")
        return true;

    // anonymous function
    if (/^function\s*\(|^function anonymous\(/.test(str))
        return false;
    if (/this/.test(str)) {
        let hasThis = /(classCallCheck)/.test(str);
        // Upper-cased first char of the name and has `this` in the body, or it's
        // a native class in ES5 style.
        if ((hasThis ||
            (/\[native code\]/.test(str) &&
                obj.name !== "BigInt" && // ES6 BigInt and Symbol is not class
                obj.name !== "Symbol"
            )
        )) {
            return true;
        }

        // TypeScript anonymous class to ES5 with default export
        return /^function\sdefault_\d+\s*\(/.test(str);
    }
    return false;
}

function isArrowFun(cxs) {
    if (!isFunction(cxs)) return false;
    let str = String(cxs);
    if (/^\([\w\s\,]*\)\s* \=>\s*\{[\s\S]*\}$/.test(str))
        return true;
    if (/^function[\s]*\([\w\s\,]*\)\s*\{\s*\[native code\]\s*\}/.test(str)) {
        return true;
    }
    return false;
}

function paramTypeCheck(value, index, type, ext) {
    let cType = typeOf(value);
    if (typeOf(type) === 'string') {
        switch (type) {
            case 'Enum':
                if (ext.indexOf(value) > -1) {
                    return true;
                } else {
                    throw new TypeError(`the parameters[${index}] ${name} is a enum type  value, can't set a value not in the enum set`);
                }
                break;
            case 'function':
                if (isFunction(value)) {
                    return true;
                } else {
                    throw new TypeError(`the parameters[${index}] ${name} is a function`);
                }
                break;
            case 'ArrowFunction':
                if (isArrowFun(value)) {
                    return true;
                } else {
                    throw new TypeError(`the parameters[${index}] ${name} is a arrow function`);
                }
                break;
            case 'Constructor':
                if (isClass(value) && (!ext || value === ext)) {
                    return true;
                } else {
                    throw new TypeError(`the parameters[${index}] ${name} is a class`);
                }
                break;
        }
        if (check(cType, type)) {
            return true;
        } else {
            throw new TypeError(`the parameters[${index}] is a ${type} value, not a ${cType} value`);
        }
    } else if (cType === 'object') {
        if (value instanceof type) {
            return true;
        } else {
            throw new TypeError(`the parameters[${index}] is a class ${type.name} instance, not a class ${value.constructor.name} instance`);
        }
    } else {
        if (isBaseType(value)) {
            return true;
        }
        throw new TypeError(`the parameters[${index}] is a ${cType} instance, not a class ${value.constructor.name} instance`);
    }
}

function returnTypeCheck(value, type, ext) {
    let cType = typeOf(value);
    if (typeOf(type) === 'string') {
        switch (type) {
            case 'Enum':
                if (ext.indexOf(value) > -1) {
                    return true;
                } else {
                    throw new TypeError(`the return value  ${name} is a enum type  value, can't set a value not in the enum set`);
                }
                break;
            case 'function':
                if (isFunction(value)) {
                    return true;
                } else {
                    throw new TypeError(`the return value ${name} is a function`);
                }
                break;
            case 'ArrowFunction':
                if (isArrowFun(value)) {
                    return true;
                } else {
                    throw new TypeError(`the return value ${name} is a arrow function`);
                }
                break;
            case 'Constructor':
                if (isClass(value) && (!ext || value === ext)) {
                    return true;
                } else {
                    throw new TypeError(`the return value ${name} is a class`);
                }
                break;
        }
        if (check(cType, type)) {
            return true;
        } else {
            throw new TypeError(`the function return data  is a ${type} value, not a ${cType} value`);
        }
    } else if (cType === 'object') {
        if (value instanceof type) {
            return true;
        } else {
            throw new TypeError(`the function return data is a class ${type.name} instance, not a class ${value.constructor.name} instance`);
        }
    } else {
        if (isBaseType(value)) {
            return true;
        }
        throw new TypeError(`the function return data is a ${cType} instance, not a class ${value.constructor.name} instance`);
    }
}

function setPropertyTypeCheck(target, name, type, ext) {
    let cType = typeOf(target);
    if (typeOf(type) === 'string') {
        switch (type) {
            case 'Enum':
                if (ext.indexOf(target) > -1) {
                    return true;
                } else {
                    throw new TypeError(`the property ${name} is a enum type  value, can't set a value not in the enum set`);
                }
                break;
            case 'function':
                if (isFunction(target)) {
                    return true;
                } else {
                    throw new TypeError(`the property ${name} is a function`);
                }
                break;
            case 'ArrowFunction':
                if (isArrowFun(target)) {
                    return true;
                } else {
                    throw new TypeError(`the property ${name} is a arrow function`);
                }
                break;
            case 'Constructor':
                if (isClass(target) && (!ext || target === ext)) {
                    return true;
                } else {
                    throw new TypeError(`the property ${name} is a class`);
                }
                break;
        }
        if (check(cType, type)) {
            return true;
        } else {
            throw new TypeError(`the property ${name} is a ${type} value, not a ${cType} value`);
        }
    } else if (cType === 'object') {
        if (target instanceof type) {
            return true;
        } else {
            throw new TypeError(`the property ${name} is a class ${type.name} instance, not a class ${target.constructor.name} instance`);
        }
    } else {
        if (isBaseType(target)) {
            return true;
        }
        throw new TypeError(`the property ${name} is a ${cType} instance, not a class ${target.constructor.name} instance`);
    }
}

/**
 * @param {null} type
 * @param {string} name
 * @param {PropertyDescriptor|Descriptor} descriptor
 * @param {any} ext
 * @return {any}
 * */
function propertyTypeCheck(type, name, descriptor, ext) {
    let v = descriptor.initializer && descriptor.initializer.call(this);
    return {
        enumerable: true,
        configurable: true,
        get: function () {
            return v;
        },
        set: function (c) {
            if (setPropertyTypeCheck(c, name, type, ext)) {
                v = c;
            }
        }
    };
}

class Descriptor {
    initializer() {
    }
}

/**
 * @param {string} type
 * @param {any} target
 * @param {string|int|null} name
 * @param {Descriptor|null} descriptor
 * @return {any}
 * */
function typeCheck(type, target, name, descriptor = null, ext = null) {
    if (descriptor) {
        return propertyTypeCheck(type, name, descriptor, ext);
    } else if (name) {
        return paramTypeCheck(target, name, type, ext);
    } else {
        return returnTypeCheck(target, type, ext);
    }
}

function typeOf(value) {
    let type = typeof value;
    if (type === 'number') {
        let v = value + '';
        type = v.indexOf('.') > -1 ? 'float' : 'int';
        if (type === 'int') {
            type = v.charAt(0) === '-' ? 'int' : 'unsigned';
        }
    }
    return type;
}

function check(cType, type) {
    let compatibleNumberToFloat = ((cType === 'int' || cType === 'unsigned') && type === 'float');
    let compatibleUnsignedToInt = (cType === 'unsigned' && type === 'int');
    let compatibleNumber = (['int', 'unsigned', 'float'].indexOf(cType) > -1) && type === 'number';
    if (!(cType === type || compatibleNumberToFloat || compatibleUnsignedToInt || compatibleNumber)) {
        return false;
    }
    return true;
}

export function string(target, name = null, descriptor = null) {
    return typeCheck('string', target, name, descriptor);
}

export function number(target, name, descriptor = null) {
    return typeCheck('number', target, name, descriptor);
}

export function unsigned(target, name, descriptor) {
    return typeCheck('unsigned', target, name, descriptor);
}

export function int(target, name, descriptor) {
    return typeCheck('int', target, name, descriptor);
}

export function array(target, name, descriptor) {
    return typeCheck('array', target, name, descriptor);
}

export function fun(target, name, descriptor) {
    return typeCheck('function', target, name, descriptor);
}

export function ArrowFunction(target, name, descriptor) {
    return typeCheck('ArrowFunction', target, name, descriptor);
}

export function Constructor(val = null, key = null, des = null) {
    if(!key){
        return (target, name, descriptor) => {
            return typeCheck('Constructor', target, name, descriptor, val);
        };
    }else{
        return  typeCheck('Constructor', val, key, des);
    }
}

export function float(target, name, descriptor) {
    return typeCheck('float', target, name, descriptor);
}

export function boolean(target, name, descriptor) {
    return typeCheck('boolean', target, name, descriptor);
}

/**
 * @param {Array} data
 * @return {function(*, *, *)}
 * */
export function Enum(data) {
    return function (target, name, descriptor) {
        return typeCheck('Enum', target, name, descriptor, data);
    };
}

export function readonly(target, name, descriptor) {
    descriptor.writable = false;
    return descriptor;
}

export function any(target, name, descriptor) {
    return true;
}

export function CheckType(type) {
    return (target, name, descriptor) => {
        return typeCheck(type, target, name, descriptor);
    };
}

/**
 * @param {Array} params
 * @param {any} returnType
 * @param {function}
 * */
export function method(params, returnType) {
    return (target, name, descriptor) => {
        return {
            ...descriptor,
            value(...arg) {
                for (let index in params) {
                    let type = params[index];
                    if (typeOf(type) !== 'string')
                        type(arg[index], index);
                    else
                        paramTypeCheck(arg[index], index, type);
                }
                let result = descriptor.value.call(this, ...arg);
                if (returnType) {
                    if (typeOf(returnType) === 'string')
                        returnTypeCheck(result, returnType);
                    else
                        returnType(result);
                }
                return result;
            }
        };
    };
}

export function property(key, defaultVal = null, type = null) {
    return function (target) {
        let value = defaultVal;
        Object.defineProperty(target.prototype, key, {
            set(v) {
                value = v;
            },
            get() {
                return value;
            }
        })
    }
}