import {float} from "../index";

class FloatTest {
    @float
    f = 0;
}

function setFloat(x) {
    try {
        let f = new FloatTest();
        f.f = x;
        return true;
    }catch (e) {
        return false;
    }
}

test('test set string property!!', function () {
    expect(setFloat('xxxx')).toEqual(false);
});

test('test set float property!!', function () {
    expect(setFloat(0.01)).toEqual(true);
});