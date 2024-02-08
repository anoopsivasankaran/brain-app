import {
    useSearchParams,
  } from "react-router-dom";
import './FinalResults.scss';
import { useEffect } from "react";
import { addItem } from "./storage";

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

export default function FinalResults({allResult = [], difficulty, probType}) {
    const percentCls = getPercentCls(allResult);

    const [search] = useSearchParams();
    const time = search.get('time');

    useEffect(() => {
        addItem({
            startDate: parseInt(time),
            endDate: (new Date().getTime()),
            probType,
            difficulty,
            badge: percentCls
        });
    }, [difficulty, probType, time, percentCls]);

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

