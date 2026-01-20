
export default function(wallaby) {
    return {
        files: [
            'package.json',
            'src/**/*.ts'
        ],
        tests: [
            'test/**/*.spec.ts'
        ],

        testFramework: 'mocha',

        compilers: {
            "**/*.+(t)s?": wallaby.compilers.typeScript()
        },

        env: {
            type: 'node'
        },

        setup: function () {},

        workers: { restart: true },

        maxConsoleMessagesPerTest: 250
    };
};
