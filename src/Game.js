import { useState } from "react";
import './Game.scss';
import {
    Link,
    useSearchParams
  } from "react-router-dom";
import FinalResults from "./FinalResults";

const NUM_OF_QUES = 2;

// both inclusive
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestion(type) {
    let oper1, oper2, operator;
    switch (type) {
        case 'add':
            oper1 = getRandomInt(3, 9);
            oper2 = getRandomInt(5, 9);
            operator = '+';
            return {
                oper1,
                oper2,
                operator,
                exptedResult: oper1 + oper2
            }
        case 'sub':
            oper1 = getRandomInt(6, 19);
            oper2 = getRandomInt(0, Math.min(oper1, 9));
            operator = '-';
            return {
                oper1,
                oper2,
                operator,
                exptedResult: oper1 - oper2
            }

        case 'mult':
            oper1 = getRandomInt(2, 10);
            oper2 = getRandomInt(4, 10);
            operator = 'X';
            return {
                oper1,
                oper2,
                operator,
                exptedResult: oper1 * oper2
            }
        default:
            break;
    }
}

export default function Game() {

    const [ search ] = useSearchParams();
    const probType = search.get('prob-type');
    const difficulty = search.get('difficulty');

    const prob = generateQuestion(probType);


    
    const [problem, setProblem] = useState(prob);
    const [result, setResult] = useState('');
    const [allResult, setAllResult] = useState([]);
    const [error, setError] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    if(allResult.length >= NUM_OF_QUES) {
        return (
            <div>
                <FinalResults allResult={allResult}/>
            </div>
        );
    }

    return (
        <div className="Game">
            <div className="control">
                <Link to="/">
                <button> &lt; HOME</button>
                </Link>
            </div>
            <div className="info">
                <label>Question {allResult.length + 1} out of {NUM_OF_QUES}</label>
            </div>
            <div className="top">
                <label>{`${problem.oper1} ${problem.operator} ${problem.oper2}`}</label>
                <input type="number" value={result} onChange={(evt) => {
                    setResult(evt.target.value)
                }}/>

            </div>
            
            {
                !submitted && (
                    <div className="control">
                        <button disabled={!result} onClick={() => {
                            const r1 = parseInt(result);
                            setSubmitted(true)
                            setError(r1 !== problem.exptedResult)
                        }}>Submit</button>
                    </div>
                )
            }
            {
                submitted && (
                    <div className="result">
                        {
                            error ? (
                                <div className="error">Its wrong. Correct answer is {problem.exptedResult} </div>
                            ) : (
                                <div className="success"> Correct ! </div>
                            )
                        }
                        <div className="control">
                            <button onClick={() => {
                                setSubmitted(false);
                                const r1 = parseInt(result);
                                setAllResult([...allResult, {...problem, result: r1}])
                                const prob = generateQuestion(probType);
                                setProblem(prob);
                                setResult('');
                            }}>Next &gt;</button>
                        </div>
                    </div>
                )
            }
            
            
        </div>
    );

}

