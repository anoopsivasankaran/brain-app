import React, { useState } from "react";
import './Home.scss';
import {
    Link, useSearchParams,
  } from "react-router-dom";
import { BADGES, getDifficulties, getGame, getMatchTitle } from "./config";
import getText from "./text";
import { getBadgeCount } from "./utils";
import { reverse } from "lodash";
import { Badge } from "./Badge";
  

export default function Home() {

    
    const [difficulty, setDifficulty] = useState('easy');

    const [ search ] = useSearchParams();
    const match = search.get('match');

    const allGames = getGame(match);
    
    
    const [probType, setProbType] = useState();

    useState(() => {
        setProbType(Object.keys(allGames)[0])
    }, [allGames])

    const diffs = getDifficulties(match, probType);


    const onChangeProb = (evt) => {
        setProbType(evt.target.value);
    };

    const onChangeDiff = (evt) => {
        setDifficulty(evt.target.value);
    };

    const badgeCount = getBadgeCount(match)

    return (
        <div className="Home">
            <div>
                <h3>{getMatchTitle(match)}</h3>
            </div>
            <div className="home-header">
                <Link to={`/results?match=${match}`}>
                    <button> History </button>
                </Link>
                <Link className="home-button" to={`/`}>
                    <button> &lt; Home </button>
                </Link>
            </div>
            
            <div className="home-grid">
                {
                    Object.keys(allGames).map((item) => {
                        return (
                            <React.Fragment key={item}>
                                <input type="radio" name="prob_type" id={item} value={item} checked={probType === item} onChange={onChangeProb}/> 
                                <label htmlFor={item}>{getText(item)}</label>
                            </React.Fragment>
                        )
                    })
                }
            </div>
            <div className="home-grid">
                {
                    Object.keys(diffs).map((item) => {
                        
                        const badges = badgeCount?.[probType]?.[item];

                        return (
                            <React.Fragment key={item}>
                                <input type="radio" name="difficulty" id={item} value={item} checked={difficulty === item} onChange={onChangeDiff}/>
                                <label htmlFor={item} className="radio-text">
                                    <span>{getText(item) }</span>
                                    {
                                        badges && reverse([...BADGES]).map((badge) => {
                                            if(badges[badge]) {
                                                return (
                                                    <span className="radio-badges" key={badge}>
                                                        <Badge type={badge}/>
                                                        <label className="radio-badges-count">{badges[badge]}</label>
                                                    </span>
                                                )
                                            }
                                            return null
                                        })
                                    }
                                    {
                                        !badges && (
                                            <label className="no-badge">No badges yet</label>
                                        )
                                    }
                                </label>
                            </React.Fragment>
                        )
                    })
                }
               
            
            </div>
            <Link to={`/game?match=${match}&prob-type=${probType}&difficulty=${difficulty}&time=${new Date().getTime()}`}>
                <button>GO</button>
            </Link>
        </div>
    );
}
