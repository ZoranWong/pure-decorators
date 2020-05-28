import {fun} from "../index";

class FunTest {
    @fun
    test = null;
}

function setFun(f) {
    try {
        let t = new FunTest();
        t.test = f;
        return true;
    }catch (e) {
        return false;
    }
}

test('test set  function property!!', function () {
    expect(setFun(function () {

    })).toEqual(true);
});

test('test set arrow function property!!', function () {
    expect(setFun( () => {

    })).toEqual(true);
});

test('test set number property!!', function () {
    expect(setFun(1)).toEqual(false);
});