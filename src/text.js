const TEXT = {
    add: 'Addition',
    sub: 'Subtraction',
    mult: 'Multiplication',
    div: 'Division',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    superhard: 'Super hard',

}

export default function getText(key) {
    return TEXT[key] || key;
}

