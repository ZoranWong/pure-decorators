import {number} from "../index";

class Test {
    @number
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

test('set a int number to var a, success!', function () {
    expect(testString(1)).toEqual(true);
});

test('set a string to var a, false!', function () {
    expect(testString('111')).toEqual(false);
});