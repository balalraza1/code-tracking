module.exports = {
    module: {
        rules: [
            {
                test: /\.[cm]?js$/,
                parser: {
                    worker: [
                        "*context.audioWorklet.addModule()",
                        "*audioWorklet.addModule()",
                        // *addModule() is not valid syntax
                        "...",
                    ],
                },
            },
        ],
    },
};
