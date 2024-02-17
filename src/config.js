import calcImage from './images/calc.jpg';
import scaleImage from './images/scale.jpg';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const BADGES = ['poop', 'stone', 'silver', 'gold', 'dimond'];
const [POOP, STONE, SILVER, GOLD, DIMOND] = BADGES;

function getErrorVal(expected) {
    return (val) => {
        const isSuccess = val === expected;
        return isSuccess ? null : expected;
    }
}

function getErrorValTwo(expected1, expected2) {
    return (val1, val2) => {
        const isSuccess = (val1 === expected1 && val2 === expected2);
        return isSuccess ? null : `${expected1} & ${expected2}`;
    }
}


const MATCH_MAP = {
    match1: {
        _info: {
            name: 'Maths: Level 1',
            numbers: 10,
            image: scaleImage,
        },
        add: {
            easy: {
                time: 0,
            },
            medium: {
                time: 20
            },
            hard: {
                time: 10
            },
            superhard: {
                time: 5,
            },
            _ques: () => {
                const oper1 = getRandomInt(3, 9);
                const oper2 = getRandomInt(5, 9);
                const operator = '+';
                const exptedResult = oper1 + oper2;
                return {
                    oper1,
                    oper2,
                    operator,
                    exptedResult,
                    getError: getErrorVal(exptedResult)
                }
            },
           
        },
        sub: {
            easy: {
                time: 0,
            },
            medium: {
                time: 20
            },
            hard: {
                time: 10
            },
            superhard: {
                time: 5,
            },
            _ques: () => {
                const val1 = getRandomInt(6, 19);
                const val2 = getRandomInt(2, 9);
                const oper1 = Math.max(val1, val2);
                const oper2 = Math.min(val1, val2);
                const operator = '-';
                const exptedResult = oper1 - oper2;

                return {
                    oper1,
                    oper2,
                    operator,
                    exptedResult: exptedResult,
                    getError: getErrorVal(exptedResult)
                }
            },
        },
        mult: {
            easy: {
                time: 0,
            },
            medium: {
                time: 20
            },
            hard: {
                time: 10
            },
            superhard: {
                time: 5,
            }, 
            _ques: () => {
                const oper1 = getRandomInt(2, 9);
                const oper2 = getRandomInt(4, 9);
                const operator = 'X';
                const exptedResult = oper1 * oper2;
                return {
                    oper1,
                    oper2,
                    operator,
                    exptedResult,
                    getError: getErrorVal(exptedResult)
                }
            },
        },
        div: {
            easy: {
                time: 0,
            },
            medium: {
                time: 60
            },
            hard: {
                time: 40
            },
            superhard: {
                time: 20,
            },
            _ques: () => {
                const num1 = getRandomInt(2, 9);
                const num2 = getRandomInt(2, 9);
                const rem = getRandomInt(0, num2 - 1);

                const operator = '\u00F7';
                return {
                    oper1: num1 * num2 + rem,
                    oper2: num2,
                    operator,
                    exptedResult: num1,
                    exptedResult2: rem,
                    getError: getErrorValTwo(num1, rem)
                }
            },
        }
    },
    match2: {
        _info: {
            name: 'Maths: Level 2',
            numbers: 5,
            image: calcImage
        },
        add: {
            easy :{
                time: 0,
                level: 2,
            },
            hard: {
                time: 60,
                level: 2,
            },
            _ques: () => {
                const oper1 = getRandomInt(1000, 10000);
                const oper2 = getRandomInt(1000, 10000);
                const operator = '+';
                const exptedResult = oper1 + oper2;
                return {
                    oper1,
                    oper2,
                    operator,
                    exptedResult,
                    getError: getErrorVal(exptedResult)
                }
            },
    
        },
        sub: {
            easy :{
                time: 0,
            },
            hard: {
                time: 60,
            },
            _ques: () => {
                const val1 = getRandomInt(1000, 10000);
                const val2 = getRandomInt(1000, 10000);
                const oper1 = Math.max(val1, val2);
                const oper2 = Math.min(val1, val2);
                const operator = '-';
                const exptedResult = oper1 - oper2;

                return {
                    oper1,
                    oper2,
                    operator,
                    exptedResult,
                    getError: getErrorVal(exptedResult)
                }
            },
        },
        mult: {
            easy :{
                time: 0,
            },
            hard: {
                time: 120,
            },
            _ques: () => {
                const oper1 = getRandomInt(100, 1000);
                const oper2 = getRandomInt(45, 99);
                const operator = 'X';
                const exptedResult = oper1 * oper2;
                return {
                    oper1,
                    oper2,
                    operator,
                    exptedResult,
                    getError: getErrorVal(exptedResult)
                }
            },
        },
    }
}

function getMatchInfo(matchName) {
    return MATCH_MAP[matchName]?._info;
}

function getMatchTitle(matchName) {
    const info = getMatchInfo(matchName) || {};
    return info?.name;

}

function removeUnderscores(obj) {
    const ret = {};
    for (const [key = '', value] of Object.entries(obj)) {
        if(key[0] !== '_') {
            ret[key] = value;
        }
    }
    return ret;
}

function getGame(matchName) {
    const all =  MATCH_MAP[matchName] || {};
    return removeUnderscores(all);
}

function getMenuItems() {
    return Object.keys(MATCH_MAP).map((item) => {
        const val = MATCH_MAP[item];
        return {
            key: item,
            name: val._info.name,
            image: val._info.image,
        };
    });
}

function getDifficulties(match, type) {
    const diffiObj = MATCH_MAP?.[match]?.[type] || {};
    return removeUnderscores(diffiObj);

}

function generateQuestion(match, type, diff = '') {
    const diffiObj = MATCH_MAP?.[match]?.[type] || {};
    const fn = diffiObj?.[diff]?._ques || diffiObj?._ques;
    if(fn) {
        return fn();
    }
    
    return null
}

function getTimeForDifficulty(match, type, diffi = '') {
    const aa = MATCH_MAP?.[match]?.[type]?.[diffi]?.time;
    return aa;
}

export {
    getMatchInfo,
    getGame,
    getMenuItems,
    getDifficulties,
    generateQuestion,
    getTimeForDifficulty,
    getMatchTitle,
    POOP,
    STONE,
    SILVER,
    GOLD,
    DIMOND,
    BADGES
}
