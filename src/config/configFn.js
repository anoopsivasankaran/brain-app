
function getErrorValTwo(expected1, expected2) {
    return (val1, val2) => {
        const isSuccess = (val1 === expected1 && val2 === expected2);
        if(isSuccess) {
            return null;
        } else {
            let res = '';
            if(!val1 || !val2) {
                res = 'Timeout';
            } else {
                res = `${val1} & ${val2}`;
            }
            return isSuccess ? null : [`${expected1} & ${expected2}`, res];
        }
    }
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getErrorVal(expected) {
    return (val) => {
        const isSuccess = val === expected;
        return isSuccess ? null : [expected, val];
    }
}


export {
    getErrorVal,
    getRandomInt,
    getErrorValTwo
}




