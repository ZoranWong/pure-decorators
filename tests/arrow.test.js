import {ArrowFunction} from "../index";

class ArrowTest {
    @ArrowFunction
    arrow = null;
}

function arrow(callback) {
    try {
        let test = new ArrowTest();
        test.arrow = callback
        return true;
    }catch (e) {
        return false;
    }
}


test('test set arrow function property!!', function () {
    expect(arrow(function () {

    })).toEqual(false);
});

test('test set arrow function property!!', function () {
    expect(arrow( () => {

    })).toEqual(true);
});