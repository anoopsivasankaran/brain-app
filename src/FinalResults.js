import {
    Link,
  } from "react-router-dom";
import './FinalResults.scss';

export default function FinalResults({allResult = []}) {
    return (
        <div className="FinalResults">
            <div className="control">
                <Link to="/">
                    <button> &lt; HOME</button>
                </Link>
            </div>
            <div className="results">
                {allResult.map((item, index) => {
                    const error = item.result !== item.exptedResult;

                    return (
                        <div key={index} className={`result-item ${error ? 'error' : 'success'}`}>
                            <label>{item.oper1} {item.operator} {item.oper2} = {item.result}</label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

