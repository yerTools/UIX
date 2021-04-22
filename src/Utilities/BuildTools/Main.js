const { exec } = require("child_process");

const args = process.argv;
args.splice(0, 2);

console.log("Compiling BuildTools . . .");

const buildToolsCompilation = exec("tsc", {
    cwd: "Utilities/BuildTools"
}, (error, stdout, stderr) => {

    console.log()
    console.log("BuildTools compilation finished.");
    console.log();
    
    if(error !== null){
        console.log("Error during BuildTools compilation!");
        console.error(error);
        if(stdout){
            console.warn("Stdout:");
            console.error(stdout);
        }
        if(stderr){
            console.warn("Stderr:");
            console.error(stderr);
        }
        throw error;
    }

    console.log("Running BuildTools . . .");

    const buildTools = exec("node BuildTools.js" + (args.length ? " " + args.join(" ") : ""), {
        cwd: "Utilities/BuildTools"
    }, (error, stdout, stderr) => {

        console.log()
        console.log("BuildTools finished.");
        console.log();

        if(error !== null){
            console.log("Error running BuildTools!");
            console.error(error);
            if(stdout){
                console.warn("Stdout:");
                console.error(stdout);
            }
            if(stderr){
                console.warn("Stderr:");
                console.error(stderr);
            }
            throw error;
        }
    });

    buildTools.stdout.setEncoding("utf8");
    buildTools.stdout.on("data", function(data) {
        process.stdout.write(data);
    });

    buildTools.stderr.setEncoding("utf8");
    buildTools.stderr.on("data", function(data) {
        process.stdout.write(data);
    });
});

buildToolsCompilation.stdout.setEncoding("utf8");
buildToolsCompilation.stdout.on("data", function(data) {
    process.stdout.write(data);
});

buildToolsCompilation.stderr.setEncoding("utf8");
buildToolsCompilation.stderr.on("data", function(data) {
    process.stdout.write(data);
});