
const KEY = 'result';

const DIFFICULTY_MAP = {
    easy: {
        time: 0
    },
    medium: {
        time: 20
    },
    hard: {
        time: 10
    },
    superhard: {
        time: 5
    }
};

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

function getAllDifficulty() {
    return Object.keys(DIFFICULTY_MAP);
}

function getTimeForDifficulty(difficulty) {
    return DIFFICULTY_MAP[difficulty]?.time || 0;
}


export {
    addItem,
    getAll,
    getAllDifficulty,
    getTimeForDifficulty
}
