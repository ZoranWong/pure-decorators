import {int} from "../index";

class IntTest {
    @int
    i = 0;
}

function setInt(x) {
    try {
        let f = new IntTest();
        f.i = x;
        return true;
    }catch (e) {
        return false;
    }
}

test('test set string property!!', function () {
    expect(setInt('xxxx')).toEqual(false);
});

test('test set float property!!', function () {
    expect(setInt(0.01)).toEqual(false);
});

test('test set int property!!', function () {
    expect(setInt(1)).toEqual(true);
});