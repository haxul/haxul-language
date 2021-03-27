
const assert = require("assert")

module.exports = haxul => {
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

    assert.strictEqual(haxul.eval(
        ["begin",
            ["var", "x", 10],
            ["begin",
                ["var", "x", 20],
                "x"
            ],
            "x"
        ]
    ), 10)

    assert.strictEqual(haxul.eval(
        ["begin",
            ["var", "value", 10],
            ["var", "result", [ "begin",
                ["var", "x", ["+", "value", 10]],
                "x"
            ]],
            "result"
        ]), 20)


    assert.strictEqual(haxul.eval(
        ["begin",
            ["var", "data", 10],
            ["begin",
                ["set", "data", 100],
            ],
            "data"
        ]), 100)

    console.log("eval tests passed")
}
