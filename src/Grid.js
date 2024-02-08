//TODO REMOVE
import './Grid.scss';

const TEST = {
    add: {
        easy: 0,
        medium: 12,
        hard: 43,
        superhard: 36
    },
    sub: {
        easy: 22,
        medium: 11,
        hard: 0,
        superhard: 45
    },
    mult: {
        easy: 87,
        medium: 1009,
        hard: 1123,
        superhard: 0
    },
}

export default function Grid({data = TEST}) {

    return (
        <div className="grid">
            <div className="first-row"></div>
            {
                Object.keys(data).map((game) => {
                    return (
                        <div className={game}>
                            <div className={game}>{game}</div>
                            {
                                data[game].map((diff) => {
                                    return (
                                        <div className={`${game}-${diff}`}>
                                            {
                                                data[game][diff]
                                            }
                                        </div>
                                    );
                                })
                            }
                        </div>
                    );
                })
            }
        </div>
    );

}