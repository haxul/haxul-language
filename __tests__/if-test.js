const assert = require("assert")


module.exports = haxul => {
    assert.strictEqual(haxul.eval(
        ["begin",
            ["var", "x", 10],
            ["var", "y", 0],
            ["if", [">", "x", 10],
                ["set", "y", 20],
                ["set", "y", 30]
                ],
            "y"
        ]

    ), 30)

    assert.strictEqual(haxul.eval(
        ["begin",
            ["var", "counter", 0],
            ["var", "result", 0],
            ["while", ["<" , "counter", 10],
                ["begin",
                    ["set", "result", ["+", "result", 1]],
                    ["set", "counter", ["+", "counter", 1]]
                ]
            ],
        "result"
        ]), 10)

    console.log("if-tests passed")
}