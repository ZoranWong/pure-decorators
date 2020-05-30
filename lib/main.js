"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.string = string;
exports.number = number;
exports.unsigned = unsigned;
exports["int"] = _int;
exports.array = array;
exports.fun = fun;
exports.ArrowFunction = ArrowFunction;
exports.Constructor = Constructor;
exports["float"] = _float;
exports["boolean"] = _boolean;
exports.Enum = Enum;
exports.readonly = readonly;
exports.any = any;
exports.CheckType = CheckType;
exports.method = method;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _newArrowCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/newArrowCheck"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var BaseType = [Number, String, Boolean, Array, BigInt, Symbol, Function];

function isBaseType(val) {
  for (var i in BaseType) {
    if (BaseType[i].name.toLowerCase() === (0, _typeof2["default"])(val)) return true;
  }

  return false;
}

function isFunction(cxs) {
  if (typeof cxs != "function") return false;
  if (cxs.prototype === undefined) return true;
  var str = String(cxs); // has own prototype properties

  if (Object.getOwnPropertyNames(cxs.prototype).length >= 2) return false;
  if (str.slice(0, 5) === "class") return false;
  return true;
}

function isClass(obj) {
  if (typeof obj != "function") {
    return false;
  } // async function or arrow function


  if (typeof obj.prototype === 'undefined') {
    return false;
  } // generator function and malformed inheritance


  if (obj.prototype.constructor !== obj) {
    return false;
  } // has own prototype properties


  if (Object.getOwnPropertyNames(obj.prototype).length >= 2) return true;
  var str = String(obj); // ES6 class

  if (str.slice(0, 5) == "class") return true; // anonymous function

  if (/^function\s*\(|^function anonymous\(/.test(str)) return false;

  if (/this/.test(str)) {
    var hasThis = /(classCallCheck)/.test(str); // Upper-cased first char of the name and has `this` in the body, or it's
    // a native class in ES5 style.

    if (hasThis || /\[native code\]/.test(str) && obj.name !== "BigInt" && // ES6 BigInt and Symbol is not class
    obj.name !== "Symbol") {
      return true;
    } // TypeScript anonymous class to ES5 with default export


    return /^function\sdefault_\d+\s*\(/.test(str);
  }

  return false;
}

function isArrowFun(cxs) {
  if (!isFunction(cxs)) return false;
  var str = String(cxs);
  if (/^\([\w\s\,]*\)\s* \=>\s*\{[\s\S]*\}$/.test(str)) return true;

  if (/^function[\s]*\([\w\s\,]*\)\s*\{\s*\[native code\]\s*\}/.test(str)) {
    return true;
  }

  return false;
}

function paramTypeCheck(value, index, type, ext) {
  var cType = typeOf(value);

  if (typeOf(type) === 'string') {
    switch (type) {
      case 'Enum':
        if (ext.indexOf(value) > -1) {
          return true;
        } else {
          throw new TypeError("the parameters[".concat(index, "] ").concat(name, " is a enum type  value, can't set a value not in the enum set"));
        }

        break;

      case 'function':
        if (isFunction(value)) {
          return true;
        } else {
          throw new TypeError("the parameters[".concat(index, "] ").concat(name, " is a function"));
        }

        break;

      case 'ArrowFunction':
        if (isArrowFun(value)) {
          return true;
        } else {
          throw new TypeError("the parameters[".concat(index, "] ").concat(name, " is a arrow function"));
        }

        break;

      case 'Constructor':
        if (isClass(value) && (!ext || value === ext)) {
          return true;
        } else {
          throw new TypeError("the parameters[".concat(index, "] ").concat(name, " is a class"));
        }

        break;
    }

    if (check(cType, type)) {
      return true;
    } else {
      throw new TypeError("the parameters[".concat(index, "] is a ").concat(type, " value, not a ").concat(cType, " value"));
    }
  } else if (cType === 'object') {
    if (value instanceof type) {
      return true;
    } else {
      throw new TypeError("the parameters[".concat(index, "] is a class ").concat(type.name, " instance, not a class ").concat(value.constructor.name, " instance"));
    }
  } else {
    if (isBaseType(value)) {
      return true;
    }

    throw new TypeError("the parameters[".concat(index, "] is a ").concat(cType, " instance, not a class ").concat(value.constructor.name, " instance"));
  }
}

function returnTypeCheck(value, type, ext) {
  var cType = typeOf(value);

  if (typeOf(type) === 'string') {
    switch (type) {
      case 'Enum':
        if (ext.indexOf(value) > -1) {
          return true;
        } else {
          throw new TypeError("the return value  ".concat(name, " is a enum type  value, can't set a value not in the enum set"));
        }

        break;

      case 'function':
        if (isFunction(value)) {
          return true;
        } else {
          throw new TypeError("the return value ".concat(name, " is a function"));
        }

        break;

      case 'ArrowFunction':
        if (isArrowFun(value)) {
          return true;
        } else {
          throw new TypeError("the return value ".concat(name, " is a arrow function"));
        }

        break;

      case 'Constructor':
        if (isClass(value) && (!ext || value === ext)) {
          return true;
        } else {
          throw new TypeError("the return value ".concat(name, " is a class"));
        }

        break;
    }

    if (check(cType, type)) {
      return true;
    } else {
      throw new TypeError("the function return data  is a ".concat(type, " value, not a ").concat(cType, " value"));
    }
  } else if (cType === 'object') {
    if (value instanceof type) {
      return true;
    } else {
      throw new TypeError("the function return data is a class ".concat(type.name, " instance, not a class ").concat(value.constructor.name, " instance"));
    }
  } else {
    if (isBaseType(value)) {
      return true;
    }

    throw new TypeError("the function return data is a ".concat(cType, " instance, not a class ").concat(value.constructor.name, " instance"));
  }
}

function setPropertyTypeCheck(target, name, type, ext) {
  var cType = typeOf(target);

  if (typeOf(type) === 'string') {
    switch (type) {
      case 'Enum':
        if (ext.indexOf(target) > -1) {
          return true;
        } else {
          throw new TypeError("the property ".concat(name, " is a enum type  value, can't set a value not in the enum set"));
        }

        break;

      case 'function':
        if (isFunction(target)) {
          return true;
        } else {
          throw new TypeError("the property ".concat(name, " is a function"));
        }

        break;

      case 'ArrowFunction':
        if (isArrowFun(target)) {
          return true;
        } else {
          throw new TypeError("the property ".concat(name, " is a arrow function"));
        }

        break;

      case 'Constructor':
        if (isClass(target) && (!ext || target === ext)) {
          return true;
        } else {
          throw new TypeError("the property ".concat(name, " is a class"));
        }

        break;
    }

    if (check(cType, type)) {
      return true;
    } else {
      throw new TypeError("the property ".concat(name, " is a ").concat(type, " value, not a ").concat(cType, " value"));
    }
  } else if (cType === 'object') {
    if (target instanceof type) {
      return true;
    } else {
      throw new TypeError("the property ".concat(name, " is a class ").concat(type.name, " instance, not a class ").concat(target.constructor.name, " instance"));
    }
  } else {
    if (isBaseType(target)) {
      return true;
    }

    throw new TypeError("the property ".concat(name, " is a ").concat(cType, " instance, not a class ").concat(target.constructor.name, " instance"));
  }
}
/**
 * @param {string} type
 * @param {string} name
 * @param {Descriptor} descriptor
 * @param {any} ext
 * @return {any}
 * */


function propertyTypeCheck(type, name, descriptor, ext) {
  var v = descriptor.initializer && descriptor.initializer.call(this);
  return {
    enumerable: true,
    configurable: true,
    get: function get() {
      return v;
    },
    set: function set(c) {
      if (setPropertyTypeCheck(c, name, type, ext)) {
        v = c;
      }
    }
  };
}

var Descriptor = /*#__PURE__*/function () {
  function Descriptor() {
    (0, _classCallCheck2["default"])(this, Descriptor);
  }

  (0, _createClass2["default"])(Descriptor, [{
    key: "initializer",
    value: function initializer() {}
  }]);
  return Descriptor;
}();
/**
 * @param {string} type
 * @param {any} target
 * @param {string|int|null} name
 * @param {Descriptor|null} descriptor
 * @return {any}
 * */


function typeCheck(type, target, name) {
  var descriptor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var ext = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

  if (descriptor) {
    return propertyTypeCheck(type, name, descriptor, ext);
  } else if (name) {
    return paramTypeCheck(target, name, type, ext);
  } else {
    return returnTypeCheck(target, type, ext);
  }
}

function typeOf(value) {
  var type = (0, _typeof2["default"])(value);

  if (type === 'number') {
    var v = value + '';
    type = v.indexOf('.') > -1 ? 'float' : 'int';

    if (type === 'int') {
      type = v.charAt(0) === '-' ? 'int' : 'unsigned';
    }
  }

  return type;
}

function check(cType, type) {
  var compatibleNumberToFloat = (cType === 'int' || cType === 'unsigned') && type === 'float';
  var compatibleUnsignedToInt = cType === 'unsigned' && type === 'int';
  var compatibleNumber = ['int', 'unsigned', 'float'].indexOf(cType) > -1 && type === 'number';

  if (!(cType === type || compatibleNumberToFloat || compatibleUnsignedToInt || compatibleNumber)) {
    return false;
  }

  return true;
}

function string(target) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var descriptor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return typeCheck('string', target, name, descriptor);
}

function number(target, name) {
  var descriptor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return typeCheck('number', target, name, descriptor);
}

function unsigned(target, name, descriptor) {
  return typeCheck('unsigned', target, name, descriptor);
}

function _int(target, name, descriptor) {
  return typeCheck('int', target, name, descriptor);
}

function array(target, name, descriptor) {
  return typeCheck('array', target, name, descriptor);
}

function fun(target, name, descriptor) {
  return typeCheck('function', target, name, descriptor);
}

function ArrowFunction(target, name, descriptor) {
  return typeCheck('ArrowFunction', target, name, descriptor);
}

function Constructor() {
  var _this = this;

  var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var des = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (!key) {
    return function (target, name, descriptor) {
      (0, _newArrowCheck2["default"])(this, _this);
      return typeCheck('Constructor', target, name, descriptor, val);
    }.bind(this);
  } else {
    return typeCheck('Constructor', val, key, des);
  }
}

function _float(target, name, descriptor) {
  return typeCheck('float', target, name, descriptor);
}

function _boolean(target, name, descriptor) {
  return typeCheck('boolean', target, name, descriptor);
}
/**
 * @param {Array} data
 * @return {function(*, *, *)}
 * */


function Enum(data) {
  return function (target, name, descriptor) {
    return typeCheck('Enum', target, name, descriptor, data);
  };
}

function readonly(target, name, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

function any(target, name, descriptor) {
  return true;
}

function CheckType(type) {
  var _this2 = this;

  return function (target, name, descriptor) {
    (0, _newArrowCheck2["default"])(this, _this2);
    return typeCheck(type, target, name, descriptor);
  }.bind(this);
}
/**
 * @param {Array} params
 * @param {any} returnType
 * @param {function}
 * */


function method(params, returnType) {
  var _this3 = this;

  return function (target, name, descriptor) {
    (0, _newArrowCheck2["default"])(this, _this3);
    return _objectSpread(_objectSpread({}, descriptor), {}, {
      value: function value() {
        for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
          arg[_key] = arguments[_key];
        }

        for (var index in params) {
          var type = params[index];
          if (typeOf(type) !== 'string') type(arg[index], index);else paramTypeCheck(arg[index], index, type);
        }

        var result = descriptor.value.apply(this, arg);

        if (returnType) {
          if (typeOf(returnType) === 'string') returnTypeCheck(result, returnType);else returnType(result);
        }

        return result;
      }
    });
  }.bind(this);
}
