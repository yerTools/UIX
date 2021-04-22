(() => {
    const rand = new UIX.Libraries.Random.XorShift128();
    const _ = new UIX.Libraries.Random.StringGenerator();

    describe("UIX.Libraries.Random.StringGenerator:", () => {
        let testLength = (text, expectedLength) =>{
            if(text.length === expectedLength){
                return true;
            }else{
                expect(text).toBe("Has length of " + expectedLength +" instead of " + text.length + ".");
                return false;
            }
        };

        let createRangeTest = (name, generator, min, max) => {
            test(name, () =>{
                for(let i = 0, error = false; i < 1000 && !error; i++){
                    let length = rand.nextUntil(120);
                    let text =  generator.call(_, length, length);
                    if(!testLength(text, length)){
                        error = true;
                        break;
                    }
                    for(let i = 0; i < length; i++){
                        let value = text.charCodeAt(i);
                        if(value < min || value > max){
                            expect("Char code with number 0x" + value.toString(16) + " is outside of " + name + " range.").toBe("Between 0x" + min.toString(16) + " and 0x" + max.toString(16) + ".");
                            error = true;
                            break;
                        }
                    }
                }
            });
        };

        let createRegexTest = (name, generator, regex) => {
            test(name, () =>{
                for(let i = 0, error = false; i < 2500 && !error; i++){
                    let length = rand.nextUntil(100);
                    let text = generator.call(_, length, length);
                    if(!testLength(text, length)){
                        error = true;
                        break;
                    }
                    if(!regex.test(text)){
                        expect(text).toBe("/" + regex.source + "/" + regex.flags);
                        error = true;
                        break;
                    }
                }
            });
        };

        createRangeTest("UTF-32", _.utf32, 0, 0x10ffff);
        createRangeTest("UTF-16", _.utf16, 0, 0xffff);
        createRangeTest("ISO-8859-1", _.iso8859_1, 0, 0xff);

        createRegexTest("Numbers", _.numbers, new RegExp("^\\d*$"));
        createRegexTest("Base64", _.base64, new RegExp("^[A-Za-z\\d\\+/]*$"));
        createRegexTest("Text", _.text, new RegExp("^[A-Za-z]*$"));
        createRegexTest("Special", _.special, new RegExp("^[^A-Za-z\\d\\s]*$"));
        createRegexTest("Whitespace", _.whitespace, new RegExp("^\\s*$"));
        createRegexTest("Umlaut", _.umlaut, new RegExp("^[äöüÄÖÜáéíóúàèìòùâêîôû]*$"));
        createRegexTest("Emojis", _.emoji, new RegExp("^[^A-Za-z\\d\\s]*$"));
        createRegexTest("Readable", _.readable, new RegExp("^[\\D\\S]*$"));
    });
})();