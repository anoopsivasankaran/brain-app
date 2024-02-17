import { Badge } from "./Badge";
import { getForMatch } from "./utils";
import moment from 'moment';

import './Results.scss';
import { useSearchParams } from "react-router-dom";

function dateDiff(startDate, endDate) {

    var duration = moment.duration(moment(endDate).diff(moment(startDate)));
    var hours = Math.floor(duration.asSeconds());
    return `(${hours} sec)`; 
}

export default function Results() {

    const [ search ] = useSearchParams();
    const match = search.get('match');

    const results  = getForMatch(match);
    const keys = Object.keys(results).sort((a, b) => b - a);
    
    return (
        <div className="results">
            {
                keys.map((key) => {
                    const {badge, probType, difficulty, endDate, startDate} = results[key];
                    return (
                        <div className="results-item" key={endDate}>
                            <Badge type={badge} />
                            <div>{probType}</div>
                            <div className={`difficulty ${difficulty}`}>{difficulty}</div>
                            <div className="day">{moment(endDate).fromNow()}</div>
                            <div className="day">{dateDiff(startDate, endDate)}</div>
                        </div>
                    );
                })
            }
        </div>
    );
    

}
