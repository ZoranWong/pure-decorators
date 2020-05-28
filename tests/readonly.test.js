import {readonly} from "../index";

class ReadonlyTest {
    @readonly
    test = 1;
}

function setValueToReadonly() {
    try{
        let test = new ReadonlyTest();
        test.test = 2;
        return true;
    }catch (e) {
        return false;
    }
}

test('test set readonly property!!', function () {
    expect(setValueToReadonly()).toEqual(false);
});