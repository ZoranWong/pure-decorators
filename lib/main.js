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
exports.Closure = Closure;
exports.ArrowFunction = ArrowFunction;
exports.Constructor = Constructor;
exports.Factory = Factory;
exports["float"] = _float;
exports["boolean"] = _boolean;
exports.Enum = Enum;
exports.readonly = readonly;
exports.CheckType = CheckType;
exports.method = method;
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _newArrowCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/newArrowCheck"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var BaseType = [Number, String, Boolean];

function isBaseType(val) {
  for (var i in BaseType) {
    if (BaseType[i].name.toLowerCase() === (0, _typeof2["default"])(val)) return true;
  }

  return false;
}

function paramTypeCheck(value, index, type) {
  var cType = typeOf(value);

  if (typeOf(type) === 'string') {
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

function returnTypeCheck(value, type) {
  var cType = typeOf(value);

  if (typeOf(type) === 'string') {
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

function setPropertyTypeCheck(target, name, type) {
  var cType = typeOf(target);

  if (typeOf(type) === 'string') {
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
 * @return {any}
 * */


function propertyTypeCheck(type, name, descriptor) {
  var v = descriptor.initializer && descriptor.initializer.call(this);
  return {
    enumerable: true,
    configurable: true,
    get: function get() {
      return v;
    },
    set: function set(c) {
      if (setPropertyTypeCheck(c, name, type)) {
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

  if (descriptor) {
    return propertyTypeCheck(type, name, descriptor);
  } else if (name) {
    return paramTypeCheck(target, name, type);
  } else {
    return returnTypeCheck(target, type);
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

function Closure(target, name, descriptor) {
  return typeCheck('Closure', target, name, descriptor);
}

function ArrowFunction(target, name, descriptor) {
  return typeCheck('ArrowFunction', target, name, descriptor);
}

function Constructor(target, name, descriptor) {
  return typeCheck('Constructor', target, name, descriptor);
}

function Factory(target, name, descriptor) {
  return typeCheck('Factory', target, name, descriptor);
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
    var v = descriptor.initializer && descriptor.initializer.call(this);
    return {
      enumerable: true,
      configurable: true,
      get: function get() {
        return v;
      },
      set: function set(c) {
        if (data.indexOf(c) > -1) {
          v = c;
        } else {}
      }
    };
  };
}

function readonly(target, name, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

function CheckType(type) {
  var _this = this;

  return function (target, name, descriptor) {
    (0, _newArrowCheck2["default"])(this, _this);
    return typeCheck(type, target, name, descriptor);
  }.bind(this);
}
/**
 * @param {Array} params
 * @param {any} returnType
 * @param {function}
 * */


function method(params, returnType) {
  var _this2 = this;

  return function (target, name, descriptor) {
    (0, _newArrowCheck2["default"])(this, _this2);
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

var _default = {
  string: string,
  "int": _int,
  unsigned: unsigned,
  number: number,
  method: method,
  "float": _float,
  "boolean": _boolean,
  array: array,
  readonly: readonly,
  CheckType: CheckType
};
exports["default"] = _default;
