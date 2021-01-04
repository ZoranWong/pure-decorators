import {array, property, unsigned} from "../index";
@property('unit', 0, unsigned)
class ArrayTest {
    @array arr = null;
    @unsigned n = 1;
}

ArrayTest.prototype.p0 = 1;

let t1 = new ArrayTest();
let t2 = new ArrayTest();
t1.p0 = 10;
t1.n = 100;
console.log(t1.n, t2.n, t1);

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