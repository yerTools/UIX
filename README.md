# UIX by yerTools (currently in development)

**`At the moment there is little to no documentation for this project because it isn't in Alpha/Beta stage yet.`**

Hello world and welcome to a new project of mine.

I'm developing a **C**ontent-**M**anagement-**S**ystem with the feature, that it should be able to perform `serverless`.
Ok, you stil need a server to serve your content but everything user specified is stored in a single json file, so no PHP, ASP.NET, Node.js, etc. is required.  
If you have a backend that can support server-side scripts *(UIX should be able to perform on multiple platforms)*, the server will do the page rendering.
So search engines, web crawler and even noscript users are able to read your page.
But if the client supports javascript, the page rendering is performed on the client side.

`Web Workers` *(if available)* will perform most of the operations, so the main thread should always be responsive.
Because to this multithreading approach, the available resources on the client devices are getting utilized for the best performance.

A `Service Worker` *(if available)* will store the main parts of this sytem offline, on the client device.
This will result in short to no loading times and site navigations should happen nearly instantly.

`Web Assembly` *(if available)* will be used to realize the HTML rendering engine. With it, it can leverage the most out of modern browsers and at the same time its code can also run outside the web. For example can the ASP.NET 'version' of this project use the same code for the server-side rendering of HTML.

At the end UIX should be an easy to use CMS with a focus on blazing fast performance. It should be platform independent and run on nearly every end user device.

---

## Early goals:
- [ ] Tools for easy building/compiling of all components
    - [x] Generating different `tsconfig`-files based on a configurable template
    - [x] Compiling multiple versions of multiple TypeScript 'projects'
    - [x] File watcher to move source maps and declarations to different folders
    - [ ] Compiling sass stylesheets with autoprefixer
    - [ ] Arguments to control the behaviour
- [ ] A basic but solid framework
    - [x] A concept for implementing easy Web Worker communication with fallbacks
    - [ ] Libararies for basic tasks
        - [x] Promise based ajax interface
        - [x] URI parser
        - [ ] Data serializer
    - [ ] Service Worker
        - [ ] Offline capabilities
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
- [ ] GitHub integration
    - [ ] Learning and using GitHub actions
    - [ ] Automated tests on push
    - [ ] Automated build on push
    
## Additional goals:
- [ ] Plugin support
- [ ] Shareable user content
    - [ ] Widgets
    - [ ] Scripts
    - [ ] Templates
    - [ ] Plugins

---

## Any suggestions?

You can write me an E-Mail: [FelixM@yer.tools](mailto:FelixM@yer.tools), get in touch via Twitter: [@yerTools](https://twitter.com/yerTools) or here on [GitHub](https://github.com/yerTools).

---

## Want to try it?
Just go into the [`src`](/src/) directory, there is another [README](/src/README.md)-file.

---

##### [Copyright © 2020 Felix Mayer (FelixM@yer.tools), yerTools](/LICENSE.md)