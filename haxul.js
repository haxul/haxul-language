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

    eval(exp, env = this.globalEnv) {
        if (isNumber(exp)) return exp;
        if (isString(exp)) return exp.slice(1, -1)
        if (exp[0] === "+") return this.eval(exp[1], env) + this.eval(exp[2], env)
        if (exp[0] === "*") return this.eval(exp[1], env) * this.eval(exp[2], env)

        if (exp[0] === ">") {
            return this.eval(exp[1], env) > this.eval(exp[2], env)
        }

        if (exp[0] === ">=") {
            return this.eval(exp[1], env) >= this.eval(exp[2], env)
        }

        if (exp[0] === "<") {
            return this.eval(exp[1], env) < this.eval(exp[2], env)
        }

        if (exp[0] === "<=") {
            return this.eval(exp[1], env) <= this.eval(exp[2], env)
        }

        if (exp[0] === "=") {
            return this.eval(exp[1], env) === this.eval(exp[2], env)
        }

        if (exp[0] === "var") {
            const [_, name, value] = exp
            return env.define(name, this.eval(value, env))
        }

        if (isVariableName(exp)) {
            return env.lookup(exp)
        }

        if (exp[0] === "begin") {
            const blockEnv = new Environment({}, env)
            return this._evalBlock(exp, blockEnv)
        }

        if (exp[0] === "set") {
            const [_, name, value] = exp
            return env.assign(name, this.eval(value, env))
        }

        if (exp[0] === "if") {
            const [_tag, condition, consequent, alternate] = exp
            if (this.eval(condition)) return this.eval(consequent, env)
            return this.eval(alternate, env)
        }

        if (exp[0] === "while") {
            const [_tag, condition, body] =  exp
            let result
            while (this.eval(condition, env)) {
                result = this.eval(body, env)
            }
            return result
        }
        throw "Unimplemented";
    }

    _evalBlock(block, env) {
        let result
        const [_tag, ...expressions] = block
        expressions.forEach(exp => {
            result = this.eval(exp, env)
        })
        return result
    }
}


const isNumber = ele => typeof ele === "number"
const isString = ele => typeof ele === "string" && ele[0] === '"' && ele.slice(-1) === '"'
const isVariableName = ele => typeof ele === "string" && /^[a-zA-Z][a-zA-Z0-9_]*$/.test(ele)

module.exports = Haxul