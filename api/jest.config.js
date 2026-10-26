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
    "testPathIgnorePatterns": process.env.CENSUS_DB_HOST
        ? ["/node_modules/"]
        : ["/node_modules/", "census.mysql.spec.ts"],
    // "coverageThreshold": {
    //     "global": {
    //         "lines": 80
    //     }
    // },
};
