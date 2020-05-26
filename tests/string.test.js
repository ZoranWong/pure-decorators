import {string} from "../index";
import * as obj from '../index';
console.log(obj);

class Test {
    @string
    a = '';
}

function testString(b) {
    try {
        let test = new Test();
        test.a = b;
        return true;
    } catch (e) {
        return false;
    }
}

test('set a int number to var a, fail!', function () {
    expect(testString(1)).toEqual(false);
});

test('set a string to var a, success!', function () {
    expect(testString('111')).toEqual(true);
});