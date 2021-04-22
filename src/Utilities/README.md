# UIX by yerTools (currently in development)

Welcome to the `Utilities` directory!

---

## [BuildTools](src/Utilities/BuildTools/)

This is a simple command line tool for an easy build process, written in [`TypeScript`](https://www.typescriptlang.org/).  
It is designed in a way, that changes to the source code will automatically trigger an incremental recompile. It can also be used to build and publish UIX.

For it to work you need [`Node.js`](https://nodejs.org/). After every commit this tool is compiled and executed both with a dev and release build on both Windows and Ubuntu with the Node.js Versions **12**, **14** and **16**.  
(So it should also run on your System.)  

In order for it to work, the working directory of the application must be inside the [`src`](/src/) directory.  
To run it you must have all required dependencies installed. This can be easily done by running: `npm install` (*remember* that you have the `src` directory as the current working directory)  
After that you can run one of the following commands:
- `npm run develop`: Compiles and runs the build tool in an watching mode. File changes will trigger an incremental recompilation and it will run until closed. This is useful during development.
- `npm run build`: Compiles and runs the build tool once and starts unit tests on the resulting code of UIX.
- `npm run publish`: Compiles and runs the build tool once and starts unit tests on the resulting code of UIX. This is the right choice, if you want to use the result in an production environment.

Currently there is no support for any arguments but it will be added `soon™`.

### BuildTools.config.json

This file contains a basic configuration for the build tools.
It is created if you start the build tools for the first time.  
In it are settings how the generated `.tsconfig`-files should look like.
You can also change the resulting file structure and tweak other settings.

---

##### [Copyright © 2020 Felix Mayer (FelixM@yer.tools), yerTools](/LICENSE.md)