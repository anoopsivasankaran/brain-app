import {
    Link,
  } from "react-router-dom";
import './FinalResults.scss';

function getPercentCls(allResult = []) {
    const correct = allResult.filter((item) => item.result === item.exptedResult);
    const percent = (correct.length / allResult.length) * 100;
    if(percent < 40) {
        return 'poop';
    }

    if(percent < 60) {
        return 'stone';
    }

    if(percent < 80) {
        return 'silver';
    }

    if(percent < 100) {
        return 'gold';
    }

    return 'dimond';

}

export default function FinalResults({allResult = [], difficulty}) {
    const percentCls = getPercentCls(allResult);
    console.log(percentCls);
    return (
        <div className="FinalResults">
            <div className="control">
                <Link to="/">
                    <button> &lt; HOME</button>
                </Link>
            </div>
            <div className="difficulty">
                <div>Difficulty: {difficulty}</div>
                <div>Badge: {percentCls}</div>
            </div>
            <div className={`badge ${percentCls}`}>

            </div>
            <div className="results">
                {allResult.map((item, index) => {
                    const error = item.result !== item.exptedResult;

                    return (
                        <div key={index} className={`result-item ${error ? 'error' : 'success'}`}>
                            <label>{item.oper1} {item.operator} {item.oper2} = {isNaN(item.result)? 'Timeout': item.result}</label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

