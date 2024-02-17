import { getErrorVal, getErrorValTwo, getRandomInt } from "./configFn";
import scaleImage from '../images/scale.jpg';

const match1 = {
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
            const exptedResult = oper1 + oper2;
            return {
                question: `${oper1} + ${oper2}`,
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
            const exptedResult = oper1 - oper2;

            return {
                question: `${oper1} - ${oper2}`,
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
            const exptedResult = oper1 * oper2;
            return {
                question: `${oper1} X ${oper2}`,
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
            return {
                question: `${num1 * num2 + rem} \u00F7 ${num2}`,
                getError: getErrorValTwo(num1, rem)
            }
        },
    }
};

export default match1;
