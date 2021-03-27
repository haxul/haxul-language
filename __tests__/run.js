
const tests = [
    require("./eval-test")
    ]

const Haxul = require("../haxul")

const haxul = new Haxul()


tests.forEach( test => test(haxul))