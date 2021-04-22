(() => {
    const _ = new UIX.Libraries.Random.XorShift128();

    let testData = [
        [ 0,  1], 
        [ 1,  0], 
        [-1,  1], 
        [ 1, -1], 
        [ 0, 10], 
        [10,  0]
    ];
    for(let i = 0; i < 10_000; i++){
        testData.push([
            Math.round(Math.random() * 2_000_0000 - 1_000_0000),
            Math.round(Math.random() * 2_000_0000 - 1_000_0000)
        ]);
    }
    
    describe("UIX.Libraries.Random.XorShift128:", () => {
        test("next() is uint32", () => {
            for(let i = 0, x; i < 500_000; i++){
                x = _.next();
                if(x < 0){
                    expect(x).toBeGreaterThanOrEqual(0);
                    break;
                }else if(x > 0xffffffff){
                    expect(x).toBeLessThanOrEqual(0xffffffff);
                    break;
                }
            }
        });

        test("nextUntil() is smaller than max", () => {
            for(let i = 0, x; i < testData.length; i++){
                x = _.nextUntil(testData[i][0]);
                if(testData[i][0] <= 0){
                    if(x !== 0){
                        expect(x).toBe(0);
                    }
                }else if(x >= testData[i][0]){
                    expect(x).toBeLessThan(testData[i][0]);
                    break;
                }

                x = _.nextUntil(testData[i][1]);
                if(testData[i][1] <= 0){
                    if(x !== 0){
                        expect(x).toBe(0);
                    }
                }else if(x >= testData[i][1]){
                    expect(x).toBeLessThan(testData[i][1]);
                    break;
                }
            }
        });

        test("nextBetween() min and max are the same", () => {
            for(let i = 0, x; i < testData.length; i++){
                x = _.nextBetween(testData[i][0], testData[i][0]);
                if(x !== testData[i][0]){
                    expect(x).toBe(testData[i][0]);
                    break;
                }
                x = _.nextBetween(testData[i][1], testData[i][1]);
                if(x !== testData[i][1]){
                    expect(x).toBe(testData[i][1]);
                    break;
                }
            }
        });

        test("nextBetween() is between min and max", () => {
            for(let i = 0, min, max, x; i < testData.length; i++){
                if(testData[i][0] < testData[i][1]){
                    min = testData[i][0];
                    max = testData[i][1];
                }else{
                    min = testData[i][1];
                    max = testData[i][0];
                }

                x = _.nextBetween(min, max);
                if(x < min){
                    expect(x).toBeGreaterThanOrEqual(min);
                    break;
                }else if(x >= max){
                    expect(x).toBeLessThan(max);
                    break;
                }
            }
        });

        test("nextBetween() is between but min and max are maybe swapped", () => {
            for(let i = 0, min, max, x; i < testData.length; i++){
                if(testData[i][0] < testData[i][1]){
                    min = testData[i][0];
                    max = testData[i][1];
                }else{
                    min = testData[i][1];
                    max = testData[i][0];
                }

                x = _.nextBetween(testData[i][0], testData[i][1]);
                if(x < min){
                    expect(x).toBeGreaterThanOrEqual(min);
                    break;
                }else if(x >= max){
                    expect(x).toBeLessThan(max);
                    break;
                }
            }
        });

        test("nextBetween() min is inclusive", () => {
            let ranges = [
                [  0,  1],
                [ -1,  1],
                [-10, 10],
                [  0, 10],
                [  3,  7]
            ]
            let endTime = new Date().getTime() + 5000;
            let checkTime = 0;
            
            for(let i = 0; i < ranges.length && endTime; i++){
                let minReached = false;
                while(!minReached){
                    let result = _.nextBetween(ranges[i][1], ranges[i][0]);
                    if(result === ranges[i][0]){
                        minReached = true;
                    }
    
                    if(++checkTime === 10000){
                        checkTime = 0;
                        if(endTime < new Date().getTime()){
                            expect("Timeout reached").toBe("Min is inclusive");
                            endTime = 0;
                            break;
                        }
                    }
                }

                if(!minReached){
                    expect("Minimum value can't be reached").toBe("Minimum value");
                    break;
                }
            }
        });

        test("nextDouble() is 0 <= x < 1", () => {
            for(let i = 0, x; i < 500_000; i++){
                x = _.nextDouble();
                if(x < 0){
                    expect(x).toBeGreaterThanOrEqual(0);
                    break;
                }else if(x >= 1){
                    expect(x).toBeLessThan(1);
                    break;
                }
            }
        });

        test("clone()", () => {
            for(let i = 0, x, y, clone; i < 5_000; i++){
                clone = _.clone();
                x = _.next();
                y = clone.next();
                if(x !== y){
                    expect(x).toBe(y);
                    break;
                }
            }
        });
    });
})();