function paramTypeCheck(value, index, type) {

}

function propertyTypeCheck(target, name, descriptor, type) {

}

function typeCheck(type, target, name, descriptor = null) {
    if(descriptor){
        propertyTypeCheck(target, name, descriptor, type);
    }else{
        paramTypeCheck(target, name, type);
    }
}

function typeOf(value) {
    let type = typeof value;
    if(type === 'number'){
        let v = value + '';
        type = v.indexOf('.') > -1 ? 'float' : 'int';
        if(type === 'int') {
            type = v.charAt(0) === '-' ? 'int' : 'unsigned';
        }
    }
    return type;
}
function check(c, type) {
    let cType = typeOf(c);
    if(!(cType === type || ((cType === 'int' || cType === 'unsigned') && type === 'float'))){
        throw new TypeError(`The type of attribute ${name} is a ${type}, not a ${cType}`);
    }
    return true;
}

export function string(target, name = null, descriptor = null) {
    return typeCheck('string', target, name, descriptor)
}

export function number(target, name, descriptor = null) {
    return typeCheck('number', target, name, descriptor)
}

export function unsigned(target, name, descriptor) {
    return typeCheck('unsigned', target, name, descriptor)
}

export function int(target, name, descriptor) {
    return typeCheck('int', target, name, descriptor)
}

export function array(target, name, descriptor) {
    return typeCheck('array', target, name, descriptor)
}

export function fun(target, name, descriptor) {
    return typeCheck('function', target, name, descriptor)
}

export function Closure(target, name, descriptor) {
    return typeCheck('Closure', target, name, descriptor)
}

export function ArrowFunction(target, name, descriptor) {
    return typeCheck('ArrowFunction', target, name, descriptor)
}

export function Constructor(target, name, descriptor) {
    return typeCheck('Constructor', target, name, descriptor)
}

export function Factory(target, name, descriptor) {
    return typeCheck('Factory', target, name, descriptor)
}

export function CheckCustomerClass() {

}

export function method(returnType) {
    return (...params) => {
        return (target, name, descriptor) => {
            return {
                ...descriptor,
                value (...arg) {
                    for (let index in params) {
                        let type = params[index];
                        type(arg[index], index);
                    }
                    let result = descriptor.value.apply(this, arg);

                    return result;
                }
            };
        }
    }
}