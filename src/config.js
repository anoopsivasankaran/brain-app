import calcImage from './images/calc.jpg';
import scaleImage from './images/scale.jpg';

const MATCH_MAP = {
    match1: {
        _info: {
            name: 'Math: Level 1',
            numbers: 10,
            image: scaleImage
        },
        add: {
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
            },
        },
        sub: {
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
            },
        },
        mult: {
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
            }, 
        },
        div: {
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
        }
    },
    match2: {
        _info: {
            name: 'Math: Level 2',
            numbers: 5,
            image: calcImage
        },
        add: {
            easy :{
                time: 0,
                level: 2,
            },
            hard: {
                time: 30,
                level: 2,
            }
    
        },
        sub: {
            easy :{
                time: 0,
                level: 2,
            },
            hard: {
                time: 60,
                level: 2,
                name: 'Super mega'
            }
        },
        mult: {
            easy :{
                time: 0,
                level: 2,
            },
            hard: {
                time: 120,
                level: 2,
                name: 'Super mega'
            }
        },
        div: {
            easy :{
                time: 0,
                level: 2,
            },
            hard: {
                time: 120,
                level: 2,
                name: 'Super mega'
            }
    
        }
    }
}

export default MATCH_MAP;
