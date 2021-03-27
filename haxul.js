const assert = require("assert")
const Environment = require("./environment")

class Haxul {

    globalEnv

    constructor(global = new Environment({
        true: true,
        false: false,
        null: null
    })) {
        this.globalEnv = global
    }

    eval(exp ,env = this.globalEnv) {
        if (isNumber(exp)) return exp;
        if (isString(exp)) return exp.slice(1, -1)
        if (exp[0] === "+") return this.eval(exp[1]) + this.eval(exp[2])
        if (exp[0] === "*") return this.eval(exp[1]) * this.eval(exp[2])

        if (exp[0] === "var") {
            const [_, name, value] = exp
            return env.define(name, this.eval(value))
        }

        if (isVariableName(exp)) {
            return env.lookup(exp)
        }

        if (exp[0] === "begin") {
            return this._evalBlock(exp, env)
        }

        throw "Unimplemented";
    }

    _evalBlock(block, env) {
        let result
        const [_tag, ...expressions] = block
        expressions.forEach( exp => {
            result = this.eval(exp, env)
        })
        return result
    }
}


const isNumber = ele => typeof ele === "number"
const isString = ele => typeof ele === "string" && ele[0] === '"' && ele.slice(-1) === '"'
const isVariableName = ele => typeof ele === "string" && /^[a-zA-Z][a-zA-Z0-9_]*$/.test(ele)

const haxul = new Haxul();


assert.strictEqual(haxul.eval(1), 1)
assert.strictEqual(haxul.eval('"haxul"'), "haxul")

// math
assert.strictEqual(haxul.eval(["+", 1, 2]), 3)
assert.strictEqual(haxul.eval(["+", ["+", 1, 2], 7]), 10)
assert.strictEqual(haxul.eval(["*", ["*", 1, 2], 7]), 14)

// variables
assert.strictEqual(haxul.eval(["var", "x", 10]), 10)
assert.strictEqual(haxul.eval("x"), 10)
assert.strictEqual(haxul.eval("null"), null)
assert.strictEqual(haxul.eval(["var", "isUser", "true"]), true)
assert.strictEqual(haxul.eval(["var", "z", ["*", 2, 2]]), 4)

// blocks

assert.strictEqual(haxul.eval(
    ["begin",
        ["var", "x", 10],
        ["var", "y", 20],
        ["+", ["*", "x", "y"], 30],
    ]), 230)


console.log("tests passed")
