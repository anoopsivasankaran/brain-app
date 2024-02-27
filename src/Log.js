import { useSearchParams } from 'react-router-dom';
import './Log.scss';
import { getErrorLogsForMatch } from './utils';
export function Log() {
    const [ search ] = useSearchParams();
    const match = search.get('match');
    const logs = getErrorLogsForMatch(match);
    if(!logs) {
        return 'No Logs';
    }

    return (
        <div className="Log">
            {
                Object.keys(logs).map((item) => {
                    return (
                        <div key={item} className="log-section">
                            <div>
                                <h2>{item}</h2>
                                {
                                    Object.keys(logs[item]).map((value) => {
                                        return (
                                            <div className="log-item" key={value}>
                                                <div className="log-item-name">
                                                    <label>{value}</label>
                                                </div>
                                                {
                                                    logs[item][value].map((res, index) => {
                                                        return (
                                                            <label className={`symbol ${res}`} key={index}>{res ? '\u2713' : '\u2717'}</label>
                                                        );
                                                    })
                                                }

                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
            <div>
                {/* <textarea rows={100} cols={40} value={JSON.stringify(getAllErrorLog())}></textarea> */}
            </div>
        </div>
    );
}
