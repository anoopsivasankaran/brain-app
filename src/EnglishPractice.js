
import './EnglishPractice.scss';
import { QUESTION } from './config/match3';
import Audio from './Audio';
import Image from './Image';
import { BASE_URL } from './config/configFn';
export default function EnglishPractice() {
    return (
        <div className="EnglishPractice">
            {
                QUESTION.map((item) => {
                    return (
                        <div className="practice-item" key={item.text}>
                            <div>
                                <label>{item.text}</label>
                            </div>
                            <div>
                                {
                                    item.isAudio ? <Audio src={BASE_URL + item.src} /> : <Image src={BASE_URL + item.src} />
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}   