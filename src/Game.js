import { useCallback, useEffect, useRef, useState } from "react";
import './Game.scss';
import {
    useSearchParams
  } from "react-router-dom";
import FinalResults from "./FinalResults";
import { generateQuestion, getMatchTitle, getTimeForDifficulty } from "./config";

const NUM_OF_QUES = 10;

export default function Game() {

    const [ search ] = useSearchParams();
    const probType = search.get('prob-type');
    const difficulty = search.get('difficulty');
    const match = search.get('match');
    const timeoutDiff = getTimeForDifficulty(match, probType, difficulty);
    const ref = useRef();
    const prob = generateQuestion(match, probType, difficulty);
    const [problem, setProblem] = useState(prob);
    const [result, setResult] = useState('');
    const [result2, setResult2] = useState('');
    const [allResult, setAllResult] = useState([]);
    const [error, setError] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [timeout, setTimeout] = useState(timeoutDiff);

    const handleSubmit = useCallback(() => {
        const r1 = parseInt(result);
        const r2 = parseInt(result2);
        setSubmitted(true)
        let err;
        if(Number.isInteger(problem.exptedResult2)) {
            err = (r1 !== problem.exptedResult) || (r2 !== problem.exptedResult2)
        } else {
            err = r1 !== problem.exptedResult
        }
        setError(err)
    }, [problem, result, result2])

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
                <FinalResults allResult={allResult} difficulty={difficulty} probType={probType} match={match}/>
            </div>
        );
    }

    return (
        <div className={`Game ${probType}`}>
            <div>
            <h3>{`${getMatchTitle(match)} -> ${difficulty}`}</h3>
            </div>
            <div className="info">
                <label>Question {allResult.length + 1} out of {NUM_OF_QUES}</label>
            </div>
            <div className="top">
                <label>{`${problem.oper1} ${problem.operator} ${problem.oper2}`}</label>
                <div className="input-group">
                    <input
                        readOnly={submitted}
                        ref={ref}
                        type="number"
                        value={result}
                        onChange={(evt) => {
                            setResult(evt.target.value)
                        }}
                        onKeyUp={(e) => {
                            if (e.key === "Enter") {
                                handleSubmit();
                            }
                        }}
                    />
                    <input
                        className="second-input"
                        placeholder="Rem"
                        readOnly={submitted}
                        type="number"
                        value={result2}
                        onChange={(evt) => {
                            setResult2(evt.target.value)
                        }}
                        onKeyUp={(e) => {
                            if (e.key === "Enter") {
                                handleSubmit();
                            }
                        }}
                    />
                </div>

            </div>
            
            {
                !submitted && (
                    <div className="control">
                        <button disabled={!result} onClick={handleSubmit}>Submit</button> 
                        {
                            !!timeout && <label className="timer-label">{timeout}</label>
                        }
                    </div>
                )
            }
            {
                submitted && (
                    <div className="result">
                        {
                            error ? (
                                <div className="error">Its wrong :( Correct answer is {problem.exptedResult} <label>{Number.isInteger(problem.exptedResult2) && `& ${problem.exptedResult2}`}</label></div>
                            ) : (
                                <div className="success"> Correct ! </div>
                            )
                        }
                        <div className="control">
                            <button onClick={() => {
                                setSubmitted(false);
                                const r1 = parseInt(result);
                                setAllResult([...allResult, {...problem, result: r1}])
                                const prob = generateQuestion(match, probType, difficulty);
                                setProblem(prob);
                                setResult('');
                                setResult2('');
                                setTimeout(timeoutDiff);
                                ref.current.focus();
                                
                            }}>Next &gt;</button>
                        </div>
                    </div>
                )
            }
            
            
        </div>
    );

}

