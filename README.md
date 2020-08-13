# UIX by yerTools (currently in development)

**`At the moment there is little to no documentation for this project because it isn't in Alpha/Beta stage yet.`**

[![Build and test UIX](https://github.com/yerTools/UIX/workflows/Build%20and%20test%20UIX/badge.svg?branch=master)](https://github.com/yerTools/UIX/actions)
[![Last commit](https://img.shields.io/github/last-commit/yerTools/UIX)](https://github.com/yerTools/UIX/branches/all)
[![Issues](https://img.shields.io/github/issues-raw/yerTools/UIX)](https://github.com/yerTools/UIX/issues)
[![Pull requests](https://img.shields.io/github/issues-pr/yerTools/UIX)](https://github.com/yerTools/UIX/pulls)
[![Licence](https://img.shields.io/badge/license-MIT%20with%20Commons%20Clause-blue)](/LICENSE.md)

---

Hello world and welcome to a new project of mine.

I'm developing a **C**ontent-**M**anagement-**S**ystem with the feature, that it should be able to perform `serverless`.
Ok, you still need a server to serve your content but everything user specified is stored in a single json file, so no PHP, ASP.NET, Node.js, etc. is required.  
If you have a backend that can support server-side scripts *(UIX should be able to perform on multiple platforms)*, the server will do the page rendering.
So search engines, web crawler and even noscript users are able to read your page.
But if the client supports javascript, the page rendering is performed on the client side.

`Web Workers` *(if available)* will perform most of the operations, so the main thread should always be responsive.
Because to this multithreading approach, the available resources on the client devices are getting utilized for the best performance.

A `Service Worker` *(if available)* will store the main parts of this system offline, on the client device.
This will result in short to no loading times and site navigation's should happen nearly instantly.

`Web Assembly` *(if available)* will be used to realize the HTML rendering engine. With it, it can leverage the most out of modern browsers and at the same time its code can also run outside the web. For example can the ASP.NET 'version' of this project use the same code for the server-side rendering of HTML.

At the end UIX should be an easy to use CMS with a focus on blazing fast performance. It should be platform independent and run on nearly every end user device.

---

## Early goals:
- [ ] Tools for easy building/compiling of all components
    - [x] Generating different `tsconfig`-files based on a configurable template
    - [x] Compiling multiple versions of multiple TypeScript 'projects'
    - [x] File watcher to move source maps and declarations to different folders
    - [ ] Compiling sass stylesheets with autoprefixer
    - [x] Arguments to control the behavior
- [x] Polyfills for older browsers
    - [x] Promise-API
    - [x] Divers string functions
- [x] Localization system
    - [x] Automatic browser language detection
    - [x] Completely available in english
    - [x] Completely available in german
    - [x] Easily expandable for other languages
- [ ] A basic but solid framework
    - [x] Implementation of an easy to use Web Worker communication with fallbacks
    - [ ] Libraries for basic tasks
        - [x] Promise based ajax interface
        - [x] URI parser
        - [ ] Data serializer
        - [ ] Animations
        - [ ] Data views
        - [ ] Form generation
    - [x] Service Worker
        - [x] Offline capabilities
- [ ] HTML rendering engine
    - [ ] Markdown parser
        - [ ] Features/Possibilities from GitHub
        - [ ] Features/Possibilities from Stack Overflow
        - [ ] Additional styling options for a rich text experience
            - [ ] Colors
            - [ ] Custom inline styles
            - [ ] Embedded content
    - [ ] Widget system
        - [ ] Templates
        - [ ] Styling based on object or page state
        - [ ] Advanced forms
    - [ ] Site templates
- [ ] Simple graphical and asynchron scripting language
- [x] GitHub integration
    - [x] Automated tests on push
    - [x] Automated build on push
    - [x] Making use of the projects page
    - [x] Issue templates
    - [ ] Wiki

## Additional goals:
- [ ] Plugin support
- [ ] Shareable user content
    - [ ] Widgets
    - [ ] Scripts
    - [ ] Templates
    - [ ] Plugins

## GitHub Projects Page
There are many more goals and things to do.
If you want an up to date overview of all the things planned to do/done you can check out the [main projects page](https://github.com/yerTools/UIX/projects/2).

A complete overview of everything related can be found [here](https://github.com/yerTools/UIX/projects).

---

## Any suggestions?

You can write me an E-Mail: [FelixM@yer.tools](mailto:FelixM@yer.tools), get in touch via Twitter: [@yerTools](https://twitter.com/yerTools) or here on [GitHub](https://github.com/yerTools/UIX/issues).

---

## Want to try it?
Just go into the [`src`](/src/) directory, there is another [README](/src/README.md)-file.

---

## License

This project is licensed under the well known MIT-License **but** it makes use of the `Commons Clause`.
This means that you can **not** sell it or sell `a product or service whose value derives, entirely or substantially, from the functionality of the Software.`  
([Please read the license file for detailed information.](/LICENSE.md))

> This leads to the result, that the software is **not** open source even though the full source code is provided.

#### Why did I use this restricted license?
My goal with this project is to start a small business by leveraging my work time and providing a cheap service to other small businesses or startups.

I generally don't mind if non-profit organizations or small social clubs use it for their webpage and probably even provide free of charge support.
But I don't want that any uninvolved third parties sell my work without supporting this project.

If you are unsure, want/need a license or have any other questions, just send me an E-Mail. ([FelixM@yer.tools](mailto:FelixM@yer.tools)) :)

---

##### [Copyright © 2020 Felix Mayer (FelixM@yer.tools), yerTools](/LICENSE.md)