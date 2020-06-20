# UIX by yerTools (currently in development)

Welcome to the `Utilities` directory!

---

## [Buildtools](src/Utilities/Buildtools/)

This is a simple command line tool for an easy build process written in [`.NET Core`](https://dotnet.microsoft.com/).  
It is designed in a way, that changes to the source code will automatically trigger an incremental recompile.

For it to work you need [`Node.js`](https://nodejs.org/) with [`TypeScript`](https://www.npmjs.com/package/typescript) and [`SASS`](https://www.npmjs.com/package/sass).  
The working directory of the application must be inside the [`src`](src) directory (the `src` directory or a child of it).

Currently there is no support for any arguments but it will be added.

### Buildtools.config.json

This file contains a basic configuration for the buildtools.
Is is created if you start the buildtools for the first time.  
In it are settings how the generated `tsconfig` should look like.%

---

##### [Copyright © 2020 Felix Mayer (FelixM@yer.tools), yerTools](LICENSE.md)