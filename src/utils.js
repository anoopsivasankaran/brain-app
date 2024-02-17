import { groupBy, mapValues, pickBy } from "lodash";

const KEY = 'result';

function saveAll(obj) {
    localStorage.setItem(KEY, JSON.stringify(obj));
}

function addItem(item) {
    const obj = getAll();
    obj[item.startDate] = item;
    saveAll(obj);
    
}

function getAll() {
    const val = localStorage.getItem(KEY);
    if(!val) {
        return {}
    }
    try {
        return JSON.parse(val);
    } catch {
        return {}
    }
}

function getForMatch(match) {
    const all = getAll();
    const ret = pickBy(all, (item) => {
        if (match === 'match1') {
            return item.match === 'match1' || !item.match;
        } 
        return  item.match === match;
    });
    return ret;
}

function getBadgeCount(match, prob, diffi) {
    const matchesObj = getForMatch(match);
    const matchGroupBy = groupBy(matchesObj, 'probType');
    const matchDiffGroupBy = mapValues(matchGroupBy, (val) => {
        const newGrpup = groupBy(val, 'difficulty');
        return mapValues(newGrpup, (item) => {
            const val2 = groupBy(item, 'badge');
            return mapValues(val2, item => item.length);
        })
    });
    return matchDiffGroupBy;
}

export {
    addItem,
    getAll,
    getForMatch,
    getBadgeCount
}
