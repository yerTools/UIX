/**
 * @jest-environment jsdom
 */
/// <reference path="../UIX/UIX.ts" />

const fileSystem = require("fs");
const currentPath = __dirname + "/";

const tests = [
    "index.js",

    "Libraries/Random/NumberGenerator.js",
    "Libraries/Random/StringGenerator.js",

    "Libraries/TextExpression/Text/TextSpan.js"
];

//Extreme ugly but it works for now... :)
let script = fileSystem.readFileSync(currentPath + "../../../build/js/UIX.js").toString();

for(let i = 0; i < tests.length; i++){
    script += "\n" + fileSystem.readFileSync(currentPath + tests[i]).toString();
}

eval(script);