import {unsigned} from "../index";

class UnsignedTest {
    @unsigned
    uint = 0;
}

function setUnsigned(x) {
    try {
        let f = new UnsignedTest();
        f.uint = x;
        return true;
    }catch (e) {
        return false;
    }
}

test('test set string property!!', function () {
    expect(setUnsigned('xxxx')).toEqual(false);
});

test('test set float property!!', function () {
    expect(setUnsigned(0.01)).toEqual(false);
});

test('test set int property!!', function () {
    expect(setUnsigned(-1)).toEqual(false);
});

test('test set int property!!', function () {
    expect(setUnsigned(1)).toEqual(true);
});