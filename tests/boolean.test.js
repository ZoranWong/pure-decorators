import {boolean, method, any} from "../index";
class Test {
    @method([any], boolean)
    returnBoolean(x) {
        return x;
    }
}

function testBoolean(){
    try{
        let test = new Test()
        test.returnBoolean(true);
        return true;
    }catch (e) {
        return  false;
    }
}
testBoolean();
test('set a int number to var a, success!', function () {
    expect(testBoolean(true)).toEqual(true);
});