import {array} from "../index";

class ArrayTest {
    @array
    arr = null;
}

function setArr(x) {
    try {
        let test = new ArrayTest();
        test.arrow = x
        return true;
    }catch (e) {
        return false;
    }
}

test('test set array property!!', function () {
    expect(setArr([])).toEqual(true);
});

test('test set object property!!', function () {
    expect(setArr({})).toEqual(true);
});