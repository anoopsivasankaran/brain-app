
import './EnglishPractice.scss';
import { QUESTION } from './config/match3';
import Audio from './Audio';
import Image from './Image';
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
                                    item.isAudio ? <Audio src={item.src} /> : <Image src={item.src} />
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}   