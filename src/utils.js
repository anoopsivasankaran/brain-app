import { get, groupBy, mapValues, pickBy, set } from "lodash";

const KEY = 'result';
const ERROR_LOG_KEY = 'result_error';
const MAX_ERROR_INFO_COUNT = 5;

function saveAll(obj) {
    saveToStorate(ERROR_LOG_KEY, obj);
}

function addItem(item) {
    const obj = getAll();
    obj[item.startDate] = item;
    saveAll(obj);
    
}
function saveToStorate(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
}

function getFromStorage(key) {
    const val = localStorage.getItem(key);
    if(!val) {
        return {}
    }
    try {
        return JSON.parse(val);
    } catch {
        return {}
    }
}

function getAll() {
    return getFromStorage(KEY);
}

function saveAllErrorLog(obj) {
    saveToStorate(ERROR_LOG_KEY, obj);
}

function getAllErrorLog() {
    return getFromStorage(ERROR_LOG_KEY);
}

function getExcludedErrors(match, game) {
    const logs = getAllErrorLog();
    const val = get(logs, [match, game]);
    
    const picked = pickBy(val, (value = []) => {
        const lasts = value.slice(0 - MAX_ERROR_INFO_COUNT);
        return lasts.every((item) => item);
    });
    return Object.keys(picked);
}

function getErrorLogsForMatch(match) {
    const logs = getAllErrorLog();
    return logs?.[match];
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

function saveErrorInfo(match, game, ques, isSuccess) {
    const errorLog = getAllErrorLog();
    let arr = get(errorLog, [match, game, ques], []);
    arr.push(isSuccess);
    arr = arr.slice(0 - MAX_ERROR_INFO_COUNT);
    const obj = set(errorLog, [match, game, ques], arr);
    saveAllErrorLog(obj)
}

export {
    addItem,
    getAll,
    getForMatch,
    getBadgeCount,
    saveErrorInfo,
    getAllErrorLog,
    getErrorLogsForMatch,
    getExcludedErrors
}
