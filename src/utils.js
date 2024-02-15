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

export {
    addItem,
    getAll,
    
}
