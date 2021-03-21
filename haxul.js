const assert = require("assert")

class Haxul {
    eval(exp) {
        if (isNumber(exp)) return exp;
        if (isString(exp)) return exp.slice(1, -1);
        throw "Unimplemented";
    }
}


const isNumber = ele => typeof ele === "number"
const isString = ele => typeof ele === "string" && ele[0] === '"' && ele.slice(-1) === '"'


const haxul = new Haxul();

assert.strictEqual(haxul.eval(1), 1)
assert.strictEqual(haxul.eval('"haxul"'), "haxul")

console.log("tests are passed")
