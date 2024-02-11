import React, { useState } from "react";
import './Home.scss';
import {
    Link,
  } from "react-router-dom";
import { DIFFICULTY_MAP } from "./utils";
  

export default function Home() {

    const [probType, setProbType] = useState('add');
    const [difficulty, setDifficulty] = useState('easy');

    const onChangeProb = (evt) => {
        setProbType(evt.target.value);
    };

    const onChangeDiff = (evt) => {
        setDifficulty(evt.target.value);
    };

    return (
        <div className="Home">
            <div className="home-header">
                
                <Link to="results">
                    <button> History </button>
                </Link>
                <Link to="table">
                    <button> Badges </button>
                </Link>
            </div>
            <div className="home-grid">
                <input type="radio" name="prob_type" id="add" value="add" checked={probType === 'add'} onChange={onChangeProb}/>
                <label htmlFor="add">ADD (+)</label>
                <input type="radio" name="prob_type" id="sub" value="sub" checked={probType === 'sub'} onChange={onChangeProb}/>
                <label htmlFor="sub">SUBTRACTION (-)</label>
                <input type="radio" name="prob_type" id="mult" value="mult" checked={probType === 'mult'} onChange={onChangeProb}/> 
                <label htmlFor="mult">MULT (x)</label>
            </div>
            <div className="home-grid">
                {
                    Object.keys(DIFFICULTY_MAP).map((item) => {
                        console.log('***', item);
                        return (
                            <React.Fragment key={item}>
                                <input type="radio" name="difficulty" id={item} value={item} checked={difficulty === item} onChange={onChangeDiff}/>
                                <label htmlFor={item}>
                                    {DIFFICULTY_MAP[item]?.name || item }
                                    {DIFFICULTY_MAP[item].level === 2 ? '\u270E' : null}
                                </label>
                            </React.Fragment>
                        )
                    })
                }
               
               
            </div>
            
            <Link to={`/game?prob-type=${probType}&difficulty=${difficulty}&time=${new Date().getTime()}`}>
                <button>GO</button>
            </Link>
        </div>
    );
}
