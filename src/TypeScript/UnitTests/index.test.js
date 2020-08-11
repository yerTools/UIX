/**
 * @jest-environment jsdom
 */
/// <reference path="../UIX/UIX.ts" />

const fileSystem = require("fs");
const currentPath = __dirname + "/";

const tests = [
    "index"
];

let script = fileSystem.readFileSync(currentPath + "../../../build/js/UIX.js").toString();

for(let i = 0; i < tests.length; i++){
    script += "\n" + fileSystem.readFileSync(currentPath + tests[i] + ".js").toString();
}

eval(script);