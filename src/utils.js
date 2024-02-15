const KEY = 'result';

const DIFFICULTY_MAP = {
    easy: {
        time: 0,
    },
    medium: {
        time: 20
    },
    hard: {
        time: 10
    },
    superhard: {
        time: 5,
        name: 'Super Hard'
    }, 
    mega :{
        time: 0,
        level: 2,
    },
    supermega: {
        time: {
            add: 30,
            sub: 60,
            mult: 120
        },
        level: 2,
        name: 'Super mega'
    }
};


function getLevel(diff) {
    return DIFFICULTY_MAP[diff]?.level || 1;
}

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

function getTimeForDifficulty(difficulty, game) {
    return DIFFICULTY_MAP[difficulty]?.time?.[game] || DIFFICULTY_MAP[difficulty]?.time || 0;
}


export {
    addItem,
    getAll,
    getAllDifficulty,
    getTimeForDifficulty,
    DIFFICULTY_MAP,
    getLevel,
    
}
