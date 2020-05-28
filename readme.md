# pure-decorators
### pure-decorators is a class property decorator, we can use it to declare property type and class member method parameters type.
## Instance
```$xslt
npm install --save @zoranwong/pure-decorators
```

## Example code
````
import {string, int, number, unsigned, float, array, fun, 
ArrowFunction, Constructor, boolean, Enum, readonly, any, CheckType, method} from '@zoranwong/pure-decorators';
class P {}
const IPONE = 1;
const SUMSUNG =2;
const HUAWEI = 3;
const XIAOMI = 4;
class Test {
    @int
    intVar = -1;
    @unsigned
    uintVar = 1;
    @float
    floatVar = 0.01;
    @number
    num = 1;
    @string
    str = 'string';
    @array
    arr = [];
    @fun
    fun = function(){};
    @ArrowFunction
    arrow = () => {}
    @Constructor
    instance = class {};
    @Constructor(P)
    p = P
    @boolean
    isBoolean = false;
    @Enum([IPONE, SUMSUNG, HUAWEI, XIAOMI])
    mobile = IPONE;
    @readonly
    max = 1000;
    @any
    v = 1;
    @CheckType(P)
    p = new P;
    
    @method([string], string)
    log(p) {
        console.log(p);
        return p;
    }
}
````

### Explanation
- @string declare [a string property] 
- @int [declare a int property] 
- @unsigned [declare a unsigned property] 
- @float [declare a float property ]
- @number [declare a number property ]
- @fun [declare a function property ]
- @ArrowFunction [declare an arrow function property] 
- @array [declare an array property ]
- @boolean [declare a boolean property ]
- @Enum([val1, val2, ...]) [declare a enum value property] 
- @Constructor [declare a constructor property] 
- @Constructor(cls) [declare a designated class (cls) constructor property] 
- @readonly [declare a readonly property]
- @any [Unlimited variable property] 
- @CheckType(cls) [declare a designated class (cls) property]
- @method(paramTypes, returnType) [designed method parameters type (paramTypes) and return type (returnType)]
