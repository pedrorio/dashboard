module.exports = {
    "verbose": true,
    "collectCoverage": true,
    "roots": [
        "<rootDir>/src"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
    ],
    // "coverageThreshold": {
    //     "global": {
    //         "lines": 80
    //     }
    // },
};
