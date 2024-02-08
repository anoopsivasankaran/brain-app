import { Badge } from "./Badge";
import { getAll } from "./storage";
import './Results.scss';

function dateDiff(time) {
    var datediff = (new Date().getTime())- time; 
    const days = Math.floor(datediff / (24*60*60*1000));
    if(days === 0) {
        return 'Today';
    }
    if(days === 1) {
        return 'Yesterday'
    }
    return `${days} days ago`;
}

export default function Results() {
    const results  = getAll();
    const keys = Object.keys(results).sort((a, b) => b - a);

    return (
        <div className="results">
            {
                keys.map((key) => {
                    const {badge, probType, difficulty, endDate} = results[key];
                    return (
                        <div className="results-item" key={endDate}>
                            <Badge type={badge} />
                            <div>{probType}</div>
                            <div className={`difficulty ${difficulty}`}>{difficulty}</div>
                            <div className="day">{dateDiff(endDate)}</div>
                        </div>
                    );
                })
            }
        </div>
    );
    

}
