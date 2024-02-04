import { useCallback, useEffect, useRef, useState } from "react";
import './Game.scss';
import {
    Link,
    useSearchParams
  } from "react-router-dom";
import FinalResults from "./FinalResults";

const NUM_OF_QUES = 10;

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

function getTimeout(difficulty) {
    switch (difficulty) {
        case 'easy':
            return 0;
        case 'medium':
            return 20;
        case 'hard':
            return 10;
        default:
            return 0;
    }

}

export default function Game() {

    const [ search ] = useSearchParams();
    const probType = search.get('prob-type');
    const difficulty = search.get('difficulty');
    const timeoutDiff = getTimeout(difficulty);
    const ref = useRef();

    const prob = generateQuestion(probType);


    
    const [problem, setProblem] = useState(prob);
    const [result, setResult] = useState('');
    const [allResult, setAllResult] = useState([]);
    const [error, setError] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [timeout, setTimeout] = useState(timeoutDiff);

    const handleSubmit = useCallback(() => {
        const r1 = parseInt(result);
        setSubmitted(true)
        setError(r1 !== problem.exptedResult)
    }, [problem.exptedResult, result])

    useEffect(() => {
        ref.current.focus();
    }, [])

     useEffect(() => {
        let intr;
        
        if(timeout) {
            intr = setInterval(() => {
                const newTimeout = timeout - 1;
                if(newTimeout >= 0) {
                    setTimeout(newTimeout);
                }

                if(newTimeout === 0 && !submitted) {
                    handleSubmit()
                }
                
            }, 1000);
        }

        return () => {
            if(intr) {
                clearInterval(intr);
            }
        }
        
     }, [handleSubmit, submitted, timeout]);

    if(allResult.length >= NUM_OF_QUES) {
        return (
            <div>
                <FinalResults allResult={allResult} difficulty={difficulty}/>
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
                <input readOnly={submitted} ref={ref} type="number" value={result} onChange={(evt) => {
                    setResult(evt.target.value)
                }}/>

            </div>
            
            {
                !submitted && (
                    <div className="control">
                        <button disabled={!result} onClick={handleSubmit}>Submit</button> 
                        {
                            !!timeout && <label>{timeout}</label>
                        }
                    </div>
                )
            }
            {
                submitted && (
                    <div className="result">
                        {
                            error ? (
                                <div className="error">Its wrong :( Correct answer is {problem.exptedResult} </div>
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
                                setTimeout(timeoutDiff);
                                console.log(ref.current);
                                ref.current.focus();
                                
                            }}>Next &gt;</button>
                        </div>
                    </div>
                )
            }
            
            
        </div>
    );

}

