import {Constructor} from "../index";

class ClassTest {
    @Constructor
    cls = null;
}


function setClass(cls) {
    try {
        let t = new ClassTest();
        t.cls = cls;
        return true;
    }catch (e) {
        // console.log(e)
        return false;
    }
}

test('test set  function property!!', function () {
    expect(setClass(function () {

    })).toEqual(false);
});

test('test set arrow function property!!', function () {
    expect(setClass( ()=> {

    })).toEqual(false);
});


test('test set class property!!', function () {
    expect(setClass( class {

    })).toEqual(true);
});