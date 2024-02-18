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
        },
        hard: {
            time: 60,
        },
        _ques: () => {
            const oper1 = getRandomInt(1000, 10000);
            const oper2 = getRandomInt(1000, 10000);
            const exptedResult = oper1 + oper2;
            return {
                question: <div><label><br /> {oper1} + <br />{oper2} </label></div>,
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
            const exptedResult = oper1 - oper2;

            return {
                question: <div><label><br /> {oper1} - <br />{oper2} </label></div>,
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
            const exptedResult = oper1 * oper2;
            return {
                question: <div><label><br /> {oper1} X <br />{oper2} </label></div>,
                getError: getErrorVal(exptedResult)
            }
        },
    },
}

export default match2;
