import calcImage from '../images/calc.jpg';
import { getErrorVal, getRandomInt } from "./configFn";

const match2 = {
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
                getError: getErrorVal(exptedResult)
            }
        },
    },
}

export default match2;
