//TODO REMOVE
import React, { useEffect, useState } from 'react';
import './Grid.scss';
import { Badge } from './Badge';
import { getAll } from './storage';
import {groupBy, mapValues} from 'lodash';


const ALL_DIFFICULTY = ['easy', 'medium', 'hard', 'superhard'];


function BadgesList({data = []}) {
    return Object.keys(data).map((badge) => {
        if(badge === 'poop') {
            return null;
        }
        const count = data[badge];
            return (
                <div className="badge-list" key={badge}>
                    <Badge type={badge}/>
                    {count}
                </div>
            );
    });
}


const DEFAULT = {add: {}, sub: {}, mult: {}};
export default function Grid() {

    const [data, setData] = useState(DEFAULT);
    
    useEffect(() => {
        const storage = getAll();
        
        const values = Object.values(storage);


        const matchGroupBy = groupBy(values, 'probType');
        const matchDiffGroupBy = mapValues(matchGroupBy, (val) => {
            const newGrpup = groupBy(val, 'difficulty');
            return mapValues(newGrpup, (item) => {
                const val2 = groupBy(item, 'badge');
                return mapValues(val2, item => item.length);
            })
        });
        setData({...DEFAULT, ...matchDiffGroupBy});
    }, []);

    const allMatches  = Object.keys(data);

    return (
        <div className="grid">
            <div></div>
            {
                allMatches.map((match) => {
                    return (
                        <div key={match}>{match}</div>
                    )
                })
            }
            {
                ALL_DIFFICULTY.map((diff) => {
                    return (
                        <React.Fragment key={diff}>
                            <div>{diff}</div>
                            {
                                allMatches.map((match) => (
                                    <div key={match} className="badge-list-container">
                                        <BadgesList data={data[match][diff]}/>
                                    </div>
                                ))
                            }
                        </React.Fragment>
                    )
                })
            }
        </div>
    );

}
