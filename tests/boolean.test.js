import {boolean, method, any} from "../index";
class Test {
    @boolean
    isBool = null;
    @method([boolean], boolean)
    returnBoolean(x) {
        return x;
    }
}

function testBoolean(x){
    try{
        let test = new Test();
        test.returnBoolean(x);
        return true;
    }catch (e) {
        console.log(e);
        return  false;
    }
}

test('test return boolean type!!', function () {
    expect(testBoolean(true)).toEqual(true);
});
function testProperty(x){
    try{
        let test = new Test();
        test.isBool = x;
        return true;
    }catch (e) {
        return  false;
    }
}

test('test  boolean type property set number !!', function () {
    expect(testProperty(1)).toEqual(false);
});

test('test  boolean type property set boolean!!', function () {
    expect(testProperty(false)).toEqual(true);
});