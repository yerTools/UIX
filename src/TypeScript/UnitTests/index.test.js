/**
 * @jest-environment jsdom
 */
/// <reference path="../UIX/UIX.ts" />

const fileSystem = require("fs");
const currentPath = __dirname + "/";

const tests = [
    "index.js",

    "Libraries/Random/XorShift128.js",
    "Libraries/Random/StringGenerator.js",

    "Libraries/TextExpression/Text/TextSpan.js"
];

//Extreme ugly but it works for now... :)
const configuration = eval(fileSystem.readFileSync(currentPath + "Jest.Configuration.js").toString());

let script = "";

for(let i = 0; i < configuration.fileSystem.testFiles.length; i++){
    script += "\n" + fileSystem.readFileSync(configuration.fileSystem.path.jsRootPath + configuration.fileSystem.testFiles[i]).toString();
}

for(let i = 0; i < tests.length; i++){
    script += "\n" + fileSystem.readFileSync(currentPath + tests[i]).toString();
}

eval(script);