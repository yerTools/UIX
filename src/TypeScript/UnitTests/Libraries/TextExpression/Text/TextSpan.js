(() => {
    const _ = UIX.Libraries.TextExpression.Text;
    const rand = new UIX.Libraries.Random.StringGenerator();
    const randNumber = new UIX.Libraries.Random.XorShift128();

    describe("UIX.Libraries.TextExpression.Text:", () => {
        test("Substring with start", () => {
            for(let i = 0; i < 1500; i++){
                let text = rand.readable(200);
                let substringStart = randNumber.nextUntil(text.length);

                let textSpan = _.TextSpan.fromString(text).substring(substringStart);
                text = text.substring(substringStart);

                if(!textSpan.equalsString(text)){
                    expect(text).toBe("TextSpan should be equal to text");
                    break;
                }
            }
        });

        test("Substring with end", () => {
            for(let i = 0; i < 1500; i++){
                let text = rand.readable(200);
                let substringEnd = randNumber.nextUntil(text.length);

                let textSpan = _.TextSpan.fromString(text).substring(0, substringEnd);
                text = text.substring(0, substringEnd);

                if(!textSpan.equalsString(text)){
                    expect(text).toBe("TextSpan should be equal to text");
                    break;
                }
            }
        });

        test("Substring with start and end", () => {
            for(let i = 0; i < 1500; i++){
                let text = rand.readable(200);
                let substringStart = randNumber.nextUntil(text.length);
                let substringEnd = randNumber.nextBetween(substringStart, text.length);

                let textSpan = _.TextSpan.fromString(text).substring(substringStart, substringEnd);
                text = text.substring(substringStart, substringEnd);

                if(!textSpan.equalsString(text)){
                    expect(text).toBe("TextSpan should be equal to text");
                    break;
                }
            }
        });

        test("Substring with random start and end", () => {
            for(let i = 0; i < 1500; i++){
                let text = rand.readable(200);
                let substringStart = randNumber.nextUntil(text.length * 2);
                let substringEnd = randNumber.nextUntil(text.length * 2);

                let textSpan = _.TextSpan.fromString(text).substring(substringStart, substringEnd);
                text = text.substring(substringStart, substringEnd);

                if(!textSpan.equalsString(text)){
                    expect(text).toBe("TextSpan should be equal to text");
                    break;
                }
            }
        });

        test("Equals", () => {
            for(let i = 0; i < 1500; i++){
                let text = rand.readable(200);
                let textSpan1 = _.TextSpan.fromString(text);
                let textSpan2 = _.TextSpan.fromString(text);
                if(!textSpan1.equals(textSpan2)){
                    expect(text).toBe("TextSpan-1 should be equal to TextSpan-2");
                    break;
                }
            }
        });

        test("Equals string", () => {
            for(let i = 0; i < 1500; i++){
                let text = rand.readable(200);
                let textSpan = _.TextSpan.fromString(text);
                if(!textSpan.equalsString(text)){
                    expect(text).toBe("TextSpan should be equal to text");
                    break;
                }
            }
        });

        test("Starts with", () => {
            for(let i = 0; i < 1500; i++){
                let text = rand.readable(200);
                let query = rand.readable(100);
                if(Math.random() < 0.5){
                    text = query + text;
                }
                if(text.startsWith(query) !== _.TextSpan.fromString(text).startsWith(_.TextSpan.fromString(query))){
                    expect(text).toBe("Behaviour doesn't match the string one");
                    break;
                }
            }
        });

        test("Ends with", () => {
            for(let i = 0; i < 1500; i++){
                let text = rand.readable(200);
                let query = rand.readable(100);
                if(Math.random() < 0.5){
                    text += query;
                }
                if(text.endsWith(query) !== _.TextSpan.fromString(text).endsWith(_.TextSpan.fromString(query))){
                    expect(text).toBe("Behaviour doesn't match the string one");
                    break;
                }
            }
        });

        test("Index of", () => {
            for(let i = 0; i < 1500; i++){
                let text = rand.readable(100);
                let query = rand.readable(50);
                if(Math.random() < 0.5){
                    text += query + rand.readable(100);
                }
                let textSpanIndex = _.TextSpan.fromString(text).indexOf(_.TextSpan.fromString(query));
                if(textSpanIndex === null){
                    textSpanIndex = -1;
                }
                if(text.indexOf(query) !== textSpanIndex){
                    expect(text).toBe("Behaviour doesn't match the string one");
                    break;
                }
            }
        });

        test("Index of with start index", () => {
            for(let i = 0; i < 1500; i++){
                let text = rand.readable(100);
                let query = rand.readable(50);
                if(Math.random() < 0.5){
                    text += query + rand.readable(100);
                }
                let startIndex = randNumber.nextUntil(text.length);
                let textSpanIndex = _.TextSpan.fromString(text).indexOf(_.TextSpan.fromString(query), startIndex);
                if(textSpanIndex === null){
                    textSpanIndex = -1;
                }
                if(text.indexOf(query, startIndex) !== textSpanIndex){
                    expect(text).toBe("Behaviour doesn't match the string one");
                    break;
                }
            }
        });

        test("To string", () => {
            for(let i = 0; i < 1500; i++){
                let text1 = rand.readable(200);
                let text2 = _.TextSpan.fromString(text1).toString();
                if(text1 !== text2){
                    expect(text2).toBe("TextSpan.toString() should be equal to text");
                    break;
                }
            }
        });
    });
})();