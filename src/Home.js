import { useState } from "react";
import badges from './badges.png';
import './Home.scss';
import {
    Link,
  } from "react-router-dom";
  

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
                <input type="radio" name="difficulty" id="easy" value="easy" checked={difficulty === 'easy'} onChange={onChangeDiff}/>
                <label htmlFor="easy">EASY</label>
                <input type="radio" name="difficulty" id="medium" value="medium" checked={difficulty === 'medium'} onChange={onChangeDiff}/>
                <label htmlFor="medium">MEDIUM</label>
                <input type="radio" name="difficulty" id="hard" value="hard" checked={difficulty === 'hard'} onChange={onChangeDiff}/> 
                <label htmlFor="hard">HARD</label>
                <input type="radio" name="difficulty" id="superhard" value="superhard" checked={difficulty === 'superhard'} onChange={onChangeDiff}/>
                <label htmlFor="superhard">SUPER HARD</label>
            </div>
            
            <Link to={`/game?prob-type=${probType}&difficulty=${difficulty}&time=${new Date().getTime()}`}>
                <button>GO</button>
            </Link>
        </div>
    );
}
