//TODO REMOVE
import React from 'react';
import './Grid.scss';
import { Badge } from './Badge';

const TEST = {
    add: {
        easy: [0, 2, 0, 3],
        medium: [12],
        hard: [43],
        superhard: [36]
    },
    sub: {
        easy: [22],
        medium: [11, 3, 6, 0],
        hard: [0, 12],
        superhard: [45]
    },
    mult: {
        easy: [87],
        medium: [1009, 5, 0, 1],
        hard: [1123, 3, 445, 2],
        superhard: [0, 1, 2, 1]
    },
}

const ALL_DIFFICULTY = ['easy', 'medium', 'hard', 'superhard'];

const ALL_BADGES = ['poop', 'stone', 'silver', 'gold', 'dimond'];

function BadgesList({data = []}) {
    return data.map((count, index) => {
        const badge = ALL_BADGES[index];
        if(Number.isInteger(count)) {
            return (
                <div className="badge-list" key={index}>
                    <Badge type={badge}/>
                    {count}
                </div>
            );
        } 
        return null;
    });
}

export default function Grid({data = TEST}) {

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
                                        <BadgesList data={TEST[match][diff]}/>
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
