import {Enum} from "../index";
const HUAWEI = 1;
const XIAOMI = 2;
const VIVO =3;
class Test {
    @Enum([HUAWEI, XIAOMI, VIVO])
    mobile  = null;
}



function setEnum(x) {
    try {
        let test = new Test();
        test.mobile = x;
        return true;
    }catch (e) {
        return  false;
    }
}

test('test enum a value in enum type!!', function () {
    expect(setEnum(HUAWEI)).toEqual(true);
});

test('test enum a false value!!', function () {
    expect(setEnum(true)).toEqual(false);
});