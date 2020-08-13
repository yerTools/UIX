(() => {
    const _ = UIX.Libraries.Random.NumberGenerator;

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

    describe("UIX.Libraries.Random.NumberGenerator:", () => {
        test("Min and max are the same.", () => {
            for(let i = 0, x; i < testData.length; i++){
                x = _.intBetween(testData[i][0], testData[i][0]);
                if(x !== testData[i][0]){
                    expect(x).toBe(testData[i][0]);
                    break;
                }
                x = _.intBetween(testData[i][1], testData[i][1]);
                if(x !== testData[i][1]){
                    expect(x).toBe(testData[i][1]);
                    break;
                }
            }
        });

        test("Is between min and max.", () => {
            for(let i = 0, min, max, x; i < testData.length; i++){
                if(testData[i][0] < testData[i][1]){
                    min = testData[i][0];
                    max = testData[i][1];
                }else{
                    min = testData[i][1];
                    max = testData[i][0];
                }

                x = _.intBetween(min, max);
                if(x < min){
                    expect(x).toBeGreaterThanOrEqual(min);
                    break;
                }else if(x > max){
                    expect(x).toBeLessThanOrEqual(max);
                    break;
                }
            }
        });

        test("Is between but min and max are maybe swapped.", () => {
            for(let i = 0, min, max, x; i < testData.length; i++){
                if(testData[i][0] < testData[i][1]){
                    min = testData[i][0];
                    max = testData[i][1];
                }else{
                    min = testData[i][1];
                    max = testData[i][0];
                }

                x = _.intBetween(testData[i][0], testData[i][1]);
                if(x < min){
                    expect(x).toBeGreaterThanOrEqual(min);
                    break;
                }else if(x > max){
                    expect(x).toBeLessThanOrEqual(max);
                    break;
                }
            }
        });

        test("Min and max are inclusive.", () => {
            let ranges = [
                [  0,  1],
                [ -1,  1],
                [-10, 10],
                [  0, 10],
                [  3,  7]
            ]
            let endTime = new Date().getTime() + 5000;
            let checkTime = 0;
    
            for(let i = 0; i < ranges.length; i++){
                let minReached = false;
                let maxReached = false;
                while(!minReached || !maxReached){
                    let result = _.intBetween(ranges[i][1], ranges[i][0]);
                    if(result === ranges[i][0]){
                        minReached = true;
                    }else if(result === ranges[i][1]){
                        maxReached = true;
                    }
    
                    if(++checkTime === 10000){
                        checkTime = 0;
                        if(endTime < new Date().getTime()){
                            break;
                        }
                    }
                }

                if(!minReached || !maxReached){
                    if(!minReached){
                        expect("Minimum value can't be reached.").toBe("Minimum value");
                    }else{
                        expect("Maximum value can't be reached.").toBe("Maximum value");
                    }
                    break;
                }
            }
        });
    });
})();