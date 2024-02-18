import { BASE_URL, getErrorValString, getRandomInt } from "./configFn";
import bookImage from '../images/book.jpg';
import Audio from "../Audio";
import Image from "../Image";
import QUESTION from './assets-info.json';




const match3 = {
    _info: {
        name: 'English',
        numbers: Math.min(10, QUESTION.length),
        image: bookImage,
        practiceUrl: '/practice',
        showMistakeLog: true
    },
    spelling: {
        easy :{
            time: 0,
        },
        medium :{
            time: 20,
        },
        _ques: () => {
            console.log('HUHU');
            let filteredQuestion = QUESTION.filter(item => !item.selected);
            if(filteredQuestion.length === 0) {
                QUESTION.forEach(item => item.selected = false);
                filteredQuestion = QUESTION;
            }



            const index = getRandomInt(0, filteredQuestion.length - 1);
            const ques = filteredQuestion[index];
            ques.selected = true;

            return {
                question: (ques.isAudio ? <Audio src={BASE_URL + ques.src}/> : <Image src={BASE_URL + ques.src}/>),
                getError: getErrorValString(ques.text),
                saveInfo: ques.text
            }
        },

    },
}

export default match3;

export {
    QUESTION
}
