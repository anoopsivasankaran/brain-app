
import match1 from './match1';
import match2 from './match2';

const BADGES = ['poop', 'stone', 'silver', 'gold', 'dimond'];
const [POOP, STONE, SILVER, GOLD, DIMOND] = BADGES;

const MATCH_MAP = {
    match1,
    match2
}

function getMatchInfo(matchName) {
    return MATCH_MAP[matchName]?._info;
}

function getMatchTitle(matchName) {
    const info = getMatchInfo(matchName) || {};
    return info?.name;
}

function getMatchCount(match) {
    const info = getMatchInfo(match) || {};
    return info?.numbers;
}

function removeUnderscores(obj) {
    const ret = {};
    for (const [key = '', value] of Object.entries(obj)) {
        if(key[0] !== '_') {
            ret[key] = value;
        }
    }
    return ret;
}

function getGame(matchName) {
    const all =  MATCH_MAP[matchName] || {};
    return removeUnderscores(all);
}

function getMenuItems() {
    return Object.keys(MATCH_MAP).map((item) => {
        const val = MATCH_MAP[item];
        return {
            key: item,
            name: val._info.name,
            image: val._info.image,
        };
    });
}

function getDifficulties(match, type) {
    const diffiObj = MATCH_MAP?.[match]?.[type] || {};
    return removeUnderscores(diffiObj);

}

function generateQuestion(match, type, diff = '') {
    const diffiObj = MATCH_MAP?.[match]?.[type] || {};
    const fn = diffiObj?.[diff]?._ques || diffiObj?._ques;
    if(fn) {
        return fn();
    }
    
    return null
}

function getTimeForDifficulty(match, type, diffi = '') {
    const aa = MATCH_MAP?.[match]?.[type]?.[diffi]?.time;
    return aa;
}

export {
    getMatchInfo,
    getGame,
    getMenuItems,
    getDifficulties,
    generateQuestion,
    getTimeForDifficulty,
    getMatchTitle,
    getMatchCount,
    POOP,
    STONE,
    SILVER,
    GOLD,
    DIMOND,
    BADGES,
}
