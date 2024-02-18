import {
    useSearchParams,
  } from "react-router-dom";
import './FinalResults.scss';
import { useEffect } from "react";
import { addItem } from "./utils";

function getPercentCls(allResult = []) {
    const correct = allResult.filter((item) => {
        return !item.getError(item.result, item.result2);
    });
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

export default function FinalResults({allResult = [], difficulty, probType, match}) {
    const percentCls = getPercentCls(allResult);

    const [search] = useSearchParams();
    const time = search.get('time');

    useEffect(() => {
        addItem({
            startDate: parseInt(time),
            endDate: (new Date().getTime()),
            probType,
            difficulty,
            badge: percentCls,
            match,
        });
    }, [difficulty, probType, time, percentCls, match]);

    return (
        <div className="FinalResults">
            <div className="difficulty">
                <div>Difficulty: {difficulty}</div>
                <div>Badge: {percentCls}</div>
            </div>
            <div className={`badge ${percentCls}`}>

            </div>
            <div className="results">
                {allResult.map((item, index) => {
                    const error = item.getError(item.result, item.result2);
                    
                    let label = '';
                    if(error) {
                        label = !error[1]? 'Timeout': `${error[1]} (Correct: ${error[0]})`;
                    } else {
                        label = item.result;
                    }
                    return (
                        <div key={index} className={`result-item ${!!error ? 'error' : 'success'}`}>
                            <label>{item.question} = {label}</label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

